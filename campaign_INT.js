GM.campaignINT = function(parent,svc) {
	GM.debug.log("CALL: GM.campaignINT","Initializing campaignINT object",2);
	this.svc = svc;
	this.parent = parent;

	this.label = "Campaign: " + this.svc.getName();
	this.ui = new ui.panel();

	// Build sidebar controls
	var p = new ui.panel(this.label);
	this.addToSidebar(p);
	var b = p.addButton("New Group",new db.link(this,this.showPopup,[]));
	var grps = p.addPanel("Groups");
	this.groupButtons = grps.addRadioSet("groups");
	GM.debug.log("END: GM.campaignINT","Done initializing campaignINT object",2);
};

// -------------------------------------------------------------------------------------------------
//
// -------------------------------------------------------------------------------------------------
GM.campaignINT.prototype.initialize = function() {
	this.parent.appendChild(this);
};

// -------------------------------------------------------------------------------------------------
//
// -------------------------------------------------------------------------------------------------
GM.campaignINT.prototype.showPopup = function() {
	var popup = this.ui.addPopup();
	popup.addClass("popup");
	popup.setOverlayClass("fog");
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
GM.campaignINT.prototype.hidePopup = function(popup) {
	popup.hide();
	this.ui.removeChild(popup);
};

// -------------------------------------------------------------------------------------------------
// refreshView
// -------------------------------------------------------------------------------------------------
GM.campaignINT.prototype.refreshView = function() {
	this.ui.refreshView();
};

GM.campaignINT.prototype.addToSidebar = function(ui) {
	this.parent.addToSidebar(ui);
};