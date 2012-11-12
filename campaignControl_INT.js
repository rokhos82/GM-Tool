GM.campaignControlINT = function(parent,svc) {
	GM.debug.log("CALL: GM.campaignControlINT","Initializing campaignControlINT object",2);

	this.parent = parent;
	this.svc = svc;
	this.mainframe = svc.mainframe;

	this.label = "Campaign: " + this.svc.getName();

	this.ui = new ui.panel(this.label);
	var b = this.ui.addButton("New Group",new db.link(this,this.showPopup,[]));
	var grps = this.ui.addPanel("Groups");
	this.groupButtons = grps.addRadioSet("groups");

	GM.debug.log("END: GM.campaignControlINT","End initializing campaignControlINT object",2);
};

GM.campaignControlINT.prototype.initialize = function() {
};