// -------------------------------------------------------------------------------------------------
// campaignSVC
// -------------------------------------------------------------------------------------------------
GM.campaignSVC = function(dat,parent) {
	GM.debug.log("CALL: GM.campaignSVC","Initializing campaignSVC object",2);

	this.dat = dat;
	this.parent = parent;
	this.mainframe = parent.mainframe.addChildFrame();
	this.mainframe.addHandler("addCampaign","campaignLoad",this.load,this,[]);
	
	this.encounters = {};
	this.lists = {};
	this.lists.encounters = [];
	this.activeEncounter = null;
	this.ui = new GM.campaignINT(this.parent.ui,this);

	this.ui.initialize();
	GM.debug.log("END: GM.campaignSVC","Done initializing campaignSVC object",2);
};

// -------------------------------------------------------------------------------------------------
// load - this function assumes that the data object is populated but the local encounter services
// and lists are blank.  It will build those services and lists.
// -------------------------------------------------------------------------------------------------
GM.campaignSVC.prototype.load = function() {
	GM.debug.log("CALL: GM.campaignSVC.load","Building services and lists from data object",1);

	// Walk through the data object encounters and build service objects.
	for(var e in this.dat.encounters) {
		this.encounters[e] = new GM.encounterSVC(this.dat.encounters[e],this);
		if(!this.activeEncounter)
			this.activeEncounter = this.encounters[e];
	}

	// Rebuild the lists.
	this.refreshLists();
};

// -------------------------------------------------------------------------------------------------
// destroy - this will remove interfaces and destroy child services.
// -------------------------------------------------------------------------------------------------
GM.campaignSVC.prototype.destroy = function() {
	GM.debug.log("CALL: GM.campaignSVC.destroy","Removing interfaces and services for " + this.dat.name,2);
	
	for(var e in this.encounters) {
		this.encounters[e].destroy();
	}

	for(var l in this.lists) {
		this.lists[l] = [];
	}
	
	this.ui.detach();
	delete this.ui;
	this.activeEncounter = null;
	delete this.encounters;
};

// -------------------------------------------------------------------------------------------------
// getName
// -------------------------------------------------------------------------------------------------
GM.campaignSVC.prototype.getName = function() {
	return this.dat.name;
};

// -------------------------------------------------------------------------------------------------
// getEncounters
// -------------------------------------------------------------------------------------------------
GM.campaignSVC.prototype.getEncounters = function() {
	return {
		list: this.lists.encounters.slice(),
		encounters: this.encounters,
		active: this.activeEncounter ? this.activeEncounter.ui : null
	};
};

// -------------------------------------------------------------------------------------------------
// addEncounter
// -------------------------------------------------------------------------------------------------
GM.campaignSVC.prototype.addEncounter = function(name) {
	GM.debug.log("CALL: GM.campaignSVC.addEncounter","Adding new encounter: " + name,2);
	if(this.dat.encounters[name]) {
		GM.debug.log("ERROR: GM.campaignSVC.addEncounter","Encounter of name " + name + " already exists",2);
	}
	else {
		this.dat.encounters[name] = new GM.encounterDAT(name);
		this.encounters[name] = new GM.encounterSVC(this.dat.encounters[name],this);
		var key = this.lists.encounters.push(name) - 1;
		this.selectEncounter(key);
	}
};

// -------------------------------------------------------------------------------------------------
// selectEncounter
// -------------------------------------------------------------------------------------------------
GM.campaignSVC.prototype.selectEncounter = function(key) {
	GM.debug.log("CALL: GM.campaignSVC.selectEncounter","Selecting encounter with key: " + key,2);
	var name = null;
	if(!isNaN(key))
		name = this.lists.encounters[key];
	else
		name = key;
	this.activeEncounter = this.encounters[name];
	this.ui.setActiveEncounter(this.activeEncounter.ui);
};

// -------------------------------------------------------------------------------------------------
// refreshLists
// -------------------------------------------------------------------------------------------------
GM.campaignSVC.prototype.refreshLists = function() {
	GM.debug.log("CALL: GM.campaignSVC.refreshLists","Rebuilding list from data object",2);
	this.lists.encounters = [];
	for(var e in this.encounters) {
		this.lists.encounters.push(e);
	}
};