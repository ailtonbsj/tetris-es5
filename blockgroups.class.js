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