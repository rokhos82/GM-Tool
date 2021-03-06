////////////////////////////////////////////////////////////////////////////////////////////////////
// encounterSVC
////////////////////////////////////////////////////////////////////////////////////////////////////
GM.encounterSVC = function(dat,parent) {
	GM.debug.log("CALL: GM.encounterSVC","Initializing encounterSVC object",2);

	// Check the version of the data object that was passed.  If the version is, upgrade it.
	if(dat.version != GM.encounterDAT.version) {
		GM.debug.log("WARNING: GM.encounterSVC","Data object is out of date, upgrading it",1);
		GM.encounterDAT.upgrade(dat);
	}

	this.dat = dat;
	this.parent = parent;
	this.mainframe = this.parent.mainframe.addChildFrame();
	this.mainframe.addHandler("addCampaign","encounterLoad",this.load,this,[]);

	this.groups = {};
	this.activeGroup = null;
	this.lists = {};
	this.lists.groups = [];
	
	this.ui = new GM.encounterINT(this.parent.ui,this);

	//this.ui.initialize();
	GM.debug.log("END: GM.encounterSVC","Finished initializing encounterSVC object",2);
};

// -------------------------------------------------------------------------------------------------
// load - this function assumes that the data object is populated but the group services and
// lists are not.  The function will build those services and lists.
// -------------------------------------------------------------------------------------------------
GM.encounterSVC.prototype.load = function() {
	GM.debug.log("CALL: GM.encounterSVC.load","Building services and lists from data object",1);

	for(var g in this.dat.groups) {
		this.groups[g] = new GM.groupSVC(this.dat.groups[g],this);
	}

	this.refreshLists();
};

// -------------------------------------------------------------------------------------------------
// refreshLists
// -------------------------------------------------------------------------------------------------
GM.encounterSVC.prototype.refreshLists = function() {
	GM.debug.log("CALL: GM.encounterSVC.refreshLists","Rebuilding lists from data objects",2);
	this.lists.groups = [];
	for(var g in this.groups) {
		this.lists.groups.push(g);
	}
};

// -------------------------------------------------------------------------------------------------
// destroy
// -------------------------------------------------------------------------------------------------
GM.encounterSVC.prototype.destroy = function() {
	GM.debug.log("CALL: GM.encounterSVC.destroy","Removing interfaces and services",2);

	for(var g in this.groups) {
		this.groups[g].destroy();
	}

	for(var l in this.lists) {
		this.lists[l] = [];
	}

	this.ui.detach();
	delete this.ui;
	this.activeGroup = null;
	delete this.groups;

	this.parent.removeEncounter(this.dat.name);
};

// -------------------------------------------------------------------------------------------------
// getName
// -------------------------------------------------------------------------------------------------
GM.encounterSVC.prototype.getName = function() {
	return this.dat.name;
};

// -------------------------------------------------------------------------------------------------
// getData
// -------------------------------------------------------------------------------------------------
GM.encounterSVC.prototype.getData = function(token) {
	return this.dat[token];
};

// -------------------------------------------------------------------------------------------------
// getGroups
// -------------------------------------------------------------------------------------------------
GM.encounterSVC.prototype.getGroups = function() {
	return {
		lists: this.lists.groups.slice(),
		groups: this.groups,
		active: this.activeGroup ? this.activeGroup : null
	};
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
		this.dat.groups[name] = dat;
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

// -------------------------------------------------------------------------------------------------
// 
// -------------------------------------------------------------------------------------------------
GM.encounterSVC.prototype.groupCombatInterface = function(key) {
	GM.debug.log("CALL: GM.encounterSVC.groupCombatInterface","Requesting the combat interface of a group",2);
	var name = null;
	if(isNaN(key)) {
		name = key;
	}
	else {
		name = this.lists.groups[key];
	}
	return this.groups[name].getCombatInterface();
};