import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { resetScore } from '../redux/actions';

class Ranking extends Component {
  handleClick = () => {
    const { history, dispatch } = this.props;
    dispatch(resetScore());
    history.push('/');
  };

  render() {
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
      </div>
    );
  }
}

Ranking.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect()(Ranking);
