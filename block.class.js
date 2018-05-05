//construct
function Block(xPos,yPos, color,inner){
	this.xPos = xPos;
	this.yPos = yPos;
	this.color = color;
	this.id = Block.generateId();
	this.inner = inner;
	this.render();
}
$Block = Block.prototype;
//properties
$Block.id;
$Block.xPos;
$Block.yPos;
$Block.color;
//methods
$Block.setPosition = function(xPos, yPos){
	this.xPos = xPos;
	this.yPos = yPos;
	this.render();
}
$Block.addPosition = function(xDiff, yDiff){
	this.xPos = this.xPos + xDiff;
	this.yPos = this.yPos + yDiff;
	this.render();
}
$Block.moveDown = function(){
	this.setPosition(this.xPos,++this.yPos);
}
$Block.moveLeft = function(){
	this.setPosition(--this.xPos,this.yPos);
}
$Block.moveRight = function(){
	this.setPosition(++this.xPos,this.yPos);
}
$Block.hadCollide = function(x,y){
	switch(arguments.length){
		case 1:
			return (this.xPos == x.xPos) && (this.yPos == x.yPos);
			break;
		case 2:
			return (this.xPos == x) && (this.yPos == y);
			break;
		default: throw 'invalid args';
	}
}
$Block.render = function(){
	var div = document.getElementById("block"+this.id);
	if(div == null){
		var div = document.createElement('div');
		div.style.backgroundColor = this.color;
		div.style.position = "absolute";
		div.setAttribute("id","block"+this.id);
		div.innerHTML = this.inner;
		document.body.appendChild(div);
	}
	div.style.width = Block.width+'px';
	div.style.height = Block.height+'px';
	div.style.top = (this.yPos*Block.height)+"px";
	div.style.left = (Block.offset+this.xPos*Block.width)+"px";
}
$Block.removeFromRender = function(){
	document.getElementById("block"+this.id).remove();
}
//static properties
Block.idCont = 0;
Block.width = 10;
Block.height = 10;
Block.offset = 0;
//static method
Block.generateId = function(){
	Block.idCont++;
	return Block.idCont;
}
Block.recalcSize = function(){
	Block.height = window.innerHeight/20;
	Block.width = Block.height;
}

module.exports = Block;