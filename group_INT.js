////////////////////////////////////////////////////////////////////////////////////////////////////
// groupINT
////////////////////////////////////////////////////////////////////////////////////////////////////
GM.groupINT = function(parent,svc) {
	GM.debug.log("CALL: GM.groupINT","Initializing groupINT object",2);

	this.parent = parent;
	this.svc = svc;
	this.mainframe = svc.mainframe;

	this.label = "Group: " + this.svc.getName();
	this.ui = new ui.panel(this.label);
	this.widget = new GM.groupControlINT(this,this.svc);
	this.npcs = [];

	GM.debug.log("END: GM.groupINT","Finished initializing groupINT object",2);
};

// -------------------------------------------------------------------------------------------------
//
// -------------------------------------------------------------------------------------------------
GM.groupINT.prototype.initialize = function() {
	GM.debug.log("CALL: GM.groupINT.initialize","Attaching interface to parent",2);
	this.parent.appendChild(this);
	this.widget.initialize();
};

// -------------------------------------------------------------------------------------------------
// detach
// -------------------------------------------------------------------------------------------------
GM.groupINT.prototype.detach = function() {
	GM.debug.log("GM.groupINT.detach","Detaching interface from the parent",2);
	this.ui.parent.removeChild(this.ui);
	this.widget.detach();
};

// -------------------------------------------------------------------------------------------------
// addNPC
// -------------------------------------------------------------------------------------------------
GM.groupINT.prototype.addNPC = function(npc) {
	this.npcs.push(npc);
	this.ui.appendChild(npc.ui);
};