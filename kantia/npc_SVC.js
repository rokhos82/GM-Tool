kantia.npcSVC = function(dat) {
	this.dat = dat;
	this.parent = undefined;
	this.children = new Array();
	
	this.ui = new ui.panel(dat.name + " - " + dat.template);
};