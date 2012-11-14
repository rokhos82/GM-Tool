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