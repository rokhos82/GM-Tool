GM.campaignINT = function(parent,svc) {
	GM.debug.log("CALL: GM.campaignINT","Initializing campaignINT object",2);
	this.svc = svc;
	this.parent = parent;
	this.mainframe = svc.mainframe;

	this.children = [];

	this.label = "Campaign: " + this.svc.getName();
	this.ui = new ui.panel(this.label);

	// Build sidebar controls
	this.mainframe.sendEvent("setWidget",["campaignControl",{svc: this.svc,ui: new GM.campaignControlINT(this,this.svc)}]);

	GM.debug.log("END: GM.campaignINT","Done initializing campaignINT object",2);
};

// -------------------------------------------------------------------------------------------------
// initialize
// -------------------------------------------------------------------------------------------------
GM.campaignINT.prototype.initialize = function() {
	GM.debug.log("CALL: GM.campaignINT.initialize","Attach UI elements to the parent",2);
	this.parent.appendChild(this);
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
	this.children.push(child);
	this.ui.appendChild(child.ui);
};