// -------------------------------------------------------------------------------------------------
// groupDAT - the group data object.
// -------------------------------------------------------------------------------------------------
GM.groupDAT = function(name) {
	this.version = "20121114";
	GM.debug.log("INIT: GM.groupDAT","Creating GM.groupDAT object - version " + this.version,2); 
	this.name = name;
	this.notes = "";
	this.members = {};
};

GM.groupDAT.version = "20121114";

//
//	Version Change Log
//		20121114 - base
//

GM.groupDAT.upgrade = function(dat) {
	if(dat.version == "20121114") {
		// Version is up to date.  Stop upgrading.
	}
	else {
		GM.debug.log("ERROR: GM.groupDAT.upgrade","groupDAT version not found",0);
	}
};