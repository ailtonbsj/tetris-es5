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