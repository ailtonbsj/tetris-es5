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