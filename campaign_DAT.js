// -------------------------------------------------------------------------------------------------
// campaignDAT - the campaign data object.
// -------------------------------------------------------------------------------------------------
GM.campaignDAT = function(name) {
	this.name = name;
	this.groups = {};
	this.map = undefined;
	this.players = [];
};