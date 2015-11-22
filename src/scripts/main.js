import * as utility from './utility';

window.addEventListener('load', game);

function game() {
  /** @type {object} **/
  let hands = {
    rock: {
      el: document.getElementById('rock'),
      color: 'rgba(247, 106, 99, 1)',
      beats: 'scissors'
    },
    scissors: {
      el: document.getElementById('scissors'),
      color: 'rgba(45, 191, 155, 1)',
      beats: 'paper'
    },
    paper: {
      el: document.getElementById('paper'),
      color: 'rgba(255, 215, 42, 1)',
      beats: 'rock'
    }
  }

  /**
   * Bind an event to each hand element so that when a button is clicked that
   * hand is played.
   */
  for (let hand in hands) {
    hands[hand].el.addEventListener('click', play);
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
      playAnimation(playerHand, aiHand, 'Draw');
    }
    // Win
    else if (hands[playerHand].beats === aiHand) {
      playAnimation(playerHand, aiHand, 'You win!');
      score(1, 'player');
    }
    // Lose
    else {
      playAnimation(playerHand, aiHand, 'You lose');
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
    let newScore = Number(amountEl.innerHTML) + amount;
    amountEl.innerHTML = newScore;
  }

  /**
   * Play an animation showing which hand each player played.
   *
   * Just a simple test version for now.
   *
   * @param playerHand {string}
   * @param aiHand {string}
   * @param outcome {string}
   */
  function playAnimation(playerHand, aiHand, outcome) {
    // Initialise canvas.
    const container = document.getElementById('hand-select');
    const canvas = document.getElementById('results');
    const ctx = canvas.getContext('2d');

    // Set the canvas size and make it visible.
    canvas.width = container.offsetWidth;
    canvas.height = container.offsetHeight;
    canvas.style.display = 'block';

    // Fill canvas with a background to indicate the hand of each player.
    ctx.fillStyle = hands[playerHand].color;
    ctx.fillRect(0, 0, canvas.width / 2, canvas.height);
    ctx.fillStyle = hands[aiHand].color;
    ctx.fillRect(canvas.width / 2, 0, canvas.width, canvas.height);

    // Draw the outcome
    const outcomeRect = {
      width: 250,
      height: 80,
      x: canvas.width / 2 - 125,
      y: canvas.height / 2 - 40
    };
    ctx.fillStyle = 'rgba(255, 255, 255, 1)';
    ctx.fillRect(outcomeRect.x, outcomeRect.y, outcomeRect.width, outcomeRect.height);

    ctx.fillStyle = 'rgba(50, 50, 50, 1)';
    ctx.font = 'bold 32px Lato';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(outcome, canvas.width / 2, canvas.height / 2);

    // Wait 2 seconds then hide the canvas again.
    setTimeout(function() {
      canvas.style.display = 'none';
    }, 2000);
  }
}
