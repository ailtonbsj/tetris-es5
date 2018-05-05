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