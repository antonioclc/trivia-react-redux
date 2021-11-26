import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setUserData, getTokenThunk } from '../actions';

class Login extends Component {
  constructor() {
    super();

    this.state = {
      name: '',
      email: '',
      disableBtn: true,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange({ target }) {
    const { name, value } = target;

    this.setState({
      [name]: value,
    }, () => this.validateInfos());
  }

  clearInputs() {
    this.setState({
      name: '',
      email: '',
    });
  }

  configurationRedirect() {
    const { history } = this.props;
    history.push('/configurations');
  }

  validateInfos() {
    const { name, email } = this.state;
    let nameValid = false;
    let emailValid = false;
    if (name.length > 0) nameValid = true;
    if (email.length > 0) emailValid = true;
    if (emailValid && nameValid) {
      this.setState({ disableBtn: false });
    } else {
      this.setState({ disableBtn: true });
    }
  }

  async handleSubmit(event) {
    event.preventDefault();
    const { name, email } = this.state;
    // padrão do readme
    const storageObj = {
      player: {
        name,
        assertions: '',
        score: 0,
        gravatarEmail: email,
      } };
    localStorage.setItem('state', JSON.stringify(storageObj));

    const { dispatchSetValue, dispatchTokenThunk, history } = this.props;
    dispatchSetValue({ name, email });
    this.clearInputs();
    await dispatchTokenThunk();
    history.push('/trivia');
  }

  render() {
    const { name, email, disableBtn } = this.state;
    return (
      <>
        <form onSubmit={ this.handleSubmit }>
          <label htmlFor="input-player-name">
            Nome:
            <input
              type="text"
              data-testid="input-player-name"
              id="input-player-name"
              name="name"
              value={ name }
              placeholder="Digite aqui seu nome"
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="input-gravatar-email">
            Email:
            <input
              type="email"
              data-testid="input-gravatar-email"
              id="input-gravatar-email"
              name="email"
              value={ email }
              placeholder="Digite aqui seu email"
              onChange={ this.handleChange }
            />
          </label>
          <button
            data-testid="btn-play"
            type="submit"
            id="btn-play"
            disabled={ disableBtn }
          >
            Jogar
          </button>
        </form>
        <button
          type="button"
          data-testid="btn-settings"
          onClick={ () => this.configurationRedirect() }
        >
          Configurações
        </button>
      </>
    );
  }
}

Login.propTypes = {
  dispatchSetValue: PropTypes.func.isRequired,
  dispatchTokenThunk: PropTypes.func.isRequired,
  history: PropTypes.shape().isRequired,
};

const mapStateToProps = (state) => ({
  token: state.playerReducer.token,
});

const mapDispatchToProps = (dispatch) => ({
  dispatchSetValue: (state) => dispatch(setUserData(state)),
  dispatchTokenThunk: () => dispatch(getTokenThunk()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
