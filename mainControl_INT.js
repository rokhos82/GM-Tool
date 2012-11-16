GM.mainControlINT = function(parent,svc) {
	GM.debug.log("CALL: GM.mainControlINT","Initializing mainControlINT object",2);

	this.parent = parent;
	this.svc = svc;
	this.mainframe = this.svc.mainframe;

	this.ui = new ui.panel("Controls");

	// Build the controls panel
	var p = this.ui.addPanel("Data");
	var b = p.addButton("Load",new db.link(this.svc,this.svc.loadLocalStorage,[]));
	var b = p.addButton("Save",new db.link(this.svc,this.svc.saveToLocalStorage,[]));
	var b = p.addButton("Clear",new db.link(this.svc,this.svc.clearLocalStorage,[]));
	var b = p.addButton("Import",new db.link(this,this.importDataPopup,[]));
	var b = p.addButton("Export",new db.link(this,this.exportDataPopup,[]));

	var p = this.ui.addPanel("Campaign Selector");
	var cb = p.addComboBox("Campaigns",this.svc.getCampaigns().list,new db.local(""));
	this.mainframe.addHandler("addCampaign","campaignSelector",this.refreshCampaigns,this,[]);
	this.selector = cb;
	var b = p.addButton("Select Campaign",new db.link(this,this.changeCampaign,[]));
	var b = p.addButton("Create Campaign",new db.link(this,this.showCampaignPopup,[]));

	GM.debug.log("END: GM.mainControlINT","Finished initializing mainControlINT object",2);
};

// -------------------------------------------------------------------------------------------------
// initialize
// -------------------------------------------------------------------------------------------------
GM.mainControlINT.prototype.initialize = function() {
	this.parent.appendChild(this);
}

// -------------------------------------------------------------------------------------------------
// changeCampaign
// -------------------------------------------------------------------------------------------------
GM.mainControlINT.prototype.changeCampaign = function() {
	var key = this.selector.getValue();
	if(!this.svc.setActiveCampaign(key))
		alert("Unable to select campaign (" + key + ").  Check log for details.");
}

// -------------------------------------------------------------------------------------------------
// refreshCampaigns
// -------------------------------------------------------------------------------------------------
GM.mainControlINT.prototype.refreshCampaigns = function() {
	GM.debug.log("CALL: GM.mainControlINT.refreshCampaigns","Refreshing the campaign list",2);
	var campaigns = this.svc.getCampaigns();
	this.selector.setOptions(campaigns.list);
	this.selector.selectOption(campaigns.active);
};

// -------------------------------------------------------------------------------------------------
// closePopup
// -------------------------------------------------------------------------------------------------
GM.mainControlINT.prototype.closePopup = function(popup) {
	GM.debug.log("CALL: GM.mainControlINT.closePopup","Hiding and removing the popup",2);
	popup.hide();
	this.ui.removeChild(popup);
};

// -------------------------------------------------------------------------------------------------
// showCampaignPopup
// -------------------------------------------------------------------------------------------------
GM.mainControlINT.prototype.showCampaignPopup = function(panel) {
	GM.debug.log("CALL: GM.mainControlINT.showCampaignPopup","Building new campaign popup",2);
	var popup = this.ui.addPopup();
	popup.show();
	popup.addClass("popup");
	popup.setOverlayClass("fog");
	var dat = {
		name: ""
	};

	var p = popup.addPanel("New Campaign");
	var tf = p.addTextField("Name:",new db.connector(dat,"name"),false);
	tf.focus();
	var seq = new db.sequence();
	seq.addAction("add",new db.sequence.action(this.svc,this.svc.addCampaign,[dat]));
	seq.addAction("refresh",new db.sequence.action(this,this.refreshView,[]));
	seq.addAction("close",new db.sequence.action(this,this.closePopup,[popup]));
	var b = p.addButton("Ok",seq);
	var b = p.addButton("Cancel",new db.link(this,this.closePopup,[popup]));
};

GM.mainControlINT.prototype.refreshView = function() {
	this.refreshCampaigns();
};

GM.mainControlINT.prototype.reset = function() {
	this.selector.setOptions(null);
};