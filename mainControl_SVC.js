GM.mainControlSVC = function(parent) {
	this.parent = parent;
	this.ui = new mainControlINT(parent.ui,this);
};