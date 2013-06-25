GM.combatInitListINT = function(svc,parent) {	
	GM.debug.log("BEGIN: GM.combatInitListINT","Start constructing a combatInitListINT object",2);
	this.svc = svc;
	this.parent = parent;
	this.initiativeList = svc.getInitiativeList();
	GM.debug.log("END: GM.combatInitListINT","End constructing a combatInitListINT object",2);
};

GM.combatInitListINT.prototype.initialize = function() {
};