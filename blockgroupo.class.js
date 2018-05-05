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