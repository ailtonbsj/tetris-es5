(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
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
},{}],2:[function(require,module,exports){
var Block = require('./block.class.js');

//construct
function BlockGroup(a,b,c,d,x,y,z,w,color){
	this.dynamicBlocks = [];
	this.dynamicBlocks.push(new Block(a,b,color,''));
	this.dynamicBlocks.push(new Block(c,d,color,''));
	this.dynamicBlocks.push(new Block(x,y,color,''));
	this.dynamicBlocks.push(new Block(z,w,color,''));
}
$BlockGroup = BlockGroup.prototype;
//properties
$BlockGroup.dynamicBlocks; //never initialize with object, just with primitive
$BlockGroup.state = 0;
$BlockGroup.maxState = 3;
//methods
$BlockGroup.hadGroupCollision = function(xDiff,yDiff){
	return this.dynamicBlocks.reduce(function(acc, block){
		return acc || BlockGroup.hadCrashWithFixed(block.xPos+xDiff,block.yPos+yDiff);
	},false);
}
$BlockGroup.hadCurlCollision = function(diffList){
	return !this.dynamicBlocks.reduce(function(acc, block, index){
		return acc || BlockGroup.hadCrashWithFixed(block.xPos+diffList[index][0],block.yPos+diffList[index][1]);
	},false);
}
$BlockGroup.curlWithMatrix = function(transf){
	if(this.hadCurlCollision(transf)){
		this.dynamicBlocks.map(function(dynBlock, index){
			dynBlock.addPosition(transf[index][0],transf[index][1]);
		});
		(this.state < this.maxState) ? this.state++ : this.state = 0;
	}
}
$BlockGroup.down = function(){
	var hadGroupCollision = this.hadGroupCollision(0,+1);
	if(!hadGroupCollision){
		this.dynamicBlocks.map(function(block){
			block.moveDown();
		});
		return true;
	} else {
		this.fixToList();
		return false;
	}
}
$BlockGroup.fixToList = function(){
	this.dynamicBlocks.map(function(block){
		BlockGroup.fixedBlockList.push(block);
	});
	BlockGroup.contFixed = new Array(20+1).join('0').split('').map(parseFloat); //zeros()
	BlockGroup.fixedBlockList.map(function(block){
		BlockGroup.contFixed[block.yPos]++; 
	});

	BlockGroup.contFixed.map(function(line, index){
		if(line > 0 && index == 0){
			alert('You Lose!\nDeveloped by:\ngithub.com/ailtonbsj');
			location.reload();
		} 
	 	if(line >= 10){
	 		var hasItens = true;
	 		while(hasItens){
				hasItens = BlockGroup.fixedBlockList.some(function(block, cont){
					if(block.yPos == index){
						block.removeFromRender();
						BlockGroup.fixedBlockList.splice(cont,1);
						return true;
					}
					return false;
	 			});
	 		}
			BlockGroup.fixedBlockList.map(function(block){
				if(block.yPos < index) block.moveDown();
			});
		}
	});
}
$BlockGroup.move = function(way){
	var hadGroupCollision = this.hadGroupCollision(way,0);
	if(!hadGroupCollision){
		this.dynamicBlocks.map(function(block){
			block.setPosition(block.xPos + way, block.yPos);
		});
	}
}
$BlockGroup.rotate = function(){
	throw 'need to be implemented!';
}
//static properties
BlockGroup.fixedBlockList = [];
BlockGroup.contFixed = [];
//static Methods
BlockGroup.hadCrashWithFixed = function(xPos,yPos){
	var hadCrashWithFixed = BlockGroup.fixedBlockList.some(function(fixedBlock){
		return fixedBlock.hadCollide(xPos,yPos);
	});
	if(hadCrashWithFixed || yPos >= 20 || xPos >= 10 || xPos < 0) return true;
	return false;
}

module.exports = BlockGroup;
},{"./block.class.js":1}],3:[function(require,module,exports){
var BlockGroup = require('./blockgroup.class.js');

//construct
function BlockGroupI(){
	BlockGroup.apply(this,[4,0,4,1,4,2,4,3,'blue']);
	this.maxState = 1;
}
//heritage
BlockGroupI.prototype = Object.create(BlockGroup.prototype);
$BlockGroupI = BlockGroupI.prototype;
//methods
$BlockGroupI.rotate = function(){
	switch(this.state){
		case 0:
			var transf = [[-1,1],[0,0],[1,-1],[2,-2]];
			this.curlWithMatrix(transf);
			break;
		case 1:
			var transf = [[1,-1],[0,0],[-1,1],[-2,2]];
			this.curlWithMatrix(transf);
	}
}

module.exports = BlockGroupI;
},{"./blockgroup.class.js":2}],4:[function(require,module,exports){
var BlockGroup = require('./blockgroup.class.js');

//construct
function BlockGroupL(){
	BlockGroup.apply(this,[4,0,4,1,4,2,5,2,'red']);
}
//heritage
BlockGroupL.prototype = Object.create(BlockGroup.prototype);
$BlockGroupL = BlockGroupL.prototype;
//methods
$BlockGroupL.rotate = function(){
	switch(this.state){
		case 0:
			var transf = [[-1,1],[0,0],[1,-1],[0,-2]];
			this.curlWithMatrix(transf);
			break;
		case 1:
			var transf = [[1,1],[0,0],[-1,-1],[-2,0]];
			this.curlWithMatrix(transf);
			break;
		case 2:
			var transf = [[1,-1],[0,0],[-1,1],[0,2]];
			this.curlWithMatrix(transf);
			break;
		case 3:
			var transf = [[-1,-1],[0,0],[1,1],[2,0]];
			this.curlWithMatrix(transf);
	}
}

module.exports = BlockGroupL;
},{"./blockgroup.class.js":2}],5:[function(require,module,exports){
var BlockGroup = require('./blockgroup.class.js');
var Block = require('./block.class.js');

//construct
function BlockGroupO(){
	BlockGroup.apply(this,[4,0,4,1,5,0,5,1,'green']);
}
//heritage
BlockGroupO.prototype = Object.create(BlockGroup.prototype);
$BlockGroupO = BlockGroupO.prototype;
//methods
$BlockGroupO.rotate = function(){
}

module.exports = BlockGroupO;
},{"./block.class.js":1,"./blockgroup.class.js":2}],6:[function(require,module,exports){
var BlockGroup = require('./blockgroup.class.js');

//construct
function BlockGroupS(){
	BlockGroup.apply(this,[4,0,4,1,3,1,5,0,'darkviolet']);
	this.maxState = 1;
}
//heritage
BlockGroupS.prototype = Object.create(BlockGroup.prototype);
$BlockGroupS = BlockGroupS.prototype;
//methods
$BlockGroupS.rotate = function(){
	switch(this.state){
		case 0:
			var transf = [[-1,0],[0,0],[0,0],[-1,2]];
			this.curlWithMatrix(transf);
			break;
		case 1:
			var transf = [[1,0],[0,0],[0,0],[1,-2]];
			this.curlWithMatrix(transf);
	}
}

module.exports = BlockGroupS;
},{"./blockgroup.class.js":2}],7:[function(require,module,exports){
var BlockGroup = require('./blockgroup.class.js');

//construct
function BlockGroupT(){
	BlockGroup.apply(this,[4,0,4,1,3,0,5,0,'yellow']);
}
//heritage
BlockGroupT.prototype = Object.create(BlockGroup.prototype);
$BlockGroupT = BlockGroupT.prototype;
//methods
$BlockGroupT.rotate = function(){
	switch(this.state){
		case 0:
			var transf = [[0,0],[0,0],[1,2],[0,1]];
			this.curlWithMatrix(transf);
			break;
		case 1:
			var transf = [[0,0],[0,0],[-1,-1],[0,0]];
			this.curlWithMatrix(transf);
			break;
		case 2:
			var transf = [[0,0],[0,0],[0,0],[-1,1]];
			this.curlWithMatrix(transf);
			break;
		case 3:
			var transf = [[0,0],[0,0],[0,-1],[1,-2]];
			this.curlWithMatrix(transf);
	}
}

module.exports = BlockGroupT;
},{"./blockgroup.class.js":2}],8:[function(require,module,exports){
var BlockGroup = require('./blockgroup.class.js');

//construct
function BlockGroupZ(){
	BlockGroup.apply(this,[4,0,4,1,3,0,5,1,'gray']);
	this.maxState = 1;
}
//heritage
BlockGroupZ.prototype = Object.create(BlockGroup.prototype);
$BlockGroupZ = BlockGroupZ.prototype;
//methods
$BlockGroupZ.rotate = function(){
	switch(this.state){
		case 0:
			var transf = [[0,0],[0,0],[0,1],[-2,1]];
			this.curlWithMatrix(transf);
			break;
		case 1:
			var transf = [[0,0],[0,0],[0,-1],[2,-1]];
			this.curlWithMatrix(transf);
	}
}

module.exports = BlockGroupZ;
},{"./blockgroup.class.js":2}],9:[function(require,module,exports){
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
},{"./block.class.js":1,"./blockgroupi.class.js":3,"./blockgroupl.class.js":4,"./blockgroupo.class.js":5,"./blockgroups.class.js":6,"./blockgroupt.class.js":7,"./blockgroupz.class.js":8}]},{},[9]);
