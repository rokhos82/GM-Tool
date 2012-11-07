GM.npcCombatSVC = funciton(parent) {
	this.parent = parent;
	this.mainframe = new lib.mainframe(parent.mainframe);
	this.npc = null;
};

GM.npcCombatSVC.prototype.initialize = function() {
};