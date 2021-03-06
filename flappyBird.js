const cvs = document.getElementById("canvas");
const ctx = cvs.getContext("2d");

const bird = new Image();
const bg = new Image();
const fg = new Image();
const pipeNorth = new Image();
const pipeSouth = new Image();

bird.src = "images/bird.png";
bg.src = "images/bg.png";
fg.src = "images/fg.png";
pipeNorth.src = "images/pipeNorth.png";
pipeSouth.src = "images/pipeSouth.png";


const gap = 85;
const constant = pipeNorth.height + gap;
const bx = 10;
let by = 150;
const gravity = 1.5;
let score = 0;

const fly = new Audio();
const scor =  new Audio();

fly.src = "sounds/fly.mp3";
scor.src = "sounds/score.mp3";

document.addEventListener("keydown", moveUp);

function moveUp() {
    by -= 25;
    fly.play();
}

let pipe = [];
pipe[0] = {
    x : cvs.width,
    y : 0
}

function draw() {
    ctx.drawImage(bg,0,0);

    for (let i = 0; i < pipe.length; i++) {
        ctx.drawImage(pipeNorth,pipe[i].x,pipe[i].y);
        ctx.drawImage(pipeSouth, pipe[i].x, pipe[i].y+constant);

        pipe[i].x--;
        if (pipe[i].x == 125) {
            pipe.push({
                x : cvs.width,
                y : Math.floor(Math.random()*pipeNorth.height) - pipeNorth.height
            });
        }

        if( bx + bird.width >= pipe[i].x && bx <= pipe[i].x + pipeNorth.width
        && (by <= pipe[i].y + pipeNorth.height || by+bird.height >= pipe[i].y +constant)
        || by + bird.height >= cvs.height - fg.height){
            location.reload();
        }

        if(pipe[i].x == 5){
            score++;
            scor.play();
        }

    }



    ctx.drawImage(fg,0,cvs.height - fg.height);
    ctx.drawImage(bird, bx, by);

    by += gravity;

    ctx.fillStyle = "#000";
    ctx.font = "20px Verdana";
    ctx.fillText("Score: "+score,10,cvs.height-20);

    requestAnimationFrame(draw);
}

draw();
