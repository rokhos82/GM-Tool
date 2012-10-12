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
	
	if(this.activeCampaign != undefined)
		this.activeCampaign.initialize();
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
				if(this.activeCampaign == undefined) {
					this.activeCampaign = new GM.campaignSVC(camps[c],this.mainframe,this);
				}
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

// -------------------------------------------------------------------------------------------------
// appendChild
// -------------------------------------------------------------------------------------------------
GM.main.prototype.appendChild = function(child) {
	this.controls.appendChild(child);
};

// -------------------------------------------------------------------------------------------------
// closePopup
// -------------------------------------------------------------------------------------------------
GM.main.prototype.closePopup = function(popup) {
	popup.hide();
	this.controls.removeChild(popup);
};

// -------------------------------------------------------------------------------------------------
// showCampaignPopup
// -------------------------------------------------------------------------------------------------
GM.main.prototype.showCampaignPopup = function(panel) {
	var popup = this.controls.addPopup();
	popup.addClass("popup");
	popup.dat = {
		name: "",
	};
	var p = popup.addPanel("New Campaign");
	var tf = p.addTextField("Name:",new db.connector(popup.dat,"name"),false);
	tf.focus();
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
// selectCampaign
// -------------------------------------------------------------------------------------------------
GM.main.prototype.selectCampaign = function(cb,conf) {
	var name = cb.getValue();
	if(this.activeCampaign.name != name) {
		if(conf || confirm("Change active campaign to: " + name)) {
			if(this.activeCampaign == undefined) {
				this.activeCampaign = new GM.campaignSVC(this.campaigns[name],this.mainframe,this);
				this.activeCampaign.initialize();
			}
			else {
				this.activeCampaign.setData(this.campaigns[name]);
			}
			this.mainframe.trigger("campaignChange");
		}
	}
};