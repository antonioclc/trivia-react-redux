import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';

class Feedback extends Component {
  constructor() {
    super();

    this.playAgain = this.playAgain.bind(this);
  }

  feedbackMessageGenerator() {
    const { numberOfSuccess } = this.props;
    const MIN = 3;
    if (numberOfSuccess < MIN) return 'Podia ser melhor...';
    return 'Mandou bem!';
  }

  playAgain() {
    const { history } = this.props;
    history.push('/');
  }

  render() {
    const { numberOfSuccess, totalScore } = this.props;
    return (
      <div>
        <Header />
        <p data-testid="feedback-text">
          {' '}
          {
            this.feedbackMessageGenerator()
          }
          {' '}

        </p>
        <p data-testid="feedback-total-score">
          { totalScore }
        </p>
        <p data-testid="feedback-total-question">
          { numberOfSuccess }
        </p>
        <button
          data-testid="btn-play-again"
          type="button"
          onClick={ this.playAgain }
        >
          Jogar novamente
        </button>
      </div>
    );
  }
}

Feedback.propTypes = {
  history: PropTypes.shape().isRequired,
  numberOfSuccess: PropTypes.number.isRequired,
  totalScore: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  numberOfSuccess: state.playerReducer.answeredCorrectly,
  totalScore: state.playerReducer.points,
});

export default connect(mapStateToProps)(Feedback);
