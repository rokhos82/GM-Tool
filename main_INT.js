GM.mainINT = function(root,svc) {
	GM.debug.log("call: GM.mainINT","Initializing mainINT object",2);

	this.root = root;
	this.svc = svc;

	this.mainframe = this.svc.mainframe;

	this.ui = new ui.panel();
	this.sidebar = new ui.panel();
	this.sidebar.addClass("sidebar");
	this.popups = new ui.panel();

	this.controls = this.sidebar.addPanel("Controls");

	// Build sidebar
	var p = this.sidebar.addPanel("Initiative");
	var l = p.addList();
	this.mainframe.addHandler("group_change","init_list",l.removeChildren,l,[]);
	var b = p.addButton("Indiv. Roll",new db.link(this,this.rollInitiative,[l]));
	var b = p.addButton("Group Roll", new db.link(this,this.rollGroupInitiative,[l]));
	var p = this.sidebar.addPanel("Players");
	
	// Build the popups
	var npcPopup = this.controls.addPopup();
	npcPopup.addClass("popup");
	var p = npcPopup.addPanel("NPC Templates");
	var cb = p.addComboBox("Templates:");
	cb.setComplexOptions(kantia.template.npcList);
	var b = p.addButton("Ok",new db.link(this,this.addNPC,[npcPopup,cb]));
	var b = p.addButton("Cancel",new db.link(npcPopup,npcPopup.hide,[]));
	
	// Build the controls panel
	var p = this.controls.addPanel();
	var b = p.addButton("Save Data",new db.link(this,this.saveData,[]));
	var b = p.addButton("Clear Data",new db.link(this,this.clearData,[]));
	var b = p.addButton("Import",new db.link(this,this.importDataPopup,[]));
	var b = p.addButton("Export",new db.link(this,this.exportDataPopup,[]));
	
	var p = this.controls.addPanel("Campaign Selector");
	var cb = p.addComboBox("Campaigns",this.campaignList,new db.local(""));
	//cb.setUpdate(this,this.selectCampaign,[cb,false]);
	this.selector = cb;
	this.mainframe.addHandler("campaignListUpdate","campaigns",cb.setOptions,cb,[this.campaignList]);
	this.mainframe.addHandler("campaignChange","campaigns",cb.refreshView,cb,[]);
	var b = p.addButton("Select Campaign",new db.link(this,this.selectCampaign,[null,false]));
	var b = p.addButton("Create Campaign",new db.link(this,this.showCampaignPopup,[]));

	GM.debug.log("end: GM.mainINT","Finished initializing mainINT object",2);
};

// -------------------------------------------------------------------------------------------------
// initialize
// -------------------------------------------------------------------------------------------------
GM.mainINT.prototype.initialize = function() {
	GM.debug.log("call: GM.mainINT.initialize","Attaching UI elements to the DOM root",2);
	this.root.appendChild(this.ui.dom);
	this.root.appendChild(this.sidebar.dom);
	this.root.appendChild(this.popups.dom);
};

// -------------------------------------------------------------------------------------------------
// refreshView
// -------------------------------------------------------------------------------------------------
GM.mainINT.prototype.refreshView = function() {
	GM.debug.log("call: GM.mainINT.refreshView","Refreshing the UI to reflect changes to the data",2);
	this.refreshCampaigns();
};

// -------------------------------------------------------------------------------------------------
// closePopup
// -------------------------------------------------------------------------------------------------
GM.mainINT.prototype.closePopup = function(popup) {
	GM.debug.log("call: GM.mainINT.closePopup","Hiding and removing the popup",2);
	popup.hide();
	this.popups.removeChild(popup);
};

// -------------------------------------------------------------------------------------------------
// showCampaignPopup
// -------------------------------------------------------------------------------------------------
GM.mainINT.prototype.showCampaignPopup = function(panel) {
	GM.debug.log("call: GM.mainINT.showCampaignPopup","Building new campaign popup",2);
	var popup = this.controls.addPopup();
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

// -------------------------------------------------------------------------------------------------
// changeCampaign
// -------------------------------------------------------------------------------------------------
GM.mainINT.prototype.changeCampaign = function() {
	var name = this.selector.getValue();
	if(!this.svc.selectCampaign(name))
		alert("Unable to select campaign.  Check log for details.");
};

GM.mainINT.prototype.refreshCampaigns = function() {
	GM.debug.log("call: GM.mainINT.refreshCampaigns","Refreshing the campaign list",2);
	var campaigns = this.svc.getCampaigns();
	this.selector.setOptions(campaigns.list);
	this.select.selectOption(campaigns.active);
};