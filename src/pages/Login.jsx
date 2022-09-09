import React, { Component } from 'react';

export class Login extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      gravatarEmail: '',
      buttonDisable: true,
    };
  }

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
          >
            Play
          </button>
        </form>
      </div>
    );
  }
}

export default Login;
