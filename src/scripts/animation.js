import Konva from 'konva';

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
  ctx.fillRect(0, 0, canvas.width / 2, canvas.height);
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
  let showResult = setTimeout(function() {
    canvas.style.display = 'none';
  }, 2500);

  // Hide the results if the user clicks on the canvas.
  canvas.addEventListener('click', function() {
    clearTimeout(showResult);
    this.style.display = 'none';
  })
}

export default playAnimation;
