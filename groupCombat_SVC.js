////////////////////////////////////////////////////////////////////////////////////////////////////
// groupCombatSVC - this service object controls the group combat popup.  It is responisble for
// tracking damage, effects (prone, stunned, etc), add...
////////////////////////////////////////////////////////////////////////////////////////////////////
GM.groupCombatSVC = function(parent) {
	this.parent = parent;
	this.mainframe = new lib.mainframe(parent.mainframe);
	this.activeGroup = null;

	this.popup = new ui.popup();
	this.popup.addClass("popup");
	this.popup.setOverlayClass("fog");

	this.ui = this.popup.addPanel("Combat");
};

// -------------------------------------------------------------------------------------------------
// initialize
// -------------------------------------------------------------------------------------------------
GM.groupCombatSVC.prototype.initialize = function() {
	this.parent.appendChild(this.popup);
};

// -------------------------------------------------------------------------------------------------
// refreshView
// -------------------------------------------------------------------------------------------------
GM.groupCombatSVC.prototype.refreshView = function() {
};

// -------------------------------------------------------------------------------------------------
// setActiveGroup
// -------------------------------------------------------------------------------------------------
GM.groupCombatSVC.prototype.setActiveGroup = function(group) {
	this.activeGroup = group;
};

// -------------------------------------------------------------------------------------------------
// show
// -------------------------------------------------------------------------------------------------
GM.groupCombatSVC.prototype.show = function() {
	this.popup.show();
};

// -------------------------------------------------------------------------------------------------
// hide
// -------------------------------------------------------------------------------------------------
GM.groupCombatSVC.prototype.hide = function() {
	this.popup.hide();
};