import React, { Component } from 'react';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';

class Ranking extends Component {
  constructor() {
    super();

    this.goHome = this.goHome.bind(this);
    this.renderRanking = this.renderRanking.bind(this);
  }

  goHome() {
    const { history } = this.props;
    history.push('/');
  }

  // const stringConverted = md5(email).toString();

  // src={ `https://www.gravatar.com/avatar/${gravatar}` }

  renderRanking() {
    const players = JSON.parse(localStorage.getItem('ranking'));
    return (
      players.sort((a, b) => b.player.score - a.player.score)
        .map((player, index) => {
          const { gravatarEmail, name, score } = player.player;
          const stringConverted = md5(gravatarEmail).toString();
          return (
            <li key={ index } className="ranking-player">
              <p className="ranking-position-number">{`${index + 1}º`}</p>
              <img
                src={ `https://www.gravatar.com/avatar/${stringConverted}` }
                alt="gravatarimg"
              />
              {' '}
              <div className="ranking-player-name-and-score">
                <h2 className="ranking-player-name-and-score-text" data-testid={ `player-name-${index}` }>{ name }</h2>
                <p className="ranking-player-name-and-score-text" data-testid={ `player-score-${index}` }>{ score } pontos</p>
              </div>
            </li>
          );
        })
    );
  }

  render() {
    return (
      <div className="ranking-container">
        <h1 data-testid="ranking-title">
          🏆 Ranking 🏆
        </h1>
        <ol>
          {
            this.renderRanking()
          }
        </ol>
        <button
          className="ranking-btn"
          data-testid="btn-go-home"
          type="button"
          onClick={ this.goHome }
        >
          Ir para a Home
        </button>
      </div>
    );
  }
}

Ranking.propTypes = {
  history: PropTypes.shape().isRequired,
};

export default Ranking;
