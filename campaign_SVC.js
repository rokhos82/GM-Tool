// -------------------------------------------------------------------------------------------------
// campaignSVC
// -------------------------------------------------------------------------------------------------
GM.campaignSVC = function(dat,parent) {
	GM.debug.log("CALL: GM.campaignSVC","Initializing campaignSVC object",2);
	this.dat = dat;
	this.mainframe = new lib.mainframe(parent.mainframe);
	this.parent = parent;
	this.encounters = {};
	this.activeGroup = null;
	this.ui = new GM.campaignINT(this.parent.ui,this);

	this.ui.initialize();
	GM.debug.log("END: GM.campaignSVC","Done initializing campaignSVC object",2);
};

// -------------------------------------------------------------------------------------------------
//
// -------------------------------------------------------------------------------------------------
GM.campaignSVC.prototype.getName = function() {
	return this.dat.name;
};

// -------------------------------------------------------------------------------------------------
// addGroup
// -------------------------------------------------------------------------------------------------
GM.campaignSVC.prototype.addGroup = function(popup) {
	var name = popup.dat.name;
	if(this.dat.groups[name]) {
		alert("Group with name " + name + " already exists!  Please use a different name.");
	}
	else {
		this.dat.groups[name] = new GM.groupDAT(name);
		var b = this.groupButtons.addRadioButton(name);
		b.setUpdate(this,this.selectGroup,[name]);
		b.setChecked();
		this.selectGroup(name);
	}
	
	this.hidePopup(popup);
};

GM.campaignSVC.prototype.addEncounter = function() {
};

// -------------------------------------------------------------------------------------------------
// selectGroup
// -------------------------------------------------------------------------------------------------
GM.campaignSVC.prototype.selectGroup = function(name) {
	if(!this.activeGroup) {
		this.activeGroup = new GM.groupSVC(this.dat.groups[name],this);
		this.activeGroup.initialize();
	}
	else {
		this.activeGroup.setData(this.dat.groups[name]);
	}
	this.activeGroup.refreshView();
	this.mainframe.trigger("group_change");
};