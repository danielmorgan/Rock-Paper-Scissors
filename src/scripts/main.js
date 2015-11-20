import * as utility from './utility';

window.addEventListener('load', game);

function game() {
  /** @type {array} **/
  let hands = [
    document.getElementById('rock'),
    document.getElementById('paper'),
    document.getElementById('scissors')
  ];

  /** @type {object} **/
  let rules = {
    rock: { beats: 'scissors' },
    scissors: { beats: 'paper' },
    paper: { beats: 'rock' }
  };

  /**
   * When a button is clicked play that hand.
   */
  for (let hand of hands) {
    hand.addEventListener('click', play);
  }

  /**
   * Take the user's inputted hand, generate the AI's hand, and pass them along
   * to be judged.
   *
   * @param event {event}
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
   * @returns {DOMElement}
   */
  function chooseAiHand() {
    let index = utility.randomInt(0, 2);
    return hands[index];
  }

  /**
   * Determine if the player has won, lost or drawn with the AI.
   *
   * @param playerHand {string}
   * @param aiHand {string}
   */
  function determineWinner(playerHand, aiHand) {
    console.log('Player:', playerHand);
    console.log('AI:', aiHand);

    if (playerHand === aiHand) {
      console.log('Result:', 'draw');
    }
    else if (rules[playerHand].beats === aiHand) {
      console.log('Result:', 'win');
    }
    else {
      console.log('Result:', 'lose');
    }
  }
}
