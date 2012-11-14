////////////////////////////////////////////////////////////////////////////////////////////////////
// campaignDAT - the campaign data object.
////////////////////////////////////////////////////////////////////////////////////////////////////
GM.encounterDAT = function(name) {
	this.version = "20121114a";
	GM.debug.log("INIT: GM.encounterDAT","Initializing encounterDAT object - version " + this.version,2);
	this.name = name;
	this.groups = {};
	this.notes = "";
};

GM.encounterDAT.version = "20121114a";