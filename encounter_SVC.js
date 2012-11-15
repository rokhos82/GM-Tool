////////////////////////////////////////////////////////////////////////////////////////////////////
// encounterSVC
////////////////////////////////////////////////////////////////////////////////////////////////////
GM.encounterSVC = function(dat,parent) {
	GM.debug.log("CALL: GM.encounterSVC","Initializing encounterSVC object",2);
	this.dat = dat;
	this.parent = parent;
	this.mainframe = this.parent.mainframe.addChildFrame();

	this.groups = {};
	this.activeGroup = null;
	this.lists = {};
	this.lists.groups = [];
	
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
		this.groups[name] = new GM.groupSVC(dat,this);
		this.lists.groups.push(name);
		this.selectGroup(name);
	}
};

// -------------------------------------------------------------------------------------------------
// getDataConnector
// -------------------------------------------------------------------------------------------------
GM.encounterSVC.prototype.getDataConnector = function(token) {
	GM.debug.log("CALL: GM.encounterSVC.getDataConnector","Getting connector for " + token,2);
	return new db.connector(this.dat,token);
};

// -------------------------------------------------------------------------------------------------
// selectGroup
// -------------------------------------------------------------------------------------------------
GM.encounterSVC.prototype.selectGroup = function(key) {
	GM.debug.log("CALL: GM.encounterSVC.selectGroup","Selecting group with key: " + key,2);
	var name = null;
	if(isNaN(key)) {
		name = key;
	}
	else {
		name = this.lists.groups[key];
	}
	this.activeGroup = this.groups[name];
	this.ui.setActiveGroup(this.activeGroup.ui);
};