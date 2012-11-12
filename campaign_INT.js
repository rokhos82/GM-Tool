GM.campaignINT = function(parent,svc) {
	GM.debug.log("CALL: GM.campaignINT","Initializing campaignINT object",2);
	this.svc = svc;
	this.parent = parent;
	this.mainframe = svc.mainframe;

	this.label = "Campaign: " + this.svc.getName();
	this.ui = new ui.panel();

	// Build sidebar controls
	this.mainframe.sendEvent("setWidget",["campaignControl",{svc: this.svc,ui: new GM.campaignControlINT(this,this.svc)}]);

	GM.debug.log("END: GM.campaignINT","Done initializing campaignINT object",2);
};

// -------------------------------------------------------------------------------------------------
// initialize
// -------------------------------------------------------------------------------------------------
GM.campaignINT.prototype.initialize = function() {
	this.parent.appendChild(this);
};

// -------------------------------------------------------------------------------------------------
// showPopup
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
// hidePopup
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

// -------------------------------------------------------------------------------------------------
// addToSidebar
// -------------------------------------------------------------------------------------------------
GM.campaignINT.prototype.addToSidebar = function(ui) {
	this.parent.addToSidebar(ui);
};