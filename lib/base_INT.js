// -------------------------------------------------------------------------------------------------
// baseINT - this is a pseudo class that represents common elements of all INT class.  All INT
// classes should inherit from this class.
// -------------------------------------------------------------------------------------------------
GM.baseINT = function() {
	this.parent = null;
	this.children = [];
	this.dom = null;
};

GM.baseINT.prototype.destroy = GM.utility.destroy;

GM.baseINT.prototype.setParent = function(parent) {
	this.parent = parent;
};