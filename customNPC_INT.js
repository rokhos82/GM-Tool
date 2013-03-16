////////////////////////////////////////////////////////////////////////////////////////////////////
// customNPCINT
////////////////////////////////////////////////////////////////////////////////////////////////////
GM.customNPCINT = function() {
	GM.debug.log("BEGIN: GM.customNPCINT","Started constructing a custom NPC interface object",2);
	this.svc = null;
	this.parent = null;
	GM.debug.log("END: GM.customNPCINT","Finished connstructing a custom NPC interface object",2);
};

GM.customNPCINT.prototype.initialize = function(parent) {
	GM.debug.log("CALL: GM.customNPCINT.initialize","Initialing a custom NPC interface object",2);
};