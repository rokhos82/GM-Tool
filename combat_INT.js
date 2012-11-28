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
	this.groups.panel = this.panel.addPanel("Groups");
	this.groups.panel.addClass("small");
	this.groups.dropdown = this.groups.panel.addComboBox(null,null,null);
	this.groups.panel.addButton("Activate");

	var npcs = this.panel.addPanel("NPCs");

	this.initialized = false;

	GM.debug.log("END: GM.combatINT","Finished initializing combat interface",2);
};

GM.combatINT.prototype.initialize = function() {
	GM.debug.log("CALL: GM.combatINT.initialize","Attaching interface to the parent",2);
	this.initialized = true;
};

GM.combatINT.prototype.detach = function() {
	GM.debug.log("CALL: GM.combatINT.detach","Detaching interface from the parent",2);
};

GM.combatINT.prototype.show = function() {
	GM.debug.log("CALL: GM.combatINT.show","Showing the combat interface",2);
	if(!this.initialized)
		this.initialize();
	this.ui.show();
};

GM.combatINT.prototype.hide = function() {
	GM.debug.log("CALL: GM.combatINT.hide","Closing the combat interface",2);
	this.ui.hide();
};