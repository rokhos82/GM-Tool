////////////////////////////////////////////////////////////////////////////////////////////////////
// combatINT - the main combat interface object.  Each group will have it's own combat interface
// object and each NPC in each group will have a seperate interface object.
////////////////////////////////////////////////////////////////////////////////////////////////////
GM.combatINT = function(parent,svc) {
	GM.debug.log("CALL: GM.combatINT","Initializing combat interface",2);
	
	this.parent = parent;
	this.svc = svc;
	this.label = this.svc.getName();

	this.ui = new ui.popup("combat popup","fog");
	this.panel = this.ui.addPanel("Combat: " + this.label);
	var controls = this.panel.addPanel("Controls");
	controls.addButton("Close",new db.link(this,this.hide,[]));

	this.groups = {};
	this.groups.control = this.panel.addPanel("Groups");
	this.groups.control.addClass("small");
	var l = new db.local("");
	this.groups.dropdown = this.groups.control.addComboBox(null,null,l);
	this.groups.control.addButton("Activate",new db.link(this,this.activateGroup,[]));
	this.groups.panels = {};

	this.initialized = false;

	GM.debug.log("END: GM.combatINT","Finished initializing combat interface",2);
};

// -------------------------------------------------------------------------------------------------
//
// -------------------------------------------------------------------------------------------------
GM.combatINT.prototype.initialize = function() {
	GM.debug.log("CALL: GM.combatINT.initialize","Populating fields",2);
	this.initialized = true;
	this.groups.dropdown.setOptions(this.svc.getGroups().lists);
};

GM.combatINT.prototype.invalidate = function() {
	this.initialized = false;
};

// -------------------------------------------------------------------------------------------------
//
// -------------------------------------------------------------------------------------------------
GM.combatINT.prototype.detach = function() {
	GM.debug.log("CALL: GM.combatINT.detach","Detaching interface from the parent",2);
};

// -------------------------------------------------------------------------------------------------
//
// -------------------------------------------------------------------------------------------------
GM.combatINT.prototype.show = function() {
	GM.debug.log("CALL: GM.combatINT.show","Showing the combat interface",2);
	if(!this.initialized)
		this.initialize();
	this.ui.show();
};

// -------------------------------------------------------------------------------------------------
//
// -------------------------------------------------------------------------------------------------
GM.combatINT.prototype.hide = function() {
	GM.debug.log("CALL: GM.combatINT.hide","Closing the combat interface",2);
	this.ui.hide();
};

// -------------------------------------------------------------------------------------------------
//
// -------------------------------------------------------------------------------------------------
GM.combatINT.prototype.activateGroup = function() {
	var key = this.groups.dropdown.getValue();
	GM.debug.log("CALL: GM.combatINT.activateGroup","Activating combat for group: " + key,2);
	var ui = this.svc.groupCombatInterface(key);
};