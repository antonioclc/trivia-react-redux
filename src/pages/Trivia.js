import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';

class Trivia extends Component {
  constructor() {
    super();

    this.getAnswers = this.getAnswers.bind(this);
    this.shuffleArray = this.shuffleArray.bind(this);
  }

  getAnswers() {
    const { questions } = this.props;
    const wrongAnswers = questions[0].incorrect_answers.map((answer, index) => (
      <button
        type="button"
        key={ index }
        data-testid={ `wrong-answer-${index}` }
      >
        {answer}

      </button>
    ));
    const allAnswers = [
      ...wrongAnswers,
      <button
        type="button"
        key="correct-answer"
        data-testid="correct-answer"
      >
        {questions[0].correct_answer}

      </button>];
    return this.shuffleArray(allAnswers);
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

  render() {
    const { questions } = this.props;
    return (
      <div>
        <Header />
        {
          questions && (
            <>
              <p data-testid="question-category">{questions[0].category}</p>
              <p data-testid="question-text">{questions[0].question}</p>
              {this.getAnswers()}
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
