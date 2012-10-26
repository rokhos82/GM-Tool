// -------------------------------------------------------------------------------------------------
// campaignSVC
// -------------------------------------------------------------------------------------------------
GM.campaignSVC = function(dat,frame,parent) {
	this.dat = null;
	this.name = dat.name + " Campaign";
	this.mainframe = new lib.mainframe(frame);
	this.parent = parent;
	this.groups = {};
	this.activeGroup = null;
	this.ui = new ui.panel(this.name);
	this.ui.setTitleData(new db.connector(this,"name"));
	
	var b = this.ui.addButton("New Group",new db.link(this,this.showPopup,[]));
	var grps = this.ui.addPanel("Groups");
	this.groupButtons = grps.addRadioSet("groups");
	
	this.setData(dat);
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
	
	if(active)
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
	popup.show();
	var p = popup.addPanel("New Group");
	var tf = p.addTextField("Name:",new db.connector(popup.dat,"name"));
	tf.focus();
	var b = p.addButton("Ok",new db.link(this,this.addGroup,[popup]));
	var b = p.addButton("Cancel",new db.link(this,this.hidePopup,[popup]));
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
		var b = this.groupButtons.addRadioButton(name);
		b.setUpdate(this,this.selectGroup,[name]);
		b.setChecked();
		this.selectGroup(name);
	}
	
	this.hidePopup(popup);
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

// -------------------------------------------------------------------------------------------------
// refreshView
// -------------------------------------------------------------------------------------------------
GM.campaignSVC.prototype.refreshView = function() {
	this.activeGroup.refreshView();
	this.ui.refreshView();
};