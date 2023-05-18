import React from 'react';
import PropTypes from 'prop-types';
import { createUser } from '../services/userAPI';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      isLoading: false,
    };
    const { history } = this.props;
    this.history = history;
  }

  handleNameChange = (event) => {
    this.setState({ name: event.target.value });
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    const { name } = this.state;
    this.setState({ isLoading: true });

    try {
      await createUser({ name });
      this.history.push('/search');
    } catch (error) {
      console.error('Error creating user:', error);
    }

    this.setState({ isLoading: false });
  };

  render() {
    const { name, isLoading } = this.state;
    const isNameValid = name.length > 2;
    const buttonText = isLoading ? 'Carregando...' : 'Entrar';

    return (
      <div data-testid="page-login">
        <form onSubmit={ this.handleSubmit }>
          <label htmlFor="nameInput">Nome:</label>
          <input
            id="nameInput"
            type="text"
            value={ name }
            onChange={ this.handleNameChange }
            data-testid="login-name-input"
          />

          <button
            type="submit"
            disabled={ !isNameValid || isLoading }
            data-testid="login-submit-button"
          >
            {buttonText}
          </button>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Login;
