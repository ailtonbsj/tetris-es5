var Block = require('./block.class.js');
var BlockGroupI = require('./blockgroupi.class.js');
var BlockGroupL = require('./blockgroupl.class.js');
var BlockGroupO = require('./blockgroupo.class.js');
var BlockGroupT = require('./blockgroupt.class.js');
var BlockGroupS = require('./blockgroups.class.js');
var BlockGroupZ = require('./blockgroupz.class.js');

//construct
function App(){
	this.generateScene();
	Block.recalcSize();

	this.blockGroup = this.createBlockGroup();
	var isntCrash = true;
	var self = this;
	setInterval(function(){
		if(isntCrash) isntCrash = self.blockGroup.down();
		else {
			self.blockGroup = self.createBlockGroup();
			isntCrash = true;
		}
	},250);

	var scX = window.innerWidth;
	var scY = window.innerHeight;
	document.addEventListener("touchstart", function(e){
		var thX = e.targetTouches[0].clientX;
		var thY = e.targetTouches[0].clientY;
		if( thY < (2*(scY/3)) ) self.blockGroup.rotate();
		if( thY >= (2*(scY/3)) ){
			if( thX < (scX/2) ){
				self.blockGroup.move(-1);
			} else {
				self.blockGroup.move(1);
			}
		}
		console.log( );
	}, false);
	
	document.addEventListener("keydown", function(e){
		if(window.event) { //IE
			keynum = e.keyCode;
		} else if(e.which) { //Netscape/Firefox/Opera
			keynum = e.which;
		}
		switch(keynum){
			case 38: self.blockGroup.rotate();
			break;
			case 37: self.blockGroup.move(-1);
			break;
			case 39: self.blockGroup.move(1);
			break;
		}
	});
}
$App = App.prototype;
//properties
$App.blockGroup;
//methods
$App.createBlockGroup = function(){
	switch(Math.trunc(Math.random()*5)){
		case 0: return new BlockGroupI();
			break;
		case 1: return new BlockGroupL();
			break;
		case 2: return new BlockGroupO();
			break;
		case 3: return new BlockGroupT();
			break;
		case 4: return new BlockGroupS();
			break;
		case 5: return new BlockGroupZ();
			break;
		default: throw 'error';
	}
}
$App.generateScene = function(){
	var blockSize = window.innerHeight/20;
	var sceneWidth = blockSize*10;
	var offset = (window.innerWidth/2)-(blockSize*5);
	Block.offset = offset;

	var div = document.createElement('div');
	div.style.backgroundColor = 'white';
	div.style.position = "absolute";
	div.setAttribute("id","scene");
	div.style.width = sceneWidth+'px';
	div.style.height = window.innerHeight+'px';
	div.style.top = "0";
	div.style.left = offset+'px';
	div.style.zIndex = -9999;
	document.body.style.backgroundColor = 'black';
	document.body.appendChild(div);}

setTimeout(function(){
	new App();
},500);