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
    const { name, points } = this.props;
    const { gravatar } = this.state;
    return (
      <header className="header-container">
        <div className="header-user">
          <h2 data-testid="header-player-name">{ name }</h2>
          <h3 data-testid="header-score">{ points }</h3>
          <img
            data-testid="header-profile-picture"
            src={ `https://www.gravatar.com/avatar/${gravatar}` }
            alt="gravatarimg"
          />
        </div>
      </header>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  points: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  email: state.playerReducer.email,
  name: state.playerReducer.name,
  points: state.playerReducer.points,
});

export default connect(mapStateToProps)(Header);
