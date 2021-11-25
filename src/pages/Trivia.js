import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';

class Trivia extends Component {
  constructor() {
    super();

    this.state = {
      answered: false,
      answersArr: [],
      firstTime: true,
      correctAnswer: '',
    };

    this.getAnswers = this.getAnswers.bind(this);
    this.shuffleArray = this.shuffleArray.bind(this);
    this.handleAnswerClick = this.handleAnswerClick.bind(this);
  }

  getAnswers() {
    const { answered, answersArr, correctAnswer } = this.state;
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
          className={ answered ? (
            (answer !== correctAnswer) ? 'incorrect-answer' : StrCorrectAnswer
          ) : null }
        >
          {answer}

        </button>
      ));

    return allAnswers;
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

  handleAnswerClick() {
    this.setState({ answered: true });
  }

  render() {
    const { questions } = this.props;
    const { firstTime } = this.state;
    if (questions && firstTime) {
      const answersArray = [
        ...questions[0].incorrect_answers, questions[0].correct_answer];
      this.setState({
        answersArr: this.shuffleArray(answersArray),
        firstTime: false,
        correctAnswer: questions[0].correct_answer,
      });
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
            </>
          )
        }
      </div>
    );
  }
}

Trivia.propTypes = {
  questions: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const mapStateToProps = (state) => ({
  questions: state.playerReducer.questions.results,
});

export default connect(mapStateToProps)(Trivia);
