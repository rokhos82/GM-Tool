GM.encounterControlINT = function(parent,svc) {
	GM.debug.log("CALL: GM.encounterControlINT","Initializing encounterControlINT object",2);
	this.parent = parent;
	this.svc = svc;
	this.mainframe = this.svc.mainframe;

	this.label = "Encounter: " + this.svc.getName();
	this.ui = new ui.panel(this.label);
	GM.debug.log("END: GM.encounterControlINT","Finished initializing encounterControlINT object",2);
};

// -------------------------------------------------------------------------------------------------
// initialize
// -------------------------------------------------------------------------------------------------
GM.encounterControlINT.prototype.initialize = function() {
	GM.debug.log("CALL: GM.encounterControlINT.initialize","Appending interface to parent",2);
	this.mainframe.sendEvent("setWidget",["encounterControl",{svc: this.svc,ui: this}]);
};

// -------------------------------------------------------------------------------------------------
// detach
// -------------------------------------------------------------------------------------------------
GM.encounterControlINT.prototype.detach = function() {
	GM.debug.log("CALL: GM.encounterControlINT.detach","Datching interface from the parent",2);
	this.parent.removeChild(this);
};