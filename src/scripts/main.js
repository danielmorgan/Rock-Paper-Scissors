import * as utility from './utility';
import playAnimation from './animation';

window.addEventListener('load', game);

function game() {
  /** @type {Object} **/
  const hands = {
    rock: {
      el: document.getElementById('rock'),
      beats: 'scissors'
    },
    scissors: {
      el: document.getElementById('scissors'),
      beats: 'paper'
    },
    paper: {
      el: document.getElementById('paper'),
      beats: 'rock'
    }
  }

  /**
   * Bind an event to each hand element so that when a button is clicked that
   * hand is played.
   */
  for (let hand in hands) {
    if (hands.hasOwnProperty(hand)) {
      hands[hand].el.addEventListener('click', play);
    }
  }

  /**
   * Take the user's inputted hand, generate the AI's hand, and pass them along
   * to be judged.
   *
   * @param event {Object}
   */
  function play(event) {
    determineWinner(
      event.target.getAttribute('data-hand'),
      chooseAiHand().getAttribute('data-hand')
    );
  }

  /**
   * Using a random number generator pick one of the hands for the AI to play.
   *
   * @returns {Element}
   */
  function chooseAiHand() {
    let hand = utility.randomProperty(hands);
    return hand.el;
  }

  /**
   * Determine if the player has won, lost or drawn with the AI.
   *
   * @param playerHand {string}
   * @param aiHand {string}
   */
  function determineWinner(playerHand, aiHand) {
    // Draw
    if (playerHand === aiHand) {
      playAnimation(playerHand, aiHand, { state: 'draw', message: 'Draw' });
    }
    // Win
    else if (hands[playerHand].beats === aiHand) {
      playAnimation(playerHand, aiHand, { state: 'win', message: 'You win!' });
      score(1, 'player');
    }
    // Lose
    else {
      playAnimation(playerHand, aiHand, { state: 'lose', message: 'You lose' });
      score(1, 'ai');
    }
  }

  /**
   * Add points to a player's score.
   *
   * @param amount {number}
   * @param who {string}
   */
  function score(amount, who) {
    let amountEl = document.querySelectorAll('.' + who + ' > .amount')[0];
    amountEl.innerHTML = Number(amountEl.innerHTML) + amount;
  }
}
