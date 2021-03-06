import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';
import { updatePoints, updateSuccess } from '../actions';

const ONE_SECOND = 1000;
const TIME_LIMIT = 0;
const answeredOk = 'correct-answer';

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
      assertions: 0,
    };

    this.getAnswers = this.getAnswers.bind(this);
    this.shuffleArray = this.shuffleArray.bind(this);
    this.handleAnswerClick = this.handleAnswerClick.bind(this);
    this.setClassname = this.setClassname.bind(this);
    this.nextQuestion = this.nextQuestion.bind(this);
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
      return answer !== correctAnswer ? 'incorrect-answer' : answeredOk;
    }
    return '';
  }

  getAnswers() {
    const { answersArr, correctAnswer, answered } = this.state;
    const StrCorrectAnswer = answeredOk;
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
    // let scoreActual = getObjPlayer.player.score;
    const { setPoints, points, setSuccess } = this.props;
    if (target.name === 'correct-answer') {
      // const previewPoints = localStorage.getItem('points') || 0;
      const getObjPlayer = JSON.parse(localStorage.getItem('state'));
      this.setState((prevState) => ({ assertions: prevState.assertions + 1 }));
      const difficultyPoints = { easy: 1, medium: 2, hard: 3 };
      const basicPoint = 10;
      const questionPoints = basicPoint + (seconds * difficultyPoints[difficulty]);
      const totalPoints = Number(points) + questionPoints;
      getObjPlayer.player.score = totalPoints;
      localStorage.setItem('state', JSON.stringify(getObjPlayer));
      setPoints(totalPoints);
      setSuccess();
    }
    this.setState({ answered: true });
  }

  nextQuestion() {
    const { questions, history } = this.props;
    const { questionIndex } = this.state;
    clearInterval(this.timerID);
    if (questionIndex < (questions.length - 1)) {
      this.setState((prevState) => ({
        questionIndex: prevState.questionIndex + 1,
        answered: false,
        firstTime: true,
        seconds: 30,
      }));
    } else {
      const { assertions } = this.state;
      const getObjPlayer = JSON.parse(localStorage.getItem('state'));
      getObjPlayer.player.assertions = assertions;
      localStorage.setItem('state', JSON.stringify(getObjPlayer));
      history.push('/feedback');
    }
  }

  render() {
    const { questions } = this.props;
    const { firstTime, questionIndex, seconds, difficulty, answered } = this.state;
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

    const nextButton = (
      <button
        className="trivia-next-btn"
        data-testid="btn-next"
        type="button"
        onClick={ this.nextQuestion }
      >
        {' '}
        Próximo
        {' '}

      </button>);

    return (
      <div>
        <Header />
        <div className="trivia-container">
          {
            questions && (
              <>
                <div className="trivia-category">
                  <p data-testid="question-category">
                    Categoria:
                    {' '}
                    {questions[questionIndex].category}
                  </p>
                  <p>
                    Dificuldade:
                    {' '}
                    {difficulty}
                  </p>
                </div>
                <p className="trivia-question" data-testid="question-text">{questions[questionIndex].question}</p>
                <div className="trivia-answers">
                {this.getAnswers()}
                </div>
                <p className="trivia-timer">{seconds}</p>
                {answered && nextButton}
              </>
            )
          }
        </div>
      </div>
    );
  }
}

Trivia.propTypes = {
  questions: PropTypes.arrayOf(PropTypes.object).isRequired,
  history: PropTypes.shape().isRequired,
  setPoints: PropTypes.func.isRequired,
  setSuccess: PropTypes.func.isRequired,
  points: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  questions: state.playerReducer.questions.results,
  points: state.playerReducer.points,
  numberOfSuccess: state.playerReducer.answeredCorrectly,
});

const mapDispatchToProps = (dispatch) => ({
  setPoints: (points) => dispatch(updatePoints(points)),
  setSuccess: () => dispatch(updateSuccess()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Trivia);
