////////////////////////////////////////////////////////////////////////////////////////////////////
// encounterControlINT
////////////////////////////////////////////////////////////////////////////////////////////////////
GM.encounterControlINT = function(parent,svc) {
	GM.debug.log("CALL: GM.encounterControlINT","Initializing encounterControlINT object",2);
	
	this.parent = parent;
	this.svc = svc;
	this.mainframe = this.svc.mainframe;
	this.attached = false;

	this.label = "Encounter: " + this.svc.getName();
	this.ui = new ui.panel(this.label);
	var b = this.ui.addButton("New Group",new db.link(this,this.addGroupPopup,[]));
	var b = this.ui.addButton("Start Combat",new db.link(this,this.startCombat,[]));
	var grps = this.ui.addPanel("Groups");
	this.groups = grps.addRadioSet("groups");
	this.popups = {};
	this.addPopup("combat",new GM.combatINT(this,this.svc));

	this.mainframe.addHandler("clearWidgets","ECI" + this.svc.getName,this.detach,this,[]);

	GM.debug.log("END: GM.encounterControlINT","Finished initializing encounterControlINT object",2);
};

// -------------------------------------------------------------------------------------------------
// initialize
// -------------------------------------------------------------------------------------------------
GM.encounterControlINT.prototype.initialize = function() {
	GM.debug.log("CALL: GM.encounterControlINT.initialize","Appending interface to parent",2);
	this.mainframe.sendEvent("setWidget",["encounterControl",{svc: this.svc,ui: this}]);
	this.attached = true;
};

// -------------------------------------------------------------------------------------------------
// detach
// -------------------------------------------------------------------------------------------------
GM.encounterControlINT.prototype.detach = function() {
	GM.debug.log("CALL: GM.encounterControlINT.detach","Datching interface from the parent",2);
	if(this.attached)
		this.ui.parent.removeChild(this.ui);
	this.attached = false;
};

// -------------------------------------------------------------------------------------------------
// addGroupPopup
// -------------------------------------------------------------------------------------------------
GM.encounterControlINT.prototype.addGroupPopup = function() {
	GM.debug.log("CALL: GM.encounterControlINT.addGroupPopup","Building and displaying new group popup",2);
	var popup = this.ui.addPopup("popup","fog");
	popup.show();
	var p = popup.addPanel("New Group");

	var dat = {
		name: ""
	};
	var tf = p.addTextField("Name",new db.connector(dat,"name"));
	tf.focus();
	
	var seq = new db.sequence();
	seq.addAction("add",new db.link(this,this.addGroup,[dat]));
	seq.addAction("hide",new db.link(this,this.hidePopup,[popup]));
	p.addButton("Ok",seq);
	p.addButton("Cancel",new db.link(this,this.hidePopup,[popup]));
};

// -------------------------------------------------------------------------------------------------
// hidePopup
// -------------------------------------------------------------------------------------------------
GM.encounterControlINT.prototype.hidePopup = function(popup) {
	GM.debug.log("CALL: GM.encounterControlINT.hidePopup","Hiding and removing the popup",2);
	popup.hide();
	this.ui.removeChild(popup);
};

// -------------------------------------------------------------------------------------------------
// addGroup
// -------------------------------------------------------------------------------------------------
GM.encounterControlINT.prototype.addGroup = function(dat) {
	GM.debug.log("CALL: GM.encounterControlINT.addGroup","Adding group: " + dat.name,2);
	var name = dat.name;
	this.svc.addGroup(name);
	this.refreshGroups(name);
	this.popups["combat"].invalidate();
};

// -------------------------------------------------------------------------------------------------
// refreshGroups
// -------------------------------------------------------------------------------------------------
GM.encounterControlINT.prototype.refreshGroups = function(select) {
	GM.debug.log("CALL: GM.encounterControlINT.refreshGroups","Refeshing group selectors",2);
	this.groups.removeChildren();

	for(var g in this.svc.getGroups().groups) {
		var b = this.groups.addRadioButton(g);
		b.setUpdate(this.svc,this.svc.selectGroup,[g]);
		if(g == select)
			b.setChecked();
	}
};

// -------------------------------------------------------------------------------------------------
// selectGroup
// -------------------------------------------------------------------------------------------------
GM.encounterControlINT.prototype.selectGroup = function(name) {
	GM.debug.log("CALL: GM.encounterControlINT.selectGroup","Selecing group: " + name,2);
	this.svc.selectGroup(name);
};

// -------------------------------------------------------------------------------------------------
// refreshView
// -------------------------------------------------------------------------------------------------
GM.encounterControlINT.prototype.refreshView = function() {
	GM.debug.log("CALL: GM.encounterControlINT.prototype","Refreshing control view",2);
	this.refreshGroups();
};

// -------------------------------------------------------------------------------------------------
// startCombat
// -------------------------------------------------------------------------------------------------
GM.encounterControlINT.prototype.startCombat = function() {
	GM.debug.log("CALL: GM.encounterControlINT.startCombat","Showing the combat interface",2);
	this.popups["combat"].show();
};

GM.encounterControlINT.prototype.addPopup = function(key,popup) {
	GM.debug.log("CALL: GM.encounterControlINT.addPopup","Adding popup: " + key,2);
	this.popups[key] = popup;
	this.ui.appendChild(popup.ui);
};