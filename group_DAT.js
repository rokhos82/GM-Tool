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