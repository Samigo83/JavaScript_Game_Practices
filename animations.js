let playerState = 'sleep';
const dropdown = document.getElementById('animations');
dropdown.addEventListener('change', function(e) {
    playerState = e.target.value
});

const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');

const CANVAS_WIDTH = canvas.width = 1284;
const CANVAS_HEIGHT = canvas.height = 950;

const playerImage = new Image();
playerImage.src = './src/images/Cat/sprites.png';
const spriteWidth = 1284;
const spriteHeight = 950;
let gameFrame = 0;
const staggerFrames = 5;
const spriteAnimations = [];
const animationStates = [
    {
        name: 'idle',
        frames: 20,
    },
    {
        name: 'jump',
        frames: 10,
        
    },
    {
        name: 'fall',
        frames: 10,

    },
    {
        name: 'running',
        frames: 12,

    },
    {
        name: 'gethit',
        frames: 8,

    },
    {
        name: 'paw_atk',
        frames: 15,

    },
    {
        name: 'head_push_atk',
        frames: 15,

    },
    {
        name: 'rolling',
        frames: 9,

    },
    {
        name: 'resting',
        frames: 14,

    },
    {
        name: 'sleep',
        frames: 20,

    },
    {
        name: 'game_over',
        frames: 25,

    }
];
animationStates.forEach((state, index) => {
    let frames = {
        loc: [],
    }
    for (let j = 0; j < state.frames; j++){
        let positionX = j * spriteWidth;
        let positionY = index * spriteHeight;
        frames.loc.push({x: positionX, y: positionY});
    }
    spriteAnimations[state.name] = frames;
});

function animate(){
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    let position = Math.floor(gameFrame/staggerFrames) % spriteAnimations[playerState].loc.length;
    let frameX = spriteWidth * position;
    let frameY = spriteAnimations[playerState].loc[position].y;

    //ctx.drawImage(image, sx, sy, sw, sh, dx, dy, dw, dh)
    ctx.drawImage(playerImage, frameX, frameY, spriteWidth, spriteHeight, 0, 0, spriteWidth, spriteHeight);


    gameFrame++;
    requestAnimationFrame(animate);
}
animate();