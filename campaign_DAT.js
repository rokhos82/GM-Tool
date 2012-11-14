// -------------------------------------------------------------------------------------------------
// campaignDAT - the campaign data object.
// -------------------------------------------------------------------------------------------------
GM.campaignDAT = function(name) {
	GM.debug.log("GM.campaignDAT","Initailizing campaignDAT object");
	this.name = name;
	this.encounters = {};
	this.map = undefined;
	this.players = [];
};