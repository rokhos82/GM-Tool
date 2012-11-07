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

	var p = this.ui.addPanel("Actions");
	var b = p.addButton("Attack",new db.link(this,this.combatPopup,[]));
	var b = p.addButton("Defend",new db.link(this,this.defensiveAction,[]));
	var b = p.addButton("Stun",new db.link(this,this.addEffect,["stun",1]));
	var b = p.addButton("Grapple");
	var b = p.addButton("Prone",new db.link(this,this.addEffect,["prone",1]));
	var b = p.addButton("K.O.");
	var b = p.addButton("Bound/Helpless");
	var b = p.addButton("Fight Defensively");
	var b = p.addButton("Throwing Caution");
	var b = p.addButton("Delay");
	var b = p.addButton("Rush");
	var b = p.addButton("Reset",new db.link(this,this.resetEffects,["all"]));

	var p = this.ui.addPanel("Effects");
	this.panels.effects = p;
	this.refreshEffects();
};

// -------------------------------------------------------------------------------------------------
// initialize
// -------------------------------------------------------------------------------------------------
GM.groupCombatSVC.prototype.initialize = function() {
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