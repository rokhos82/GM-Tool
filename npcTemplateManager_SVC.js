////////////////////////////////////////////////////////////////////////////////////////////////////
// npcTemplateManagerSVC
////////////////////////////////////////////////////////////////////////////////////////////////////
GM.npcTemplateManagerSVC = function(dat,parent) {
	GM.debug.log("BEGIN: GM.npcTemplateManagerSVC","Started constructing npcTemplateManagerSVC object",2);
	
	this.parent = parent;
	this.mainframe = parent.mainframe.addChildFrame();
	this.dat = dat;

	this.lists = {};

	this.ui = new GM.npcTemplateManagerINT(this,this.parent.ui);
	
	GM.debug.log("FINISH: GM.npcTemplateManagerSVC","Finished constructing npcTemplateManagerSVC object",2);
};

// -------------------------------------------------------------------------------------------------
// getTemplateList - returns a list of templates.
// -------------------------------------------------------------------------------------------------
GM.npcTemplateManagerSVC.prototype.getTemplateList = function() {
	GM.debug.log("CALL: GM.npcTemplateManagerSVC.getTemplateList","Retrieving template objects from data object",2);
	if(!this.lists.templates)
		this.buildLists();

	return this.lists.templates;
};

// -------------------------------------------------------------------------------------------------
// 
// -------------------------------------------------------------------------------------------------
GM.npcTemplateManagerSVC.prototype.buildLists = function() {
	GM.debug.log("CALL: GM.npcTemplateManagerSVC.buildLists","Building the lists from the data object",2);
	// Build the list of custom npc templates
	var templates = this.dat.templates.npc;
	this.lists.templates = [];
	for(var t in templates) {
		this.lists.templates[t] = t;
	}
};

// -------------------------------------------------------------------------------------------------
// getTemplate - returns the specified template data object.
// -------------------------------------------------------------------------------------------------
GM.npcTemplateManagerSVC.prototype.getTemplate = function(t) {
	return this.dat.templates.npc[t];
};

// -------------------------------------------------------------------------------------------------
// newTemplate - Creates a new, blank template given a name.  Also, insures that names are
//		unique.  Rebuilds the template list after the new template is created.
// -------------------------------------------------------------------------------------------------
GM.npcTemplateManagerSVC.prototype.newTemplate = function(name) {
	GM.debug.log("CALL: GM.npcTemplateManagerSVC.newTemplate","Creating a new blank NPC template",2);
	if(this.dat.templates.npc[name]) {
		GM.debug.log("ERROR: GM.npcTemplateManagerSVC.newTemplate","Template of name " + name + " already exists.",0);
	}
	else {
		this.dat.templates.npc[name] = new GM.customNPCDAT(name);
		this.buildLists();
		this.editTemplate(name);
	}
};

// -------------------------------------------------------------------------------------------------
// copyTemplate - Creates a new template by copying an existing template.  Also, insures that the
// 		new template name is unique.
// -------------------------------------------------------------------------------------------------
GM.npcTemplateManagerSVC.prototype.copyTemplate = function(name,copy) {
	GM.debug.log("CALL: GM.npcTemplateManagerSVC.copyTemplate","Creating template " + name + " from " + copy,2);
	if(this.dat.templates.npc[copy]) {
		if(this.dat.templates.npc[name]) {
			GM.debug.log("ERROR: GM.npcTemplateManagerSVC.copyTemplate","Template of name " + name + " already exists.",0);
		}
		else {
			var c = this.dat.templates.npc[copy];
			this.dat.templates.npc[name] = GM.utility.deepCopy(c);
			this.buildLists();
		}
	}
	else {
		GM.debug.log("ERROR: GM.npcTemplateManagerSVC.copyTemplate","Source template " + copy + " does not exist",0);
	}
};

// -------------------------------------------------------------------------------------------------
// deleteTemplate - Removes the template from the data object.  Rebuilds the template lists after
//		the remove.
// -------------------------------------------------------------------------------------------------
GM.npcTemplateManagerSVC.prototype.deleteTemplate = function(name) {
	GM.debug.log("CALL: GM.npcTemplateManagerSVC.deleteTemplate","Removing template " + name,2);
	delete this.dat.templates.npc[name];
	this.buildLists();
};

// -------------------------------------------------------------------------------------------------
// editTemplate
// -------------------------------------------------------------------------------------------------
GM.npcTemplateManagerSVC.prototype.editTemplate = function(name) {
	GM.debug.log("CALL: GM.npcTemplateManagerSVC.editTemplate","Invoke the edit interface for " + name,2);
	this.ui.hide();
};

// -------------------------------------------------------------------------------------------------
// invoke
// -------------------------------------------------------------------------------------------------
GM.npcTemplateManagerSVC.prototype.invoke = function(parent) {
	GM.debug.log("CALL: GM.npcTemplateManagerSVC.invoke","Invoke the manager interface",2);
	this.ui.show(parent);
};