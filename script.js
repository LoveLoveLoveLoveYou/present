const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext('2d');
ctx.canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var particlesArray = [];

var coloursByIndex = {
	0: [248, 49, 47],
	1: [255, 103, 35],
	2: [252, 213, 63],
	3: [0, 210, 106],
	4: [0, 116, 186],
	5: [141, 101, 197],
    6: [256,196,204]
}

let mouse = {
	x: null,
	y: null,
	radius: (canvas.height / 80) * (canvas.width / 80)
}
var resizer = 2;

class Heart {
	constructor(x, y, directionX, directionY, size, index){
		this.x = x;
		this.y = y;
		this.directionX = directionX;
		this.directionY = directionY;
		this.size = size;
		this.index = index;
	}

	draw(){
		ctx.beginPath();
		ctx.fillStyle = "rgba("+ coloursByIndex[this.index][0] + ", "+ coloursByIndex[this.index][1] + ", "+ coloursByIndex[this.index][2] + ")";
		
		ctx.moveTo(this.x + 75 / resizer,this.y + 40 / resizer);
		ctx.bezierCurveTo(this.x + 75 / resizer,this.y + 37 / resizer,this.x + 70 / resizer,this.y + 25 / resizer,this.x + 50 / resizer,this.y + 25 / resizer);
		ctx.bezierCurveTo(this.x + 20 / resizer,this.y + 25 / resizer,this.x + 20 / resizer,this.y + 62.5 / resizer,this.x + 20 / resizer,this.y + 62.5 / resizer);
		ctx.bezierCurveTo(this.x + 20 / resizer,this.y + 80 / resizer,this.x + 40 / resizer,this.y + 102 / resizer,this.x + 75 / resizer,this.y + 120 / resizer);
		ctx.bezierCurveTo(this.x + 110 / resizer,this.y + 102 / resizer,this.x + 130 / resizer,this.y + 80 / resizer,this.x + 130 / resizer,this.y + 62.5 / resizer);
		ctx.bezierCurveTo(this.x + 130 / resizer,this.y + 62.5 / resizer,this.x + 130 / resizer,this.y + 25 / resizer,this.x + 100 / resizer,this.y + 25 / resizer);
		ctx.bezierCurveTo(this.x + 85 / resizer,this.y + 25 / resizer,this.x + 75 / resizer,this.y + 37 / resizer,this.x + 75 / resizer,this.y + 40 / resizer);
		ctx.fill();

		ctx.beginPath();
		ctx.fillStyle = "rgba("+ coloursByIndex[this.index][0] + ", "+ coloursByIndex[this.index][1] + ", "+ coloursByIndex[this.index][2] + ", 0.1)";
        ctx.arc(this.x + 73 / resizer, this.y + 65 / resizer, this.size, 0, Math.PI * 2, true);
        
        ctx.fill();
		ctx.fillStyle = '#FFF'
		
	}
	update(){
		// this.angle += .01;
		// if (this.x > canvas.width || this.x < 0){
		// 	this.directionX = -this.directionX;
		// }
		// if (this.y > canvas.height || this.y < 0){
		// 	this.directionY = -this.directionY;
		// }
    // if (this.y > window.innerHeight + 200) {
    //     const idx = particlesArray.indexOf(this);
    //     particlesArray.splice(idx, 1);
    // }
	this.x += this.directionX;
	this.y += this.directionY;
	this.draw();
	}
}
function init(){
    let size = 70;
    let x = Math.random() * innerWidth;
    let y =  -100;
    let directionX = Math.random() * 1 - 0.5;
    let directionY = 3 + Math.random();
    let idx = Math.round(Math.random() * 5);
    particlesArray.push(new Heart(x, y, directionX, directionY, size, 6));

}

function animate(){
	requestAnimationFrame(animate);
	ctx.clearRect(0, 0, innerWidth, innerHeight);
	for (let i = 0; i < particlesArray.length; i++){
        if (particlesArray[i].y > window.innerHeight + 200) {
            particlesArray.splice(i, 1);
        }
		particlesArray[i].update();
	}
}

window.addEventListener('resize', 
	function(){
		canvas.width = innerWidth;
		canvas.height= innerHeight;
		mouse.radius = (canvas.height / 80) * (canvas.width / 80);
	}
)

window.addEventListener('mouseout',
	function() {
		mouse.x = undefined;
		mouse.y = undefined;
	}
)

function clickHandler() {
    console.log(123);
}

init();
animate();
document.body.addEventListener('touchstart', function(e){ e.preventDefault(); });
stars = document.getElementsByClassName("star");
let timerId = setInterval(() => init(), 300);
for (i in stars) {
    stars[i].style.left = `${Math.random() * (window.innerWidth - 20) }px`;
    stars[i].style.top = `${Math.random() * (window.innerHeight - 20) }px`;
    stars[i].addEventListener("click", function() {
        for (let j = 0; j < 10; ++j) {
            init()
        }
     });
}
