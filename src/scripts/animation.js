import Konva from 'konva';

function playAnimation(playerHand, aiHand, outcome) {
  var stage = new Konva.Stage({
    container: 'results',
    width: document.getElementById('results').offsetWidth,
    height: document.getElementById('results').offsetHeight,
  });

  var layer = new Konva.Layer();

  var hex = new Konva.RegularPolygon({
    x: -25,
    y: stage.height() / 2,
    sides: 6,
    radius: 50,
    fill: 'red'
  });

  layer.add(hex);
  stage.add(layer);

  var animation = new Konva.Animation(function(frame) {
    hex.setX(frame.time / 5);

    if (hex.x() >= stage.width() / 2) {
      this.stop();
    }
  }, layer);

  animation.start();
}
window.addEventListener('load', playAnimation);

export default playAnimation;
