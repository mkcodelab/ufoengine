const canvas = document.querySelector('#stars');
const ctx = canvas.getContext('2d');

function setSize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
setSize();
drawStars();
window.addEventListener('resize', ()=>{
    setSize();
    drawStars();
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
