import Konva from 'konva';

function playAnimation(playerHand, aiHand, outcome) {
  const handColors = {
    rock: 'rgba(247, 106, 99, 1)',
    scissors: 'rgba(45, 191, 155, 1)',
    paper: 'rgba(255, 215, 42, 1)'
  }

  let container = document.getElementById('results');
  container.style.display = 'block';

  let stage = new Konva.Stage({
    container: 'results',
    width: container.offsetWidth,
    height: container.offsetHeight
  });
  let background = new Konva.Layer();
  let foreground = new Konva.Layer();
  let left = new Konva.Group();
  let right = new Konva.Group();

  let hexRadius = 80;
  let hexL = new Konva.RegularPolygon({
    x: -hexRadius / 2,
    y: stage.height() / 2 - hexRadius / 2,
    radius: hexRadius,
    sides: 6,
    fill: handColors[playerHand]
  });
  let hexR = new Konva.RegularPolygon({
    x: stage.width() + hexRadius / 2,
    y: stage.height() / 2 + hexRadius / 2,
    radius: hexRadius,
    sides: 6,
    fill: handColors[aiHand]
  });
  let text = new Konva.Text({
    x: stage.width() / 2,
    y: stage.height() / 2,
    text: outcome,
    fontSize: 32,
    fontFamily: 'Lato',
    fill: 'black',
    align: 'center'
  })
  text.setOffset({ x: text.getWidth() / 2, y: text.getHeight() / 2 });
  let textBox = new Konva.Rect({
    x: stage.width() / 2 - text.getWidth() / 2 - 20,
    y: stage.height() / 2 - text.getHeight() / 2 - 10,
    width: text.getWidth() + 40,
    height: text.getHeight() + 20,
    fill: 'white',
    shadowColor: 'black',
    shadowBlur: 80,
    shadowOpacity: 0.4,
    cornerRadius: 2
  });
  let rect = new Konva.Rect({
    x: 0,
    y: 0,
    width: stage.width(),
    height: stage.height(),
    fill: 'rgba(255, 255, 255, 0.5)'
  });

  left.add(hexL);
  right.add(hexR);
  background.add(rect, left, right);
  foreground.add(textBox, text);
  stage.add(background, foreground);

  let animation = new Konva.Animation(function(frame) {
    hexL.setX(frame.time / 2);
    hexR.setX(stage.width() - frame.time / 2);

    if (hexL.x() >= stage.width() / 2 - hexRadius) {
      this.stop();
    }
  }, stage);

  animation.start();

  let showResult = setTimeout(function() {
    container.style.display = 'none';
  }, 2000);

  container.addEventListener('click', function(){
    clearTimeout(showResult);
    this.style.display = 'none';
  });
}

export default playAnimation;
