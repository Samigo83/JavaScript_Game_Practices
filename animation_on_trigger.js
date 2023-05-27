const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
canvas.width = 500;
canvas.height = 700;
const explosions = [];
let canvasPosition = canvas.getBoundingClientRect();

class Explosion {
  constructor(x, y) {
    this.image = new Image(x, y);
    this.image.src = "./src/images/Collisions/boom.png";
    this.spriteWidth = 200;
    this.spriteHeigt = 179;
    this.width = this.spriteWidth * 0.4;
    this.height = this.spriteHeigt * 0.4;
    this.x = x;
    this.y = y;
    this.frame = 0;
    this.timer = 0;
    this.angle = Math.random() * 6.2;
    this.sound = new Audio;
    this.sound.src = "./src/sounds/Collisions/boom.wav";
  }
  update() {
    if (this.frame === 0 ) this.sound.play();
    this.timer++;
    if (this.timer % 10 === 0) {
      this.frame++;
    }
  }
  draw() {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.angle);
    //ctx.drawImage(image, sx, sy, sw, sh, dx, dy, dw, dh)
    ctx.drawImage(
      this.image,
      this.spriteWidth * this.frame,
      0,
      this.spriteWidth,
      this.spriteHeigt,
      0 - this.width/2,
      0 - this.height/2,
      this.width,
      this.height
    );
    ctx.restore();
  }
}

function createAnimation(e) {
  const scaleX = canvas.width / canvasPosition.width;
  const scaleY = canvas.height / canvasPosition.height;
  let postionX = (e.x - canvasPosition.left) * scaleX;
  let postionY = (e.y - canvasPosition.top) * scaleY;
  explosions.push(new Explosion(postionX, postionY));
}

window.addEventListener("click", function (e) {
  createAnimation(e);
});

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < explosions.length; i++) {
    explosions[i].update();
    explosions[i].draw();
    if (explosions[i].frame > 5) {
      explosions.splice(i, 1);
      i--;
    }
  }
  requestAnimationFrame(animate);
}
animate();
