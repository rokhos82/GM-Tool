////////////////////////////////////////////////////////////////////////////////////////////////////
// campaignDAT - the campaign data object.
////////////////////////////////////////////////////////////////////////////////////////////////////
GM.encounterDAT = function(name) {
	this.version = "20121116";
	GM.debug.log("INIT: GM.encounterDAT","Initializing encounterDAT object - version " + this.version,2);
	this.name = name;
	this.groups = {};
	this.notes = "";
};

GM.encounterDAT.version = "20121116";

//
//	Version Change Log
//		20121114a - base
//		20121116 - change to test upgrade function
//

GM.encounterDAT.upgrade = function(dat) {
	if(dat.version == "20121114a") {
		// Upgrade the version number and see if further upgrades are nessacary.
		dat.version = "20121116";
		GM.encounterDAT.upgrade(dat);
	}
	else if(dat.version == "20121116") {
		// Nothing to change.  The data object is up to date.
	}
	else {
		GM.debug.log("ERROR: GM.encounterDAT.upgrade","encounterDAT version not found",0);
	}
};