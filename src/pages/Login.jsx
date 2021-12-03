import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setUserData, getTokenThunk, resetPlayer } from '../actions';

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

  componentDidMount() {
    const { resetData } = this.props;
    resetData();
    localStorage.removeItem('state');
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
        assertions: 0,
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
      <div className="container-form-login">
        <form className="form-login" onSubmit={ this.handleSubmit }>
          <label htmlFor="input-player-name">
            <p className="form-title">Nome:</p>
            <input
              className="input-login"
              type="text"
              data-testid="input-player-name"
              name="name"
              value={ name }
              placeholder="Digite aqui seu nome"
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="input-gravatar-email">
            <p className="form-title">Email:</p>
            <input
              className="input-login"
              type="email"
              data-testid="input-gravatar-email"
              name="email"
              value={ email }
              placeholder="Digite aqui seu email"
              onChange={ this.handleChange }
            />
          </label>
          <button
            className="send-login"
            data-testid="btn-play"
            type="submit"
            id="btn-play"
            disabled={ disableBtn }
          >
            Jogar
          </button>
        </form>
        <button
          className="send-login"
          type="button"
          data-testid="btn-settings"
          onClick={ () => this.configurationRedirect() }
        >
          Configurações
        </button>
      </div>
    );
  }
}

Login.propTypes = {
  dispatchSetValue: PropTypes.func.isRequired,
  dispatchTokenThunk: PropTypes.func.isRequired,
  resetData: PropTypes.func.isRequired,
  history: PropTypes.shape().isRequired,
};

const mapStateToProps = (state) => ({
  token: state.playerReducer.token,
});

const mapDispatchToProps = (dispatch) => ({
  dispatchSetValue: (state) => dispatch(setUserData(state)),
  dispatchTokenThunk: () => dispatch(getTokenThunk()),
  resetData: () => dispatch(resetPlayer()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
