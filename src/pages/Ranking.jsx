import md5 from 'crypto-js/md5';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { resetScore } from '../redux/actions';

class Ranking extends Component {
  state = {
    players: [],
  };

  componentDidMount() {
    this.sendPlayerInfosToLocalStorage();
    const players = JSON.parse(localStorage.getItem('players'));
    this.setState({
      players,
    });
    console.log(this.state);
  }

  handleClick = () => {
    const { history, dispatch } = this.props;
    dispatch(resetScore());
    history.push('/');
  };

  sendPlayerInfosToLocalStorage = () => {
    const { name, email, score } = this.props;
    const player = {
      name,
      email,
      score,
      imgprofile: this.generateProfileImg(),
    };
    if (localStorage.getItem('players') === null) {
      localStorage.setItem('players', JSON.stringify([player]));
    } else {
      localStorage.setItem(
        'players',
        JSON.stringify([
          ...JSON.parse(localStorage.getItem('players')),
          player,
        ]),
      );
    }
  };

  generateProfileImg = () => {
    const { email } = this.props;
    const hashEmail = md5(email).toString();
    const url = `https://www.gravatar.com/avatar/${hashEmail}`;
    return url;
  };

  render() {
    const { players } = this.state;
    const NUMERO1 = -1;
    return (
      <div>
        <h4 data-testid="ranking-title">Ranking</h4>
        <button
          type="button"
          data-testid="btn-go-home"
          onClick={ this.handleClick }
        >
          Login
        </button>
        { players.sort((a, b) => {
          if (a.score < b.score) {
            return 1;
          } if (a.score > b.score) {
            return NUMERO1;
          }
          return 0;
        }).map((player, index) => (
          <ol key={ index }>
            <li data-testid={ `player-name-${index}` }>{player.name}</li>
            <li data-testid={ `player-score-${index}` }>{player.score}</li>
            <img src={ player.imgprofile } alt="" />
          </ol>
        ))}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  name: state.player.name,
  email: state.player.gravatarEmail,
  score: state.player.score,
});

Ranking.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(Ranking);
