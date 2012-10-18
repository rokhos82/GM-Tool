kantia.npcSVC = function(dat,parent) {
	this.dat = dat;
	this.parent = parent;
	this.children = new Array();
	
	this.ui = new ui.panel(dat.name + " - " + dat.template);
};

kantia.npcSVC.prototype.initialize = function() {
	this.parent.ui.appendChild(this.ui);
};