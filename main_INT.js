// -------------------------------------------------------------------------------------------------
// mainINT
// -------------------------------------------------------------------------------------------------
GM.mainINT = function(root,svc) {
	this.service = svc;
	this.parent = null;
	this.children = [];
	this.dom = root;
};

GM.utility.extend(GM.mainINT,GM.baseINT);

GM.mainINT.prototype.initialize = function() {
};