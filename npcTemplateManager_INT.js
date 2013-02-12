////////////////////////////////////////////////////////////////////////////////////////////////////
// npcTemplateManagerINT
////////////////////////////////////////////////////////////////////////////////////////////////////
GM.npcTemplateManagerINT = function() {
	GM.debug.log("BEGIN: GM.npcTemplateManagerINT","Started constructing npcTemplateManagerINT object",2);
	this.svc = null;
	this.parent = null;
	GM.debug.log("END: GM.npcTemplateManagerINT","Finished constructing npcTemplateManagerINT object",2);
};

// -------------------------------------------------------------------------------------------------
// initialize
// -------------------------------------------------------------------------------------------------
GM.npcTemplateManagerINT.prototype.initialize = function(parent) {
	GM.debug.log("CALL: GM.npcTemplateManagerINT.initialize","Initializing a npcTemplateManager interface object",2);
	this.parent = parent;
	this.parent.appendChild(this);
};