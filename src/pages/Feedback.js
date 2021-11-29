import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';

class Feedback extends Component {
  feedbackMessageGenerator() {
    const { numberOfSuccess } = this.props;
    const MIN = 3;
    if (numberOfSuccess < MIN) return 'Podia ser melhor...';
    return 'Mandou bem!';
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
          Você fez
          { ' ' }
          { totalScore }
          { ' ' }
          pontos.
        </p>
        <p data-testid="feedback-total-question">
          Você acertou
          { ' ' }
          { numberOfSuccess }
          { ' ' }
          questões.
        </p>
      </div>
    );
  }
}

Feedback.propTypes = {
  numberOfSuccess: PropTypes.number.isRequired,
  totalScore: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  numberOfSuccess: state.playerReducer.answeredCorrectly,
  totalScore: state.playerReducer.points,
});

export default connect(mapStateToProps)(Feedback);
