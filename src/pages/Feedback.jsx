import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';

class Feedback extends Component {
  render() {
    const { assertions } = this.props;
    console.log(assertions);
    const MIN_ASSERTIONS = 3;
    return (
      <div data-testid="feedback-text">
        <Header />
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
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  assertions: state.player.assertions,
});

Feedback.propTypes = {
  assertions: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(Feedback);
