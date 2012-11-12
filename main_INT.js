GM.mainINT = function(root,svc) {
	GM.debug.log("CALL: GM.mainINT","Initializing mainINT object",2);

	this.root = root;
	this.svc = svc;

	this.mainframe = this.svc.mainframe;
	this.children = [];

	this.ui = new ui.panel();
	this.sidebar = new ui.panel();
	this.sidebar.addClass("sidebar");
	this.popups = new ui.panel();

	this.controls = this.sidebar.addPanel("Controls");

	// Build sidebar
		
	// Build the popups
	
	// Build the controls panel
	var p = this.controls.addPanel("Data");
	var b = p.addButton("Load",new db.link(this.svc,this.svc.loadLocalStorage,[]));
	var b = p.addButton("Save",new db.link(this.svc,this.svc.saveToLocalStorage,[]));
	var b = p.addButton("Clear",new db.link(this.svc,this.svc.clearLocalStorage,[]));
	var b = p.addButton("Import",new db.link(this,this.importDataPopup,[]));
	var b = p.addButton("Export",new db.link(this,this.exportDataPopup,[]));
	
	var p = this.controls.addPanel("Campaign Selector");
	var cb = p.addComboBox("Campaigns",this.campaignList,new db.local(""));
	//cb.setUpdate(this,this.selectCampaign,[cb,false]);
	this.selector = cb;
	this.mainframe.addHandler("campaignListUpdate","campaigns",cb.setOptions,cb,[this.campaignList]);
	this.mainframe.addHandler("campaignChange","campaigns",cb.refreshView,cb,[]);
	var b = p.addButton("Select Campaign",new db.link(this,this.changeCampaign,[]));
	var b = p.addButton("Create Campaign",new db.link(this,this.showCampaignPopup,[]));

	GM.debug.log("END: GM.mainINT","Finished initializing mainINT object",2);
};

// -------------------------------------------------------------------------------------------------
// initialize
// -------------------------------------------------------------------------------------------------
GM.mainINT.prototype.initialize = function() {
	GM.debug.log("CALL: GM.mainINT.initialize","Attaching UI elements to the DOM root",2);
	this.root.appendChild(this.ui.dom);
	this.root.appendChild(this.sidebar.dom);
	this.root.appendChild(this.popups.dom);
};

// -------------------------------------------------------------------------------------------------
// refreshView
// -------------------------------------------------------------------------------------------------
GM.mainINT.prototype.refreshView = function() {
	GM.debug.log("CALL: GM.mainINT.refreshView","Refreshing the UI to reflect changes to the data",2);
	this.refreshCampaigns();
};

// -------------------------------------------------------------------------------------------------
// closePopup
// -------------------------------------------------------------------------------------------------
GM.mainINT.prototype.closePopup = function(popup) {
	GM.debug.log("CALL: GM.mainINT.closePopup","Hiding and removing the popup",2);
	popup.hide();
	this.popups.removeChild(popup);
};

// -------------------------------------------------------------------------------------------------
// showCampaignPopup
// -------------------------------------------------------------------------------------------------
GM.mainINT.prototype.showCampaignPopup = function(panel) {
	GM.debug.log("CALL: GM.mainINT.showCampaignPopup","Building new campaign popup",2);
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
	var key = this.selector.getValue();
	if(!this.svc.setActiveCampaign(key))
		alert("Unable to select campaign (" + key + ").  Check log for details.");
};


// -------------------------------------------------------------------------------------------------
// refreshCampaigns
// -------------------------------------------------------------------------------------------------
GM.mainINT.prototype.refreshCampaigns = function() {
	GM.debug.log("CALL: GM.mainINT.refreshCampaigns","Refreshing the campaign list",2);
	var campaigns = this.svc.getCampaigns();
	this.selector.setOptions(campaigns.list);
	this.selector.selectOption(campaigns.active);
};

// -------------------------------------------------------------------------------------------------
// importDataPopup
// -------------------------------------------------------------------------------------------------
GM.mainINT.prototype.importDataPopup = function() {
	GM.debug.log("GM.mainINT.importDataPopup","Showing the data import popup",2);
	var popup = this.controls.addPopup();
	popup.addClass("popup");
	popup.setOverlayClass("fog");
	popup.show();
	var dat = {
		json: ""
	};

	var p = popup.addPanel("JSON Import");
	var ta = p.addTextArea(new db.connector(dat,"json"));
	var seq = new db.sequence();
	seq.addAction("import",new db.sequence.action(this.svc,this.svc.importData,[dat]));
	seq.addAction("hide",new db.sequence.action(this,this.hidePopup,[popup]));
	var b = p.addButton("Ok",seq);
	var b = p.addButton("Cancel",new db.link(this,this.hidePopup,[popup]));
};

// -------------------------------------------------------------------------------------------------
// exportDataPopup
// -------------------------------------------------------------------------------------------------
GM.mainINT.prototype.exportDataPopup = function() {
	GM.debug.log("GM.mainINT.exportDataPopup","Show the data export popup",2);
	var popup = this.controls.addPopup();
	popup.addClass("popup");
	popup.setOverlayClass("fog");
	popup.show();

	var p = popup.addPanel("JSON Export");
	var dat = {
		json: this.svc.exportData()
	};
	var ta = p.addTextArea(new db.connector(dat,"json"));
	var b = p.addButton("Close",new db.link(this,this.hidePopup,[popup]));
};

// -------------------------------------------------------------------------------------------------
// addToSidebar
// -------------------------------------------------------------------------------------------------
GM.mainINT.prototype.addToSidebar = function(ui) {
	this.sidebar.appendChild(ui);
};

// -------------------------------------------------------------------------------------------------
// appendChild
// -------------------------------------------------------------------------------------------------
GM.mainINT.prototype.appendChild = function(child) {
	this.children.push(child);
	this.ui.appendChild(child.ui);
};

// -------------------------------------------------------------------------------------------------
// destroy
// -------------------------------------------------------------------------------------------------
GM.mainINT.prototype.destroy = function() {
};