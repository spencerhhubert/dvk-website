/*function showhide() {1-this.scaleFactor)/2)/this.s
    var div = document.getElementById("newpost");
    div.classList.toggle('hidden'); 
  }


  function showhid() {
    var div = document.getElementById("posttwo");
    div.classList.toggle('hidden'); 
  }


  function showhi() {
    var div = document.getElementById("postthird");
    div.classList.toggle('hidden'); 
  }
  

  function showh() {
    var div = document.getElementById("postforth");
    div.classList.toggle('hidden'); 
  }
  
  function show() {
    var div = document.getElementById("postfifth");
    div.classList.toggle('hidden'); 
  }
  
  function sho() {
    var div = document.getElementById("postsixth");
    div.classList.toggle('hidden'); 
  }
*/


function stateChange(id) {
	let node = document.getElementById(id);
	node.classList.toggle("hidden");
}

function findIndex(node){
	let looking = true;
	let parentNode = node;
	while(looking){
		if(parentNode.className == "post"){
			looking = false;
		parenttNode = node.ParentNode;
		}
	}
}
let svgNS = "http://www.w3.org/2000/svg";
class Shape {
	constructor(width, height) {
		this.width = width;
		this.height = height;
		this.node = document.createElementNS(svgNS, "svg");
		this.node.setAttribute("viewBox", `0 0 ${this.width} ${this.height}`);
		this.node.setAttribute("width", width);
		this.node.setAttribute("height", height);
		this.prim;
		this.generate_direction();
	}
	generate_direction(){
		let rand = Math.random();
		if(rand>.5){
			this.rotationDirection = 1;
		} else {
			this.rotationDirection = -1;
		}
	}
	generate_square(){
		this.prim = document.createElementNS(svgNS, 'rect');
		this.prim.setAttribute("x", 0);
		this.prim.setAttribute("y", 0);
		this.prim.setAttribute("width", this.width);
		this.prim.setAttribute("height", this.height);
		this.node.appendChild(this.prim);
	}
	generate_triangle(){
		this.prim = document.createElementNS(svgNS, 'polygon');
		let args = `0 0, ${this.width} 0, ${this.width/2} ${this.height*Math.sqrt(3)/2}`;
		this.prim.setAttribute("points", args);
		this.node.appendChild(this.prim);
	}
	generate_circle(){
		this.prim = document.createElementNS(svgNS, 'circle');
		this.prim.setAttribute("cx", this.width/2);
		this.prim.setAttribute("cy", this.height/2);
		this.prim.setAttribute("r", this.width/2);
		this.node.appendChild(this.prim);
	}
	generate_rectangle(){
		this.prim = document.createElementNS(svgNS, 'rect');
		this.prim.setAttribute("x", 0);
		this.prim.setAttribute("y", this.height/2);
		this.prim.setAttribute("width", this.width);
		this.prim.setAttribute("height", this.height/2);
		this.node.appendChild(this.prim);
	}
	blank_transform() {
		this.prim.setAttribute("transform", "");
	}
	rotate(deg){
		let oldTransform = this.prim.getAttribute('transform');
		this.prim.setAttribute("transform", oldTransform + `rotate(${deg}, ${this.width/2}, ${this.height/2})`);
	}
	random_rotate(){
		let range = 25; //degrees
		let amount = (range)-(Math.random()*(range*2));
		this.rotate(amount);
	}
	set_color(color){
		this.prim.setAttribute("fill", color);
	}
	scale(factor){
		this.scaleFactor = factor;
		let oldTransform= this.prim.getAttribute('transform');
		this.prim.setAttribute("transform", oldTransform + ` scale(${factor})`);
	}
	scale_down(){
		this.scale(.5);
	}
	center(){
		let oldTransform= this.prim.getAttribute('transform');
		this.prim.setAttribute("transform", oldTransform + ` translate(${(this.width*(1-this.scaleFactor)/2)/this.scaleFactor} ${(this.height*(1-this.scaleFactor)/2)/this.scaleFactor})`);
	}
}

function check(node, className){
	let elementClasses = node.classList;
	for(let i=0;i<elementClasses.length;i++){
		if(elementClasses[i]==className){
			return true;
		}
	}
	return false;
}
let shapeNodes = document.getElementsByClassName('shape');
let shapeObjects = [];
for(let i=0;i<shapeNodes.length;i++){
	let width = shapeNodes[i].offsetWidth;
	shapeNodes[i].setAttribute("style", `height: ${width}px;`);
	let height = shapeNodes[i].offsetHeight;
	shapeObjects[i] = new Shape(width, height);
	shapeNodes[i].appendChild(shapeObjects[i].node);
	if(check(shapeNodes[i], "square")){
		shapeObjects[i].generate_square()
		shapeObjects[i].set_color("#2A4B9B");
	};
	if(check(shapeNodes[i], "triangle")){
		shapeObjects[i].generate_triangle()
		shapeObjects[i].set_color("#FFDE00");
	};
	if(check(shapeNodes[i], "rectangle")){
		shapeObjects[i].generate_rectangle();
		shapeObjects[i].set_color("#009640");
	}
	if(check(shapeNodes[i], "circle")){
		shapeObjects[i].generate_circle();
		shapeObjects[i].set_color("#E30613");
	}
	shapeObjects[i].blank_transform();
	shapeObjects[i].random_rotate();
	shapeObjects[i].scale_down();
	shapeObjects[i].center();
}


function rotate_all(){
	for(let i=0;i<shapeObjects.length;i++){
		shapeObjects[i].rotate(shapeObjects[i].rotationDirection*.25);
	}	
}

setInterval(rotate_all, 30);

