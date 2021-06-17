const canvas = document.querySelector('#stars');
const ctx = canvas.getContext('2d');

function setSize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
setSize();
// drawStars();
window.addEventListener('resize', ()=>{
    setSize();
    // drawStars();
});

function drawStars(){
    for (let i = 0; i < 200; i++) {
        let x = Math.random() * canvas.width;
        let y = Math.random() * canvas.height;
        let size = Math.random() + 0.1;
    
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 180);
        ctx.fill();
        ctx.closePath();
    }
}

class Star {
    constructor(x, y, size, color) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.color = color;
    }
    draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 180);
        ctx.fill();
        ctx.closePath();
    }
}

let colorArray = ['#FFFFFF', '#FFCCFF', '#DDFFDD'];
let starsArray = [];
for (let i = 0; i < 200; i++) {
    let x = Math.random() * canvas.width;
    let y = Math.random() * canvas.height;
    let size = Math.random() + 0.1;
    let color = colorArray[Math.floor(Math.random()*colorArray.length)];

    starsArray.push(new Star(x, y, size, color))
}

const comet = {
    x: 0,
    y: 0,
    dx: 10,
    dy: 2,
    size: 2
}
function drawComet(){
    ctx.beginPath();
    ctx.arc(comet.x, comet.y, comet.size, 0, Math.PI*2);
    ctx.fill();
    ctx.closePath();
}
function updateComet(){
    if (comet.x > canvas.width) {
        comet.x = -100;
        comet.y = Math.random() * canvas.height;
    }
    comet.x += comet.dx;
    comet.y += comet.dy;
}

function animate(){
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    drawComet();
    for (let i = 0; i < starsArray.length; i++) {
        starsArray[i].draw();
    }
    updateComet();
    requestAnimationFrame(animate)
}
animate();
