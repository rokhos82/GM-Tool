GM.campaignControlINT = function(parent,svc) {
	GM.debug.log("CALL: GM.campaignControlINT","Initializing campaignControlINT object",2);

	this.parent = parent;
	this.svc = svc;
	this.mainframe = svc.mainframe;
	this.mainframe.addHandler("addCampaign","encounterList",this.refreshEncounters,this,[]);

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
// selectEncounter
// -------------------------------------------------------------------------------------------------
GM.campaignControlINT.prototype.selectEncounter = function(name) {
	GM.debug.log("CALL: GM.campaignControlINT.selectEncounter","Selecting encounter: " + name,2);
	this.svc.selectEncounter(name);
};

// -------------------------------------------------------------------------------------------------
// addEncounter
// -------------------------------------------------------------------------------------------------
GM.campaignControlINT.prototype.addEncounter = function(dat) {
	GM.debug.log("CALL: GM.campaignControlINT.addEncounter","Adding encounter: " + dat.name,2);
	var name = dat.name;
	this.svc.addEncounter(name);
	this.refreshEncounters();
	this.groupButtons.selectButton(name);	
};

// -------------------------------------------------------------------------------------------------
// detach
// -------------------------------------------------------------------------------------------------
GM.campaignControlINT.prototype.detach = function() {
	GM.debug.log("CALL: GM.campaignControlINT.detach","Detaching interface from the parent",2);
	this.ui.parent.removeChild(this.ui);
};

// -------------------------------------------------------------------------------------------------
// refreshEncounters
// -------------------------------------------------------------------------------------------------
GM.campaignControlINT.prototype.refreshEncounters = function() {
	GM.debug.log("CALL: GM.campaignControlINT.refreshEncounters","Rebuilding the encounter list",2);
	
	var encounters = this.svc.getEncounters();
	encounters.list.sort();
	this.groupButtons.removeChildren();

	var checked = false;
	for(var i in encounters.list) {
		var n = encounters.list[i];
		var b = this.groupButtons.addRadioButton(n);
		b.setUpdate(this,this.selectEncounter,[n]);
		if(!checked) {
			checked = true;
			b.setChecked();
		}
	}
};