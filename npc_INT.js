GM.npcINT = function(parent,svc) {
	this.svc = svc;
	this.parent = parent;

	this.name = this.svc.dat.name;
	this.tag = this.name.replace(/ /g,'').toLowerCase();

	this.ui = {};
	this.panels = {};
};

GM.npcINT.prototype.initialize = function() {
};