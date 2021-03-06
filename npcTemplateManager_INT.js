////////////////////////////////////////////////////////////////////////////////////////////////////
// npcTemplateManagerINT
////////////////////////////////////////////////////////////////////////////////////////////////////
GM.npcTemplateManagerINT = function(svc) {
	GM.debug.log("BEGIN: GM.npcTemplateManagerINT","Started constructing npcTemplateManagerINT object",2);
	
	this.svc = svc;
	this.parent = null;

	this.ui = new ui.popup("popup","fog");

	this.panel = this.ui.addPanel("Template Manager");

	var p = this.panel.addPanel();
	p.addClass("manager");
	var templateList = this.svc.getTemplateList();
	var cb = p.addComboBox();
	cb.setClass("wide");
	cb.setSize(10);
	cb.setOptions(templateList);
	cb.addEvent("ondblclick",this,this.editTemplate,[]);
	this.selector = cb;
	var ta = p.addTextArea();

	var p = this.panel.addPanel();
	var b = p.addButton("New",new db.link(this,this.newTemplate,[]));
	var b = p.addButton("Copy");
	var b = p.addButton("Edit",new db.link(this,this.editTemplate,[]));
	var b = p.addButton("Delete");
	var b = p.addButton("Close",new db.link(this,this.hide,[]));

	this.initialized = false;

	GM.debug.log("END: GM.npcTemplateManagerINT","Finished constructing npcTemplateManagerINT object",2);
};

// -------------------------------------------------------------------------------------------------
// initialize
// -------------------------------------------------------------------------------------------------
GM.npcTemplateManagerINT.prototype.initialize = function(parent) {
	GM.debug.log("CALL: GM.npcTemplateManagerINT.initialize","Initializing a npcTemplateManager interface object",2);
	this.parent = parent;
	this.parent.appendChild(this);
	this.initialized = true;
};

// -------------------------------------------------------------------------------------------------
// invalidate
// -------------------------------------------------------------------------------------------------
GM.npcTemplateManagerINT.prototype.invalidate = function() {
	GM.debug.log("CALL: GM.npcTemplateManagerINT.invalidate","The interface is no longer valid",2);
	this.initialized = false;
};

// -------------------------------------------------------------------------------------------------
// detach
// -------------------------------------------------------------------------------------------------
GM.npcTemplateManagerINT.prototype.detach = function() {
	GM.debug.log("CALL: GM.npcTemplateManagerINT.detach","Detaching interface from parent",2);
};

// -------------------------------------------------------------------------------------------------
// show
// -------------------------------------------------------------------------------------------------
GM.npcTemplateManagerINT.prototype.show = function(parent) {
	GM.debug.log("CALL: GM.npcTemplateManagerINT.show","Showing the template manager interface",2);
	if(!this.initialized)
		this.initialize(parent);
	this.selector.setOptions(this.svc.getTemplateList());
	this.ui.show();
};

// -------------------------------------------------------------------------------------------------
// hide
// -------------------------------------------------------------------------------------------------
GM.npcTemplateManagerINT.prototype.hide = function() {
	GM.debug.log("CALL: GM.npcTemplateManagerINT.hide","Closing the template manager interface",2);
	this.ui.hide();
};

// -------------------------------------------------------------------------------------------------
// newTemplate
// -------------------------------------------------------------------------------------------------
GM.npcTemplateManagerINT.prototype.newTemplate = function() {
	GM.debug.log("CALL: GM.npcTemplateManagerINT.newTemplate","Creating a new template",2);
	var name = prompt("Template Name");
	if(name) {
		this.svc.newTemplate(name);
	}
};

// -------------------------------------------------------------------------------------------------
// editTemplate
// -------------------------------------------------------------------------------------------------
GM.npcTemplateManagerINT.prototype.editTemplate = function() {
	GM.debug.log("[CALL] GM.npcTemplateManagerINT.editTemplate","Editing a template",2);
	var name = this.selector.getValue();
	this.svc.editTemplate(name);
};