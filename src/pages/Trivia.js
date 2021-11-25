import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';

class Trivia extends Component {
  constructor() {
    super();

    this.getAnswers = this.getAnswers.bind(this);
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
    return allAnswers;
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
