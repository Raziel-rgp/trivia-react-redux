import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import FetchAPI from '../services/FetchAPI';
import requestLogin from '../redux/actions';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      gravatarEmail: '',
      buttonDisable: true,
    };
  }

  requestTokenAPI = async (e) => {
    e.preventDefault();
    const { gravatarEmail, name } = this.state;
    const { dispatch } = this.props;
    dispatch(requestLogin(gravatarEmail, name));
    const { history } = this.props;
    const requestToken = await FetchAPI();
    localStorage.setItem('token', requestToken);
    history.push('/game');
  };

  handleChange = ({ target }) => {
    this.setState({
      [target.name]: target.value,
      buttonDisable: this.validForm(),
    });
  };

  validForm = () => {
    const { name, gravatarEmail } = this.state;
    const isValid = name.length > 0 && gravatarEmail.length > 0;
    return !isValid;
  };

  render() {
    const {
      name,
      gravatarEmail,
      buttonDisable,
    } = this.state;

    return (
      <div>
        <form onSubmit={ this.handleSubmit }>
          <label htmlFor="name">
            Nome
            <input
              type="text"
              data-testid="input-player-name"
              name="name"
              value={ name }
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="gravatarEmail">
            E-mail
            <input
              type="text"
              data-testid="input-gravatar-email"
              name="gravatarEmail"
              value={ gravatarEmail }
              onChange={ this.handleChange }
            />
          </label>
          <button
            type="submit"
            data-testid="btn-play"
            disabled={ buttonDisable }
            onClick={ this.requestTokenAPI }
          >
            Play
          </button>
          <Link to="/settings">
            <button
              data-testid="btn-settings"
              type="button"
            >
              Configuração
            </button>
          </Link>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect()(Login);