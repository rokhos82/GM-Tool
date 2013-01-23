GM.npcCombatINT = function(svc) {
	GM.debug.log("CALL: GM.npcCombatINT","Initializing NPC combat interface",2);
	this.svc = svc;
	this.ui = new ui.panel(this.svc.getName());
	this.parent = null;

	GM.debug.log("END: GM.npcCombatINT","Finished initializing NPC combat interface",2);
};

// -------------------------------------------------------------------------------------------------
//
// -------------------------------------------------------------------------------------------------
GM.npcCombatINT.prototype.initialize = function(parent) {
	GM.debug.log("CALL: GM.npcCombatINT.initialize","Attaching interface to parent",2);
	this.parent = parent;
	this.parent.attachInterface(this);
};