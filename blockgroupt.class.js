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