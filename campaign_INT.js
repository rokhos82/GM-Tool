GM.campaignINT = function(parent,svc) {
	this.svc = svc;
	this.parent = parent;
	this.ui = new ui.panel(this.svc.getName());

	// Build sidebar controls
	var p = new ui.panel(this.name);
	this.addToSidebar(p);
	var b = p.addButton("New Group",new db.link(this,this.showPopup,[]));
	var grps = p.addPanel("Groups");
	this.groupButtons = grps.addRadioSet("groups");
};

GM.campaignINT.prototype.initialize = function() {
	this.parent.appendChild(this);
};