GM.mainINT = function(root,svc) {
	this.root = root;
	this.svc = svc;

	this.mainframe = this.svc.mainframe;

	this.ui = new ui.panel();
	this.sidebar = new ui.panel();
	this.addClass("sidebar");

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
};

GM.mainINT.prototype.initialize = function() {
	this.root.appendChild(this.ui.dom);
	this.root.appendChild(this.sidebar.dom);
};