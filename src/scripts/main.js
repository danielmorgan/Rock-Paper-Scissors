window.addEventListener('load', initGame);

function initGame() {
  let hands = [ document.getElementById('rock'), document.getElementById('paper'), document.getElementById('scissors') ];
  
  for (let hand of hands) {
    hand.addEventListener('click', playHand);
  }
}

function playHand(event) {
  console.log(event, this);
}