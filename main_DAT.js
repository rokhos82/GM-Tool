////////////////////////////////////////////////////////////////////////////////////////////////////
// campaignDAT - the campaign data object.
////////////////////////////////////////////////////////////////////////////////////////////////////
GM.mainDAT = function() {
	this.version = "20130122";
	GM.debug.log("INIT: GM.mainDAT","Initializing mainDAT object - version " + this.version,2);

	this.campaigns = {};
	this.templates = {};
	this.templates.npc = {};
	this.templates.armor = {};
	this.templates.weapon = {};
	this.players = {};
};

GM.mainDAT.version = "20130122";

//
//	Version Change Log
//		20121112 - base
//		20121220 - added this.players
//		20130122 - added npc/armor/weapon to this.templates
//
//
GM.mainDAT.upgrade = function(dat) {
	GM.debug.log("CALL: GM.mainDAT.upgrade","Upgrading mainDAT object",1);
	if(dat.version == GM.mainDAT.version) {
		// Version is up to date.  Stop upgrading.
	}
	else if(dat.version == "20121220") {
		dat.templates.npc = {};
		dat.templates.armor = {};
		dat.templates.weapon = {};
		dat.version = "20130122";
		GM.mainDAT.upgrade(dat);
	}
	else if(dat.version == "20121112") {
		dat.players = {};
		dat.version = "20121220";
		GM.mainDAT.upgrade(dat);
	}
	else {
		GM.debug.log("ERROR: GM.mainDAT.upgrade","mainDAT version not found",0);
	}
};