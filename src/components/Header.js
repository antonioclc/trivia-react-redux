import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';
import React, { Component } from 'react';
import { connect } from 'react-redux';

class Header extends Component {
  constructor() {
    super();
    this.state = {
      gravatar: '',
    };

    this.cryptoString = this.cryptoString.bind(this);
  }

  componentDidMount() {
    this.cryptoString();
  }

  cryptoString() {
    const { email } = this.props;
    const stringConverted = md5(email).toString();
    this.setState({
      gravatar: stringConverted,
    });
  }

  render() {
    const { name } = this.props;
    const { gravatar } = this.state;
    return (
      <header>
        <h2 data-testid="header-player-name">{ name }</h2>
        <h3 data-testid="header-score">0</h3>
        <img
          data-testid="header-profile-picture"
          src={ `https://www.gravatar.com/avatar/${gravatar}` }
          alt="gravatarimg"
        />
      </header>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  email: state.playerReducer.email,
  name: state.playerReducer.name,
});

export default connect(mapStateToProps)(Header);
