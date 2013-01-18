////////////////////////////////////////////////////////////////////////////////////////////////////
// campaignDAT - the campaign data object.
////////////////////////////////////////////////////////////////////////////////////////////////////
GM.mainDAT = function() {
	this.version = "20121220";
	GM.debug.log("INIT: GM.mainDAT","Initializing mainDAT object - version " + this.version,2);

	this.campaigns = {};
	this.templates = {};
	this.players = {};
};

GM.mainDAT.version = "20121220";

//
//	Version Change Log
//		20121112 - base
//		20121220 - added this.players
//
//
GM.mainDAT.upgrade = function(dat) {
	GM.debug.log("CALL: GM.mainDAT.upgrade","Upgrading mainDAT object",1);
	if(dat.version == GM.mainDAT.version) {
		// Version is up to date.  Stop upgrading.
	}
	else if(dat.version == 20121112) {
		dat.players = {};
		dat.version = 20121220;	
	}
	else {
		GM.debug.log("ERROR: GM.mainDAT.upgrade","mainDAT version not found",0);
	}
};