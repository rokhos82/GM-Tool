////////////////////////////////////////////////////////////////////////////////////////////////////
// npcTemplateManagerSVC
////////////////////////////////////////////////////////////////////////////////////////////////////
GM.npcTemplateManagerSVC = function() {
	GM.debug.log("BEGIN: GM.npcTemplateManagerSVC","Started constructing npcTemplateManagerSVC object",2);
	this.parent = null;
	this.lists = {};
	GM.debug.log("FINISH: GM.npcTemplateManagerSVC","Finished constructing npcTemplateManagerSVC object",2);
};

// -------------------------------------------------------------------------------------------------
// getTemplates - returns a list of templates and a dictionary of the template objects.
// -------------------------------------------------------------------------------------------------
GM.npcTemplateManagerSVC.prototype.getTemplates = function() {
	GM.debug.log("CALL: GM.npcTemplateManagerSVC.getTemplates","Retrieving template objects from data object",2);
	if(!this.lists.templates)
		this.buildLists();

	var ret = {
		this.list = this.lists.templates;
		this.dict = {};
	};
	
	return ret;
};

GM.npcTemplateManagerSVC.prototype.buildLists = function() {
	GM.debug.log("CALL: GM.npcTemplateManagerSVC.buildLists","Building the lists from the data object",2);
	// Build the list of custom npc templates
	var templates = this.dat.templates.npc;
	this.lists.templates = [];
	for(var t in templates) {
		this.lists.templates[t] = 1;
	}
};