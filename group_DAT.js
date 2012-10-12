// -------------------------------------------------------------------------------------------------
// groupDAT - the group data object.
// -------------------------------------------------------------------------------------------------
GM.groupDAT = function(name) {
	this.name = name;
	this.members = {};
	this.membersList = {};
	this.activeMember = undefined;
};