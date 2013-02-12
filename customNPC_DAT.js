////////////////////////////////////////////////////////////////////////////////////////////////////
// customNPCDAT
////////////////////////////////////////////////////////////////////////////////////////////////////
GM.customNPCDAT = function() {
	this.version = "20130212";
	this.race = null;
	this.name = null;
	this.skills = null;
	this.attributes = null;
	this.armor = null;
	this.weapons = null;
	this.traits = null;
	this.hc = null;
	this.masteries = null;
	this.magic = null;
	this.description = null;
	this.categories = null;
	this.loot = null;
};

GM.customNPCDAT.version = 20130212;

//
// Version Change Log
//   20130212 - base

GM.customNPCDAT.upgrade = function(dat) {
	GM.debug.log("CALL: GM.customNPCDAT.upgrade","Upgrading customNPCDAT object",1);
	if(dat.version == GM.customNPCDAT.version) {
		// The data object is up to date, stop trying to update it.
	}
	else {
		// We don't know what version it thinks it is.  Throw an error.
		GM.debug.log("ERROR: GM.customNPCDAT.upgrade","customNPCDAT version not found",0);
	}
};