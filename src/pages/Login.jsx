import React from 'react';
import { Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';
import Loading from './Loading';

// Requisito 2 feito com a ajuda do Calili e Genivaldo

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      submitButton: true,
      loadPage: false,
      redirect: false,
    };
  }

  handleLoginValidate = ({ target }) => {
    const { value } = target;
    this.setState(({
      name: value,
    }), () => {
      const { name } = this.state;
      const minLenght = 3;
      if (name.length >= minLenght) {
        this.setState({ submitButton: false });
      } else { this.setState({ submitButton: true }); }
    });
  }

  handleClick = async () => {
    this.setState({ loadPage: true });
    const { name } = this.state;
    await createUser({ name });
    this.setState({ redirect: true });
  }

  render() {
    const { name, redirect, loadPage, submitButton } = this.state;
    if (loadPage) {
      return redirect ? <Redirect to="/search" /> : <Loading />;
    }
    return (
      <form>
        <label htmlFor="login">
          <input
            data-testid="login-name-input"
            type="text"
            id="login"
            value={ name }
            onChange={ this.handleLoginValidate }
          />
        </label>
        <button
          type="submit"
          disabled={ submitButton }
          onClick={ this.handleClick }
          data-testid="login-submit-button"
        >
          Entrar
        </button>
      </form>
    );
  }
}

export default Login;
