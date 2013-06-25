////////////////////////////////////////////////////////////////////////////////////////////////////
// campaignDAT - the campaign data object.
////////////////////////////////////////////////////////////////////////////////////////////////////
GM.campaignDAT = function(name) {
	this.version = "20121114";
	GM.debug.log("INIT: GM.campaignDAT","Initailizing campaignDAT object - version " + this.version,2);
	this.name = name;
	this.encounters = {};
	this.map = undefined;
	this.players = [];
};

GM.campaignDAT.version = "20121114";

//
// Version Change Log
//		20121114 - base
//

GM.campaignDAT.upgrade = function(dat) {
	if(dat.version == "20121114") {
		// Version is up to date.  Stop upgrading.
	}
	else {
		GM.debug.log("ERROR: GM.campaignDAT.upgrade","campaignDAT version not found",0);
	}
};