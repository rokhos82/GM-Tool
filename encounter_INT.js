GM.encounterINT = function(parent,svc) {
	GM.debug.log("CALL: GM.encounterINT","Initializing encounterINT object",2);
	this.parent = parent;
	this.svc = svc;
	this.mainframe = this.svc.mainframe;

	this.label = "Encounter: " + this.svc.getName();
	this.ui = new ui.panel(this.label);
	this.widget = new GM.encounterControlINT(this,this.svc);
	GM.debug.log("END: GM.encounterINT","Finished initializing encounterINT object",2);
};

// -------------------------------------------------------------------------------------------------
// initialize
// -------------------------------------------------------------------------------------------------
GM.encounterINT.prototype.initialize = function() {
	GM.debug.log("GM.encounterINT.initialize","Attaching UI to parent",2);
	this.parent.appendChild(this);
	this.widget.initialize();
};

// -------------------------------------------------------------------------------------------------
// detach
// -------------------------------------------------------------------------------------------------
GM.encounterINT.prototype.detach = function() {
	this.ui.parent.removeChild(this.ui);
	this.widget.detach();
};