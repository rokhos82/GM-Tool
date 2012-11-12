GM.mainControlINT = function(parent,svc) {
	this.parent = parent;
	this.svc = svc;
	this.mainframe = new lib.mainframe(this.parent.mainframe);

	this.ui = new ui.panel("Controls");

	// Build the controls panel
	var p = this.ui.addPanel("Data");
	var b = p.addButton("Load",new db.link(this.svc,this.svc.loadLocalStorage,[]));
	var b = p.addButton("Save",new db.link(this.svc,this.svc.saveToLocalStorage,[]));
	var b = p.addButton("Clear",new db.link(this.svc,this.svc.clearLocalStorage,[]));
	var b = p.addButton("Import",new db.link(this,this.importDataPopup,[]));
	var b = p.addButton("Export",new db.link(this,this.exportDataPopup,[]));

	var p = this.ui.addPanel("Campaign Selector");
	var cb = p.addComboBox("Campaigns",this.campaignList,new db.local(""));
	this.selector = cb;
	this.mainframe.addHandler("campaignListUpdate","campaigns",cb.setOptions,cb,[this.campaignList]);
	this.mainframe.addHandler("campaignChange","campaigns",cb.refreshView,cb,[]);
	var b = p.addButton("Select Campaign",new db.link(this,this.changeCampaign,[]));
	var b = p.addButton("Create Campaign",new db.link(this,this.showCampaignPopup,[]));
};

GM.mainControlINT.prototype.initialize = function() {
	this.parent.appendChild(this);
}