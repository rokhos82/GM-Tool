GM.encounterSVC = function(dat,parent) {
	GM.debug.log("CALL: GM.encounterSVC","Initializing encounterSVC object",2);
	this.dat = dat;
	this.parent = parent;
	this.mainframe = new lib.mainframe(this.parent.mainframe);
	
	this.ui = new GM.encounterINT(this.parent.ui,this);
	GM.debug.log("END: GM.encounterSVC","Finished initializing encounterSVC object",2);
};

// -------------------------------------------------------------------------------------------------
// getName
// -------------------------------------------------------------------------------------------------
GM.encounterSVC.prototype.getName = function() {
	return this.dat.name;
};