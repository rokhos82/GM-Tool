// -------------------------------------------------------------------------------------------------
// main
// -------------------------------------------------------------------------------------------------
GM.main = function(root) {
	this.root = root;
	this.mainframe = new lib.mainframe();
	this.controls = new ui.panel("Controls",new lib.mainframe(this.mainframe));
	this.controls.setParent(this.root);
	this.root.appendChild(this.controls.dom);
	
	this.campaigns = {};
	this.campaignList = {};
	this.activeCampaign = undefined;
	
	this.templates = {};
	this.templateList = {};
	
	this.loadData();
	
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
	
	var p = this.controls.addPanel("Campaign Selector");
	var cb = p.addComboBox("Campaigns",this.campaignList,new db.local(""));
	cb.setUpdate(this,this.selectCampaign,[cb,false]);
	this.mainframe.addHandler("campaignListUpdate","campaigns",cb.setOptions,cb,[this.campaignList]);
	this.mainframe.addHandler("campaignChange","campaigns",cb.refreshView,cb,[]);
	var b = p.addButton("Select Campaign",new db.link(this,this.selectCampaign,[cb,false]));
	var b = p.addButton("Create Campaign",new db.link(this,this.showCampaignPopup,[]));
};

// -------------------------------------------------------------------------------------------------
// loadData
// -------------------------------------------------------------------------------------------------
GM.main.prototype.loadData = function() {
	if(JSON && localStorage) {
		var str = localStorage.getItem("kantia.gm.campaigns");
		if(str) {
			var camps = JSON.parse(str);
			for(var c in camps) {
				if(this.activeCampaign == undefined)
					this.activeCampaign = new GM.campaignSVC(camps[c],this.mainframe,this);
				this.campaigns[c] = camps[c];
				this.campaignList[c] = c;
			}
		}
	}
	else {
		alert("JSON or localStorage is no supported!");
	}
};

// -------------------------------------------------------------------------------------------------
// saveData
// -------------------------------------------------------------------------------------------------
GM.main.prototype.saveData = function() {
	if(JSON) {
		var str = JSON.stringify(this.campaigns);
		localStorage.setItem("kantia.gm.campaigns",str);
	}
	else {
		alert("JSON or localStorage is not supported!");
	}
};

// -------------------------------------------------------------------------------------------------
// clearData
// -------------------------------------------------------------------------------------------------
GM.main.prototype.clearData = function() {
	if(localStorage) {
		if(confirm("Clear all data?")) {
			localStorage.removeItem("kantia.gm.campaigns");
		}
	}
};

GM.main.prototype.appendChild = function(child) {
	this.controls.appendChild(child);
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
	
	var n = new ui.panel("NPCs");
	
	var rs = panel.addRadioSet("groups");
		
	for(var g in this.activeCampaign.groups) {
		var rb = rs.addRadioButton(g);
		rb.setUpdate(this,this.selectGroup,[g,n]);
	}
	
	panel.appendChild(n);
	
	this.mainframe.addHandler("npcListUpdate","npcPanel",this.refreshNPCPanel,this,[n]);
};

// -------------------------------------------------------------------------------------------------
// selectGroup
// -------------------------------------------------------------------------------------------------
GM.main.prototype.selectGroup = function(grp,panel) {
	panel.removeChildren();
	
	var rs = panel.addRadioSet("npcs");
	
	var group = this.activeCampaign.groups[grp];
	this.activeCampaign.activeGroup = group;
	
	this.mainframe.trigger("npcListUpdate");
};

// -------------------------------------------------------------------------------------------------
// addNPC
// -------------------------------------------------------------------------------------------------
GM.main.prototype.addNPC = function(popup,cb) {
	popup.hide();
	
	var template = cb.getValue();
	var name = prompt("Enter NPC name");
	
	this.activeCampaign.activeGroup.members[name] = new kantia.npcDAT(name,template);
	this.activeCampaign.activeGroup.membersList[name] = name;
	
	this.mainframe.trigger("npcListUpdate");
};

// -------------------------------------------------------------------------------------------------
// refreshNPCPanel
// -------------------------------------------------------------------------------------------------
GM.main.prototype.refreshNPCPanel = function(panel) {
	panel.removeChildren();
	
	var rs = panel.addRadioSet("npcs");
	
	for(var m in this.activeCampaign.activeGroup.members) {
		var member = this.activeCampaign.activeGroup.members[m];
		var rb = rs.addRadioButton(member.name + " - " + member.template);
	}
};

// -------------------------------------------------------------------------------------------------
// selectNPC
// -------------------------------------------------------------------------------------------------
GM.main.prototype.selectNPC = function(npc,panel) {
};

GM.main.prototype.closePopup = function(popup) {
	popup.hide();
	this.controls.removeChild(popup);
};

GM.main.prototype.showCampaignPopup = function(panel) {
	var popup = this.controls.addPopup();
	popup.addClass("popup");
	popup.dat = {
		name: "",
	};
	var p = popup.addPanel("New Campaign");
	var tf = p.addTextField("Name:",new db.connector(popup.dat,"name"),false);
	var b = p.addButton("Ok",new db.link(this,this.addCampaign,[popup]));
	var b = p.addButton("Cancel",new db.link(this,this.closePopup,[popup]));
	popup.show();
};

// -------------------------------------------------------------------------------------------------
// addCampaign
// -------------------------------------------------------------------------------------------------
GM.main.prototype.addCampaign = function(popup) {
	var name = popup.dat.name;
	
	if(this.campaigns[name])
		alert("Campaign named " + name + " already exists.  Please use a different name.");
	
	this.campaigns[name] = new GM.campaignDAT(name);
	this.campaignList[name] = name;
	this.mainframe.trigger("campaignListUpdate");
	if(this.activeCampaign != undefined) {
		this.activeCampaign.setData(this.campaigns[name]);
	}
	else {
		this.activeCampaign = new GM.campaignSVC(this.campaigns[name],this.mainframe,this);
		this.activeCampaign.initialize();
	}
	this.closePopup(popup);
};

// -------------------------------------------------------------------------------------------------
// 
// -------------------------------------------------------------------------------------------------
GM.main.prototype.selectCampaign = function(cb,conf) {
	var name = cb.getValue();
	if(conf || confirm("Change active campaign to: " + name)) {
		this.activeCampaign = this.campaigns[name];
		this.mainframe.trigger("campaignChange");
	}
};