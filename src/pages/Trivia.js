import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';

class Trivia extends Component {
  render() {
    return (
      <div>
        <Header />
      </div>
    );
  }
}

export default connect()(Trivia);
