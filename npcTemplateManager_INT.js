////////////////////////////////////////////////////////////////////////////////////////////////////
// npcTemplateManagerINT
////////////////////////////////////////////////////////////////////////////////////////////////////
GM.npcTemplateManagerINT = function(svc) {
	GM.debug.log("BEGIN: GM.npcTemplateManagerINT","Started constructing npcTemplateManagerINT object",2);
	
	this.svc = svc;
	this.parent = null;

	this.ui = new ui.popup();

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