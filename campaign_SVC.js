// -------------------------------------------------------------------------------------------------
// campaignSVC
// -------------------------------------------------------------------------------------------------
GM.campaignSVC = function(dat,frame,parent) {
	this.dat = dat;
	this.mainframe = new lib.mainframe(frame);
	this.parent = parent;
	this.groups = {};
	this.activeGroup = undefined;
	this.ui = new ui.panel("Groups");
	var rs = this.ui.addRadioSet("groups");
	
	var active = false;
	for(var g in this.dat.groups) {
		var group = this.dat.groups[g];
		if(!active) {
			active = true;
			this.activeGroup = new GM.groupSVC(group,this);
		}
		rs.addRadioButton(group.name);
	}
};

GM.campaignSVC.prototype.initialize = function() {
	this.parent.appendChild(this.ui);
	this.activeGroup.initialize();
};

GM.campaignSVC.prototype.setData = function(dat) {
	this.dat = dat;
	this.refreshView();
};

GM.campaignSVC.prototype.addGroup = function() {
};

GM.campaignSVC.prototype.selectGroup = function() {
};

GM.campaignSVC.prototype.refreshView = function() {
	this.ui.refreshView();
};