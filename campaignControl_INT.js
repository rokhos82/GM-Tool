GM.campaignControlINT = function(parent,svc) {
	GM.debug.log("CALL: GM.campaignControlINT","Initializing campaignControlINT object",2);

	this.parent = parent;
	this.svc = svc;
	this.mainframe = svc.mainframe;

	this.label = "Campaign: " + this.svc.getName();

	this.ui = new ui.panel(this.label);
	var b = this.ui.addButton("New Encounter",new db.link(this,this.addEncounterPopup,[]));
	var grps = this.ui.addPanel("Encounters");
	this.groupButtons = grps.addRadioSet("groups");

	GM.debug.log("END: GM.campaignControlINT","End initializing campaignControlINT object",2);
};

GM.campaignControlINT.prototype.initialize = function() {
};

// -------------------------------------------------------------------------------------------------
// addEncounterPopup
// -------------------------------------------------------------------------------------------------
GM.campaignControlINT.prototype.addEncounterPopup = function() {
	GM.debug.log("CALL: GM.campaignControlINT.addEncounterPopup","Show the new group popup",2);
	var popup = this.ui.addPopup();
	popup.addClass("popup");
	popup.setOverlayClass("fog");
	var dat = {
		"name": ""
	};
	popup.show();
	var p = popup.addPanel("New Encounter ");
	var tf = p.addTextField("Name:",new db.connector(dat,"name"));
	tf.focus();
	var seq = db.sequence();
	seq.addAction("add",new db.link(this,this.addGroup,[dat]));
	seq.addAction("close",new db.link(this,this.hidePopup,[popup]));
	var b = p.addButton("Ok",new db.link(this,this.addGroup,[popup]));
	var b = p.addButton("Cancel",new db.link(this,this.hidePopup,[popup]));
};

// -------------------------------------------------------------------------------------------------
// hidePopup
// -------------------------------------------------------------------------------------------------
GM.campaignControlINT.prototype.hidePopup = function(popup) {
	GM.debug.log("CALL: GM.campaignControlINT.hidePopup","Close the popup",2);
	popup.hide();
	this.ui.removeChild(popup);
};

// -------------------------------------------------------------------------------------------------
// addEncounter
// -------------------------------------------------------------------------------------------------
GM.campaignControlINT.prototype.addEncount = function() {
};