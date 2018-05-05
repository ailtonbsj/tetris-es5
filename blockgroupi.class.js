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