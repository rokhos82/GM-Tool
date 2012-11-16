////////////////////////////////////////////////////////////////////////////////////////////////////
// groupINT
////////////////////////////////////////////////////////////////////////////////////////////////////
GM.groupINT = function(parent,svc) {
	GM.debug.log("CALL: GM.groupINT","Initializing groupINT object",2);

	this.parent = parent;
	this.svc = svc;
	this.mainframe = svc.mainframe;
	this.mainframe.addHandler("addCampaign","refreshView",this.refreshView,this,[]);

	this.label = "Group: " + this.svc.getName();
	this.ui = new ui.panel(this.label);
	this.widget = new GM.groupControlINT(this,this.svc);
	this.members = [];

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
	GM.debug.log("CALL: GM.groupINT.detach","Detaching interface from the parent",2);
	this.ui.parent.removeChild(this.ui);
	this.widget.detach();
};

// -------------------------------------------------------------------------------------------------
// appendChild
// -------------------------------------------------------------------------------------------------
GM.groupINT.prototype.appendChild = function(child) {
	this.ui.appendChild(child.ui);
};

// -------------------------------------------------------------------------------------------------
// addNPC
// -------------------------------------------------------------------------------------------------
GM.groupINT.prototype.addMember = function(ui) {
	this.members.push(ui);
	ui.initialize();
};

// -------------------------------------------------------------------------------------------------
// refreshView
// -------------------------------------------------------------------------------------------------
GM.groupINT.prototype.refreshView = function() {
	GM.debug.log("CALL: GM.groupINT.refreshView","Refreshing interface to match data",2);
	var members = this.svc.getMembers().members;

	for(var m in members) {
		this.addMember(members[m].ui);
	}
};