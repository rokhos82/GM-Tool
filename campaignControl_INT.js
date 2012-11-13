GM.campaignControlINT = function(parent,svc) {
	GM.debug.log("CALL: GM.campaignControlINT","Initializing campaignControlINT object",2);

	this.parent = parent;
	this.svc = svc;
	this.mainframe = svc.mainframe;

	this.label = "Campaign: " + this.svc.getName();

	this.ui = new ui.panel(this.label);
	var b = this.ui.addButton("New Encounter",new db.link(this,this.addEncounterPopup,[]));
	var grps = this.ui.addPanel("Encounters");
	this.groupButtons = grps.addRadioSet("encounters");

	GM.debug.log("END: GM.campaignControlINT","End initializing campaignControlINT object",2);
};

// -------------------------------------------------------------------------------------------------
// initialize
// -------------------------------------------------------------------------------------------------
GM.campaignControlINT.prototype.initialize = function() {
	GM.debug.log("CALL: GM.campaignControlINT.initialize","Appending ui to parent",2);
	this.mainframe.sendEvent("setWidget",["campaignControl",{svc: this.svc,ui: this}]);
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
	var seq = new db.sequence();
	seq.addAction("add",new db.link(this,this.addEncounter,[dat]));
	seq.addAction("close",new db.link(this,this.hidePopup,[popup]));
	var b = p.addButton("Ok",seq);
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
GM.campaignControlINT.prototype.addEncounter = function(dat) {
	GM.debug.log("CALL: GM.campaignControlINT.addEncounter","",2);
	var name = dat.name;
	this.svc.addEncounter(name);
};

// -------------------------------------------------------------------------------------------------
// detach
// -------------------------------------------------------------------------------------------------
GM.campaignControlINT.prototype.detach = function() {
	this.ui.parent.removeChild(this.ui);
};