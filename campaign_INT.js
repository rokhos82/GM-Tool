GM.campaignINT = function(parent,svc) {
	GM.debug.log("CALL: GM.campaignINT","Initializing campaignINT object",2);
	this.svc = svc;
	this.parent = parent;
	this.mainframe = svc.mainframe;

	this.children = [];

	this.label = "Campaign: " + this.svc.getName();
	this.ui = new ui.panel(this.label);
	this.widget = new GM.campaignControlINT(this,this.svc)

	this.activeEncounter = null;

	GM.debug.log("END: GM.campaignINT","Done initializing campaignINT object",2);
};

// -------------------------------------------------------------------------------------------------
// initialize
// -------------------------------------------------------------------------------------------------
GM.campaignINT.prototype.initialize = function() {
	GM.debug.log("CALL: GM.campaignINT.initialize","Attach UI elements to the parent",2);
	this.parent.appendChild(this);
	this.widget.initialize();
};

// -------------------------------------------------------------------------------------------------
// refreshView
// -------------------------------------------------------------------------------------------------
GM.campaignINT.prototype.refreshView = function() {
	GM.debug.log("CALL: GM.campaignINT.refreshView","Refreshing the UI to reflect changes to the data",2);
	this.ui.refreshView();
};

// -------------------------------------------------------------------------------------------------
// appendChild
// -------------------------------------------------------------------------------------------------
GM.campaignINT.prototype.appendChild = function(child) {
	GM.debug.log("CALL: GM.campaignINT.appendChild","Appending child UI",2);
	this.ui.appendChild(child.ui);
	return this.children.push(child) - 1;
};

// -------------------------------------------------------------------------------------------------
// detach
// -------------------------------------------------------------------------------------------------
GM.campaignINT.prototype.detach = function() {
	GM.debug.log("CALL: GM.campaignINT.detach","Detaching the interface from the parent",2);
	this.ui.parent.removeChild(this.ui);
	this.widget.detach();
};

// -------------------------------------------------------------------------------------------------
// setActiveEncounter
// -------------------------------------------------------------------------------------------------
GM.campaignINT.prototype.setActiveEncounter = function(ui) {
	GM.debug.log("CALL: GM.campaignINT.setActiveEncounter","Setting the active encounter",2);
	if(this.activeEncounter)
		this.activeEncounter.detach();
	this.activeEncounter = ui;
	this.activeEncounter.initialize();
};