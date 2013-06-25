GM.groupCombatINT = function(svc) {
	GM.debug.log("CALL: GM.groupCombatINT","Initializing group combat interface",2);
	this.svc = svc;
	this.parent = null;
	this.ui = new ui.panel(this.svc.getName());
	GM.debug.log("END: GM.groupCombatINT","Finished initializing group combat interface",2);
};

GM.groupCombatINT.prototype.initialize = function(parent) {
	GM.debug.log("CALL: GM.groupCombatINT.initialize","Attaching combat interface to parent",2);
	this.parent = parent;
	this.parent.attachGroup(this.svc.getName(),this);
	var npcs = this.svc.getMembers().members;
	for(var n in npcs) {
		var ui = npcs[n].getCombatInterface();
		ui.initialize(this);
	}
};

GM.groupCombatINT.prototype.attachInterface = function(inter) {
	GM.debug.log("CALL: GM.groupCombatINT.attachInterface","Attaching combat interface",2);
	this.ui.appendChild(inter.ui);
};