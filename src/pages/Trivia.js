import React, { Component } from 'react';
import { connect } from 'react-redux';

class Trivia extends Component {
  render() {
    return (
      <div>
        Página do jogo
      </div>
    );
  }
}

export default connect()(Trivia);
