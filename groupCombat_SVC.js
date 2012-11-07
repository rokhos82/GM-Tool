////////////////////////////////////////////////////////////////////////////////////////////////////
// groupCombatSVC - this service object controls the group combat popup.  It is responisble for
// tracking damage, effects (prone, stunned, etc), add...
////////////////////////////////////////////////////////////////////////////////////////////////////
GM.groupCombatSVC = function(parent) {
	this.parent = parent;
	this.mainframe = new lib.mainframe(parent.mainframe);
	this.activeGroup = null;
};

GM.groupCombatSVC.prototype.initialize = function() {
};

GM.groupCombatSVC.prototype.setActiveGroup = function(group) {
	this.activeGroup = group;
};