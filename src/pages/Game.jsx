import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { requestAskAPI } from '../services/FetchAPI';
import Header from '../components/Header';

class Game extends Component {
  state = {
    askArray: [],
    conditional: false,
    indexQuestion: 0,
    isDisable: false,
    allAnswers: [],
    classNameCorrect: '',
    classNameWrong: '',
    remainingTime: 30,
    randomArray: [],
    answersDisabled: false,
  };

  async componentDidMount() {
    const { allAnswers } = this.state;
    const response = await requestAskAPI();
    if (response.length === 0) {
      const { history } = this.props;
      localStorage.removeItem('token');
      history.push('/');
    }
    this.setState({ askArray: response,
      conditional: true,
    }, () => this.validIndex());
    this.functimer();
    this.generateRandomIndex(allAnswers);
  }

  functimer = () => {
    const TIME = 1000;
    this.timerId = setInterval(() => this.timerInterval(), TIME);
  };

  handleClick = () => {
    const { indexQuestion, allAnswers } = this.state;
    this.setState({ indexQuestion: indexQuestion + 1,
      classNameCorrect: '',
      classNameWrong: '',
      remainingTime: 30,
      randomArray: this.generateRandomIndex(allAnswers),
      answersDisabled: false,
    }, () => this.validIndex());
    this.functimer();
  };

  timerInterval = () => {
    const { remainingTime } = this.state;
    this.setState((prevState) => ({
      remainingTime: prevState.remainingTime - 1,
    }), () => {
      if (remainingTime === 1) {
        clearInterval(this.timerId);
        this.setState({ answersDisabled: true });
      }
    });
  };

  validIndex = () => {
    const { askArray, indexQuestion } = this.state;
    const MAX_LENGTH = 4;
    const indexQuestionLength = indexQuestion >= MAX_LENGTH;
    const allAnswers = [askArray[indexQuestion].correct_answer,
      ...askArray[indexQuestion].incorrect_answers];
    this.setState({ allAnswers, randomArray: this.generateRandomIndex(allAnswers) });
    if (indexQuestionLength) {
      this.setState({ isDisable: true });
    }
  };

  // código baseado na função do site https://www.horadecodar.com.br/2020/10/26/gerar-varios-numeros-aleatorios-sem-repeticao-em-javascript/
  generateRandomIndex = (array) => {
    for (let i = array.length - 1; i > 0; i -= 1) {
      // Escolhendo elemento aleatório
      const j = Math.floor(Math.random() * (i + 1));
      // Reposicionando elemento
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  checkCorrectAnswer = () => {
    this.setState({
      classNameCorrect: 'correct',
      classNameWrong: 'wrong',
    });
  };

  render() {
    const { conditional,
      indexQuestion,
      askArray,
      isDisable,
      randomArray,
      classNameCorrect,
      answersDisabled,
      remainingTime,
      classNameWrong } = this.state;

    return (
      <div>
        <Header />
        <h4>{ remainingTime }</h4>
        {conditional
        && <h2 data-testid="question-category">{askArray[indexQuestion].category}</h2>}
        {conditional
           && <p data-testid="question-text">{askArray[indexQuestion].question}</p>}
        <div data-testid="answer-options">
          {conditional && randomArray.map((item, index) => (
            <button
              data-testid={
                item === askArray[indexQuestion]
                  .correct_answer ? 'correct-answer' : `wrong-answer-${index}`
              }
              key={ index }
              name={
                item === askArray[indexQuestion]
                  .correct_answer ? 'correct-answer' : `wrong-answer-${index}`
              }
              type="button"
              onClick={ this.checkCorrectAnswer }
              className={ item === askArray[indexQuestion]
                .correct_answer ? classNameCorrect : classNameWrong }
              disabled={ answersDisabled }
            >
              {item}
            </button>
          ))}
        </div>
        <button
          disabled={ isDisable }
          onClick={ this.handleClick }
          type="button"
        >
          Pŕoxima Pergunta:
        </button>
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
