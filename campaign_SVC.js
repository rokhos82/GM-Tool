// -------------------------------------------------------------------------------------------------
// campaignSVC
// -------------------------------------------------------------------------------------------------
GM.campaignSVC = function(dat,parent) {
	GM.debug.log("CALL: GM.campaignSVC","Initializing campaignSVC object",2);
	this.dat = dat;
	this.mainframe = new lib.mainframe(parent.mainframe);
	this.parent = parent;
	this.encounters = {};
	this.lists = {};
	this.lists.encounters = [];
	this.activeEncounter = null;
	this.ui = new GM.campaignINT(this.parent.ui,this);

	this.ui.initialize();
	GM.debug.log("END: GM.campaignSVC","Done initializing campaignSVC object",2);
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
		encounters: this.encounters
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