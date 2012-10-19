// -------------------------------------------------------------------------------------------------
// campaignSVC
// -------------------------------------------------------------------------------------------------
GM.campaignSVC = function(dat,frame,parent) {
	this.dat = dat;
	this.name = dat.name + " Campaign";
	this.mainframe = new lib.mainframe(frame);
	this.parent = parent;
	this.groups = {};
	this.activeGroup = undefined;
	this.ui = new ui.panel(this.name);
	this.ui.setTitleData(new db.connector(this,"name"));
	
	var b = this.ui.addButton("New Group",new db.link(this,this.showPopup,[]));
	var grps = this.ui.addPanel("Groups");
	this.groupButtons = grps.addRadioSet("groups");
	
	var active = false;
	for(var g in this.dat.groups) {
		var group = this.dat.groups[g];
		var b = this.groupButtons.addRadioButton(group.name);
		b.setUpdate(this,this.selectGroup,[group.name]);
		if(!active) {
			active = true;
			this.activeGroup = new GM.groupSVC(group,this);
			b.setChecked();
		}
	}
};

// -------------------------------------------------------------------------------------------------
//
// -------------------------------------------------------------------------------------------------
GM.campaignSVC.prototype.initialize = function() {
	this.parent.appendChild(this.ui);
	if(this.activeGroup != undefined)
		this.activeGroup.initialize();
};

// -------------------------------------------------------------------------------------------------
//
// -------------------------------------------------------------------------------------------------
GM.campaignSVC.prototype.setData = function(dat) {
	this.dat = dat;
	this.name = dat.name;
	this.refreshView();
};

// -------------------------------------------------------------------------------------------------
//
// -------------------------------------------------------------------------------------------------
GM.campaignSVC.prototype.showPopup = function() {
	var popup = this.ui.addPopup();
	popup.addClass("popup");
	popup.dat = {
		"name": ""
	};
	var p = popup.addPanel("New Group");
	var tf = p.addTextField("Name:",new db.connector(popup.dat,"name"));
	var b = p.addButton("Ok",new db.link(this,this.addGroup,[popup]));
	var b = p.addButton("Cancel",new db.link(this,this.hidePopup,[popup]));
	
	popup.show();
};

// -------------------------------------------------------------------------------------------------
//
// -------------------------------------------------------------------------------------------------
GM.campaignSVC.prototype.hidePopup = function(popup) {
	popup.hide();
	this.ui.removeChild(popup);
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
		if(this.activeGroup == undefined) {
			this.activeGroup = new GM.groupSVC(this.dat.groups[name],this);
			this.activeGroup.initialize();
		}
		else {
			this.activeGroup.setData(this.dat.groups[name]);
		}
		this.refreshView();
	}
	
	this.hidePopup(popup);
};

// -------------------------------------------------------------------------------------------------
// selectGroup
// -------------------------------------------------------------------------------------------------
GM.campaignSVC.prototype.selectGroup = function(name) {
	this.activeGroup.setData(this.dat.groups[name]);
	this.activeGroup.refreshView();
};

// -------------------------------------------------------------------------------------------------
// refreshView
// -------------------------------------------------------------------------------------------------
GM.campaignSVC.prototype.refreshView = function() {
	this.groupButtons.removeChildren();
	
	for(var g in this.dat.groups) {
		var group = this.dat.groups[g];
		var b = this.groupButtons.addRadioButton(group.name);
		b.setUpdate(this,this.selectGroup,[group.name]);
		if(group.name == this.activeGroup.name)
			b.setChecked();
	}
	this.activeGroup.refreshView();
	this.ui.refreshView();
};