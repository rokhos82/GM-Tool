////////////////////////////////////////////////////////////////////////////////////////////////////
// campaignDAT - the campaign data object.
////////////////////////////////////////////////////////////////////////////////////////////////////
GM.encounterDAT = function(name) {
	this.version = "20121114";
	GM.debug.log("CALL: GM.encounterDAT","Initializing encounterDAT object - version " + this.version,2);
	this.name = name;
	this.groups = {};
	this.notes = [];
};