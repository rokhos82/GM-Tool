// -------------------------------------------------------------------------------------------------
// campaignDAT - the campaign data object.
// -------------------------------------------------------------------------------------------------
GM.campaignDAT = function(name) {
	this.name = name;
	this.encounters = {};
	this.map = undefined;
	this.players = [];
};