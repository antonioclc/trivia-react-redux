import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';

class Feedback extends Component {
  constructor() {
    super();

    this.playAgain = this.playAgain.bind(this);
    this.showRanking = this.showRanking.bind(this);
  }

  componentDidMount() {
    const playerData = JSON.parse(localStorage.getItem('state'));
    const previewRanking = JSON.parse(localStorage.getItem('ranking')) || [];
    const updatedRanking = JSON.stringify([...previewRanking, playerData]);
    localStorage.setItem('ranking', updatedRanking);
  }

  feedbackMessageGenerator() {
    const { numberOfSuccess } = this.props;
    const MIN = 3;
    if (numberOfSuccess < MIN) return 'Podia ser melhor...😓';
    return 'Mandou bem! 😜';
  }

  playAgain() {
    const { history } = this.props;
    history.push('/');
  }

  showRanking() {
    const { history } = this.props;
    history.push('/ranking');
  }

  render() {
    const { numberOfSuccess, totalScore } = this.props;
    return (
      <div>
        <Header />
        <div className="feedback-container">
          <h1 data-testid="feedback-text">
            {' '}
            {
              this.feedbackMessageGenerator()
            }
            {' '}

          </h1>
          <h3 data-testid="feedback-total-score">
            Pontuação:
            {' '}
            { totalScore }
          </h3>
          <h3 data-testid="feedback-total-question">
            Respostas certas:
            {' '}
            { numberOfSuccess }
          </h3>
          <div className="feedback-btn-container">
            <button
              className="feedback-btn"
              data-testid="btn-play-again"
              type="button"
              onClick={ this.playAgain }
            >
              Jogar novamente
            </button>
            <button
              className="feedback-btn"
              data-testid="btn-ranking"
              type="button"
              onClick={ this.showRanking }
            >
              Ver Ranking
            </button>
          </div>
        </div>
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
