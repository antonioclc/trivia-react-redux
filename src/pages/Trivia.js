import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';
import { updatePoints } from '../actions';

const ONE_SECOND = 1000;
const TIME_LIMIT = 0;

class Trivia extends Component {
  constructor() {
    super();

    this.state = {
      answered: false,
      answersArr: [],
      firstTime: true,
      correctAnswer: '',
      questionIndex: 0,
      seconds: 30,
      difficulty: '',
    };

    this.getAnswers = this.getAnswers.bind(this);
    this.shuffleArray = this.shuffleArray.bind(this);
    this.handleAnswerClick = this.handleAnswerClick.bind(this);
    this.setClassname = this.setClassname.bind(this);
  }

  componentDidUpdate(_prevProps, prevState) {
    // função que verifica se o temporizado zerou
    const { seconds } = this.state;
    if (prevState.seconds !== seconds) this.answeredOrTimeout();
  }

  setTimer() {
    this.timerID = setInterval(() => {
      this.setState((prevState) => ({
        seconds: prevState.seconds - 1,
      }));
    }, ONE_SECOND);
  }

  setClassname(answer) {
    const { answered, correctAnswer } = this.state;
    if (answered) {
      return answer !== correctAnswer ? 'incorrect-answer' : 'correct-answer';
    }
    return '';
  }

  getAnswers() {
    const { answersArr, correctAnswer, answered } = this.state;
    const StrCorrectAnswer = 'correct-answer';
    const allAnswers = answersArr
      // .filter((answer) => answer !== correctAnswer)
      .map((answer, index) => (
        <button
          type="button"
          name={ answer !== correctAnswer ? 'incorrect-answer' : StrCorrectAnswer }
          key={ index }
          data-testid={
            answer !== correctAnswer ? `wrong-answer-${index}` : StrCorrectAnswer
          }
          onClick={ this.handleAnswerClick }
          className={ this.setClassname(answer) }
          disabled={ answered }
        >
          {answer}

        </button>
      ));

    return allAnswers;
  }

  answeredOrTimeout() {
    const { answered, seconds } = this.state;
    if (seconds === TIME_LIMIT || answered) {
      this.setState({ answered: true });
      clearInterval(this.timerID);
    }
  }

  // a função shuffleArray utilizamos do link: https://www.horadecodar.com.br/2021/05/10/como-embaralhar-um-array-em-javascript-shuffle/
  shuffleArray(arr) {
    // Loop em todos os elementos
    for (let i = arr.length - 1; i > 0; i -= 1) {
      // Escolhendo elemento aleatório
      const j = Math.floor(Math.random() * (i + 1));
      // Reposicionando elemento
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    // Retornando array com aleatoriedade
    return arr;
  }

  handleAnswerClick({ target }) {
    const { difficulty, seconds } = this.state;
    const { setPoints, points } = this.props;
    const getObjPlayer = JSON.parse(localStorage.getItem('state'));
    // let scoreActual = getObjPlayer.player.score;
    if (target.name === 'correct-answer') {
      // const previewPoints = localStorage.getItem('points') || 0;
      const difficultyPoints = { easy: 1, medium: 2, hard: 3 };
      const basicPoint = 10;
      const questionPoints = basicPoint + (seconds * difficultyPoints[difficulty]);
      const totalPoints = Number(points) + questionPoints;
      getObjPlayer.player.score = totalPoints;
      localStorage.setItem('state', JSON.stringify(getObjPlayer));
      setPoints(totalPoints);
    }
    this.setState({ answered: true });
  }

  render() {
    const { questions } = this.props;
    const { firstTime, questionIndex, seconds, difficulty } = this.state;
    if (questions && firstTime) {
      const answersArray = [
        ...questions[questionIndex].incorrect_answers,
        questions[questionIndex].correct_answer];
      this.setState({
        answersArr: this.shuffleArray(answersArray),
        firstTime: false,
        correctAnswer: questions[questionIndex].correct_answer,
        difficulty: questions[questionIndex].difficulty,
      });
      this.setTimer();
    }
    return (
      <div>
        <Header />
        {
          questions && (
            <>
              <p data-testid="question-category">{questions[0].category}</p>
              <p data-testid="question-text">{questions[0].question}</p>
              { this.getAnswers() }
              <p>{ seconds }</p>
              <p>{ difficulty }</p>
            </>
          )
        }
      </div>
    );
  }
}

Trivia.propTypes = {
  questions: PropTypes.arrayOf(PropTypes.object).isRequired,
  setPoints: PropTypes.func.isRequired,
  points: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  questions: state.playerReducer.questions.results,
  points: state.playerReducer.points,
});

const mapDispatchToProps = (dispatch) => ({
  setPoints: (points) => dispatch(updatePoints(points)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Trivia);
