var GM = {};

// -------------------------------------------------------------------------------------------------
// 
// -------------------------------------------------------------------------------------------------
GM.main = function(root) {
	this.root = root;
	this.mainframe = new lib.mainframe();
	this.controls = new ui.panel("Controls",new lib.mainframe(this.mainframe));
	this.controls.setParent(this.root);
	this.root.appendChild(this.controls.dom);
	
	this.groupButtons = undefined;
	
	this.campaigns = {};
	this.campaignList = {};
	this.activeCampaign = undefined;
	
	// Build the controls panel
	var p = this.controls.addPanel();
	var b = p.addButton("Save Data");
	var b = p.addButton("Clear Data");
	
	var p = this.controls.addPanel("Campaign Selector");
	var cb = p.addComboBox("Campaigns",this.campaignList,new db.local(""));
	cb.setUpdate(this,this.selectCampaign,cb);
	this.mainframe.addHandler("campaignListUpdate","campaigns",cb.setOptions,cb,[this.campaignList]);
	this.mainframe.addHandler("campaignChange","campaigns",cb.refreshView,cb,[]);
	var b = p.addButton("Select Campaign",new db.link(this,this.selectCampaign,[cb,false]));
	var b = p.addButton("Create Campaign",new db.link(this,this.addCampaign,[cb]));
	var b = p.addButton("New Group...",new db.link(this,this.addGroup,[]));
	var b = p.addButton("New NPC...");
	
	var p = this.controls.addPanel("Groups");
	this.mainframe.addHandler("groupsUpdate","groups_panel",this.refreshGroupPanel,this,[p]);
	this.mainframe.addHandler("campaignChange","groups_panel",this.refreshGroupPanel,this,[p]);
	
	if(this.activeCampaign)
		this.refreshGroupPanel(p);
};

// -------------------------------------------------------------------------------------------------
// 
// -------------------------------------------------------------------------------------------------
GM.main.prototype.loadData = function() {
};

// -------------------------------------------------------------------------------------------------
// 
// -------------------------------------------------------------------------------------------------
GM.main.prototype.saveData = function() {
};

// -------------------------------------------------------------------------------------------------
// 
// -------------------------------------------------------------------------------------------------
GM.main.prototype.addGroup = function() {
	// Get the name from the user.
	var name = prompt("Group Name","");
	
	if(this.activeCampaign.groups[name]) {
		alert("Group with name (" + name + ") already exists.  Please choose a different name or delete the old group.");
	}
	else {
		this.activeCampaign.groups[name] = new GM.groupDAT;
		this.mainframe.trigger("groupsUpdate");
	}
};

// -------------------------------------------------------------------------------------------------
// 
// -------------------------------------------------------------------------------------------------
GM.main.prototype.refreshGroupPanel = function(panel) {
	panel.removeChildren();
	
	this.groupButtons = panel.addRadioSet("groups");
		
	for(var g in this.activeCampaign.groups) {
		var rb = this.groupButtons.addRadioButton(g);
		rb.setUpdate(this,this.selectGroup,[g]);
	}
};

// -------------------------------------------------------------------------------------------------
// 
// -------------------------------------------------------------------------------------------------
GM.main.prototype.selectGroup = function(grp) {
	alert(grp);
};

// -------------------------------------------------------------------------------------------------
// 
// -------------------------------------------------------------------------------------------------
GM.main.prototype.addCampaign = function(cb) {
	var name = prompt("Enter campaign name:","");
	
	if(name) {
		if(this.campaigns[name])
			alert("Campaign named " + name + " already exists.  Please use a different name.");
		
		this.campaigns[name] = new GM.campaignDAT(name);
		this.campaignList[name] = name;
		this.mainframe.trigger("campaignListUpdate");
		cb.selectOption(name);
		this.selectCampaign(cb,true);
	}
};

// -------------------------------------------------------------------------------------------------
// 
// -------------------------------------------------------------------------------------------------
GM.main.prototype.selectCampaign = function(comboBox,conf) {
	var name = comboBox.getValue();
	if(conf || confirm("Change active campaign to: " + name)) {
		this.activeCampaign = this.campaigns[name];
		this.mainframe.trigger("campaignChange");
	}
};

// -------------------------------------------------------------------------------------------------
// groupDAT - the group data object.
// -------------------------------------------------------------------------------------------------
GM.groupDAT = function() {
	this.members = {};
	this.active = "";
};

// -------------------------------------------------------------------------------------------------
// campaignDAT - the campaign data object.
// -------------------------------------------------------------------------------------------------
GM.campaignDAT = function(name) {
	this.name = name;
	this.groups = {};
	this.map = undefined;
	this.players = [];
};