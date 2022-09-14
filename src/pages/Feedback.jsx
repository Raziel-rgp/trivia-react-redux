import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import { resetScore } from '../redux/actions';

class Feedback extends Component {
  handleClick = () => {
    const { history, dispatch } = this.props;
    dispatch(resetScore());
    history.push('/');
  };

  render() {
    const { assertions, score } = this.props;
    const MIN_ASSERTIONS = 3;

    return (
      <div data-testid="feedback-text">
        <Header />
        {}
        <p data-testid="feedback-total-question">{assertions}</p>
        <p data-testid="feedback-total-score">{score}</p>
        {assertions >= MIN_ASSERTIONS
          ? (
            <p
              data-testid="feedback-text"
            >
              Well Done!
            </p>)
          : (
            <p data-testid="feedback-text">
              Could be better...
            </p>
          )}
        <button
          type="button"
          onClick={ this.handleClick }
          data-testid="btn-play-again"
        >
          Play again
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  assertions: state.player.assertions,
  score: state.player.score,
});

Feedback.propTypes = {
  assertions: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(Feedback);
