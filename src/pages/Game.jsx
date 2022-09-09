import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { requestAskAPI } from '../services/FetchAPI';
import Header from '../components/Header';

class Game extends Component {
  state = {
    askArray: [],
    askQuestion: '',
    conditional: false,
  };

  async componentDidMount() {
    const response = await requestAskAPI();
    if (response.length === 0) {
      const { history } = this.props;
      localStorage.removeItem('token');
      history.push('/');
    }
    this.setState({ askArray: response, conditional: true });
  }

  render() {
    const { askArray, conditional } = this.state;
    const afonso = askArray[0];
    return (
      <div>
        <Header />
        {conditional && <h3>{afonso}</h3> }
      </div>
    );
  }
}

Game.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect()(Game);
