// -------------------------------------------------------------------------------------------------
// Accumulator - loop through an array of sources and preform the operation using each source.
// -------------------------------------------------------------------------------------------------
db.accumulator = function(op,sources) {
	this.sources = sources;
	this.op = op;
};

// -------------------------------------------------------------------------------------------------
// Default Accumulator Operations
// -------------------------------------------------------------------------------------------------
db.accumulator.ops = {};
db.accumulator.ops["+"] = function(sources) {
	var sum = 0;
	for (var i in sources) {
		var s = sources[i];
		sum += parseInt(s.node[s.key]);
	}
	return sum;
};
db.accumulator.ops["*"] = function(sources) {
	var sum = 1;
	for (var i in sources) {
		var s = sources[i];
		sum *= parseInt(s.node[s.key]);
	}
	return sum;
};

// -------------------------------------------------------------------------------------------------
// 
// -------------------------------------------------------------------------------------------------
db.accumulator.prototype.read = function() {
	var ret = this.op(this.sources);
	return ret;
};

// -------------------------------------------------------------------------------------------------
// Accumulator Source Wrappers
// -------------------------------------------------------------------------------------------------
db.accumulator.sources = {};
db.accumulator.sources["ui"] = function(ui) {
	this.node = ui.field;
	this.key = "value";
};
db.accumulator.sources["dat"] = function(dat,key) {
	this.node = dat;
	this.key = key;
};