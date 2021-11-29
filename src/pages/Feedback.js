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
      </div>
    );
  }
}

Feedback.propTypes = {
  numberOfSuccess: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  numberOfSuccess: state.playerReducer.answeredCorrectly,
});

export default connect(mapStateToProps)(Feedback);
