////////////////////////////////////////////////////////////////////////////////////////////////////
// encounterSVC
////////////////////////////////////////////////////////////////////////////////////////////////////
GM.encounterSVC = function(dat,parent) {
	GM.debug.log("CALL: GM.encounterSVC","Initializing encounterSVC object",2);
	this.dat = dat;
	this.parent = parent;
	this.mainframe = new lib.mainframe(this.parent.mainframe);

	this.groups = {};
	
	this.ui = new GM.encounterINT(this.parent.ui,this);
	GM.debug.log("END: GM.encounterSVC","Finished initializing encounterSVC object",2);
};

// -------------------------------------------------------------------------------------------------
// getName
// -------------------------------------------------------------------------------------------------
GM.encounterSVC.prototype.getName = function() {
	return this.dat.name;
};

// -------------------------------------------------------------------------------------------------
// addGroup
// -------------------------------------------------------------------------------------------------
GM.encounterSVC.prototype.addGroup = function(name) {
	GM.debug.log("CALL: GM.encounterSVC.addGroup","Adding group: " + name,2);
	if(this.dat.groups[name]) {
		GM.debug.log("ERROR: GM.encounterSVC.addGroup","Group named " + name + " already exists!",0);
	}
	else {
		var dat = new GM.groupDAT(name);
	}
};