import Konva from 'konva';

function playAnimation(playerHand, aiHand, outcome) {
  const handColors = {
    rock: 'rgba(247, 106, 99, 1)',
    scissors: 'rgba(45, 191, 155, 1)',
    paper: 'rgba(255, 215, 42, 1)'
  }

  const hexRadius = 75;

  let container = document.getElementById('results');
  container.style.display = 'block';

  let stage = new Konva.Stage({
    container: 'results',
    width: container.offsetWidth,
    height: container.offsetHeight
  });

  let background = new Konva.Layer();
  let foreground = new Konva.Layer({ offset: { y: 35 } });
  let overlay = new Konva.Layer();

  let left = new Konva.Group({
    x: -(hexRadius * 3),
    y: (stage.height() / 2) - (hexRadius * 0.75) - 3,
  });
  let right = new Konva.Group({
    x: stage.width() + (hexRadius * 3),
    y: (stage.height() / 2) + (hexRadius * 0.75) + 3,
  });

  let backgroundFill = new Konva.Rect({
    x: 0,
    y: 0,
    width: stage.width(),
    height: stage.height(),
    fill: 'rgba(255, 255, 255, 0.8)'
  });

  let hexL = new Konva.RegularPolygon({
    x: 0,
    y: 0,
    radius: hexRadius,
    sides: 6,
    stroke: handColors[playerHand],
    strokeWidth: 4,
    fill: 'white'
  });
  let hexR = new Konva.RegularPolygon({
    x: 0,
    y: 0,
    radius: hexRadius,
    sides: 6,
    stroke: handColors[aiHand],
    strokeWidth: 4,
    fill: 'white'
  });

  let playerImgEl = document.getElementById('img-' + playerHand);
  let playerImg = new Konva.Image({
    x: -50,
    y: -50,
    image: playerImgEl,
    width: 100,
    height: 100
  });

  let aiImgEl = document.getElementById('img-' + aiHand);
  let aiImg = new Konva.Image({
    x: -50,
    y: -50,
    image: aiImgEl,
    width: 100,
    height: 100
  });

  let text = new Konva.Text({
    x: stage.width() / 2,
    y: stage.height() * 0.8,
    text: outcome.message,
    fontFamily: 'Lato',
    fontSize: 32,
    fill: 'black',
    align: 'center',
    padding: 10
  });
  text.setOffset({
    x: text.width() / 2
  });

  let textBox = new Konva.Rect({
    x: (stage.width() / 2) - (text.width() / 2) - 30,
    y: stage.height() * 0.8,
    width: text.width() + 60,
    height: text.height(),
    fill: 'white',
    cornerRadius: 2,
    shadowColor: 'black',
    shadowBlur: 75,
    shadowOpacity: 0.2
  });

  left.add(hexL, playerImg);
  right.add(hexR, aiImg);
  background.add(backgroundFill);
  foreground.add(left, right);
  overlay.add(textBox, text);
  stage.add(background, foreground, overlay);

  new Konva.Animation(function(frame) {
    left.setX(frame.time / 1.5);
    right.setX(stage.width() - frame.time / 1.5);

    if (left.x() >= (stage.width() / 2) - (hexRadius / 2) - 3) {
      left.setX((stage.width() / 2) - (hexRadius / 2) - 3);
      right.setX((stage.width() / 2) + (hexRadius / 2) + 3);

      this.stop();
      outcomeAnimation.start();
    }
  }, stage).start();

  let outcomeAnimation = new Konva.Animation(function(frame) {
    let scaleMod = frame.time / 3000;

    if (outcome.state == 'win') {
      hexL.scale({ x: 1 + scaleMod, y: 1 + scaleMod });
      hexR.scale({ x: 1 - scaleMod, y: 1 - scaleMod });
      right.opacity(1 - frame.time / 500);
    }
    if (outcome.state == 'lose') {
      hexL.scale({ x: 1 - scaleMod, y: 1 - scaleMod });
      hexR.scale({ x: 1 + scaleMod, y: 1 + scaleMod });
      left.opacity(1 - frame.time / 500);
    }
    if (outcome.state == 'draw') {
      left.opacity(1 - frame.time / 500);
      right.opacity(1 - frame.time / 500);
    }

    if (scaleMod >= 0.1) {
      this.stop();
    }
  }, stage);

  let waitThenHideResult = setTimeout(function() {
    container.style.display = 'none';
  }, 3000);

  function hideResultNow() {
    clearTimeout(waitThenHideResult);
    this.style.display = 'none';
  }

  container.addEventListener('click', hideResultNow);
  container.addEventListener('touchstart', hideResultNow);
}

export default playAnimation;
