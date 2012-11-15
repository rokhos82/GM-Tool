GM.encounterINT = function(parent,svc) {
	GM.debug.log("CALL: GM.encounterINT","Initializing encounterINT object",2);
	this.parent = parent;
	this.svc = svc;
	this.mainframe = this.svc.mainframe;

	this.label = "Encounter: " + this.svc.getName();
	this.ui = new ui.panel(this.label);
	this.widget = new GM.encounterControlINT(this,this.svc);
	this.children = [];
	this.activeGroup = null;

	var ta = this.ui.addTextArea(this.svc.getDataConnector("notes"));
	ta.addClass("desc_box");

	GM.debug.log("END: GM.encounterINT","Finished initializing encounterINT object",2);
};

// -------------------------------------------------------------------------------------------------
// initialize
// -------------------------------------------------------------------------------------------------
GM.encounterINT.prototype.initialize = function() {
	GM.debug.log("CALL: GM.encounterINT.initialize","Attaching interface to parent",2);
	this.parent.appendChild(this);
	this.widget.initialize();
	if(this.activeGroup)
		this.activeGroup.initialize();
};

// -------------------------------------------------------------------------------------------------
// detach
// -------------------------------------------------------------------------------------------------
GM.encounterINT.prototype.detach = function() {
	GM.debug.log("CALL: GM.encounterINT.detach","Detaching interface from parent",2);
	this.ui.parent.removeChild(this.ui);
	this.widget.detach();
};

// -------------------------------------------------------------------------------------------------
// appendChild
// -------------------------------------------------------------------------------------------------
GM.encounterINT.prototype.appendChild = function(child) {
	GM.debug.log("CALL: GM.encounterINT.appendChild","Appending child interface",2);
	this.ui.appendChild(child.ui);
	return this.children.push(child) - 1;
};

// -------------------------------------------------------------------------------------------------
// setActiveGroup
// -------------------------------------------------------------------------------------------------
GM.encounterINT.prototype.setActiveGroup = function(ui) {
	GM.debug.log("CALL: GM.encounterINT.setActiveGroup","Setting active group interface",2);
	if(this.activeGroup)
		this.activeGroup.detach();
	this.activeGroup = ui;
	this.activeGroup.initialize();
};