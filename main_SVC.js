// -------------------------------------------------------------------------------------------------
// main
// -------------------------------------------------------------------------------------------------
GM.mainSVC = function(root,dat) {
	GM.debug.log("CALL: GM.mainSVC","Initializing mainSVC object",2);
	this.root = root;
	this.dat = dat;
	
	this.mainframe = new lib.mainframe();
	this.mainframe.setListener("setWidget",this,this.setWidget);
	
	this.campaigns = {};
	this.lists = {};
	this.lists.campaigns = [];
	this.lists.templates = [];
	this.activeCampaign = null;

	this.widgets = {};

	this.ui = new GM.mainINT(root,this);
	this.loadLocalStorage();
	this.ui.initialize();

	GM.debug.log("END: GM.mainSVC","Done initializing mainSVC object",2);
};

// -------------------------------------------------------------------------------------------------
// loadLocalStorage
// -------------------------------------------------------------------------------------------------
GM.mainSVC.prototype.loadLocalStorage = function() {
	GM.debug.log("CALL: GM.mainSVC.loadLocalStorage","Loading data from localStorage",1);
	if(JSON && localStorage) {
		var str = localStorage.getItem(GM.settings.localStorageToken);
		var first = null;
		if(str) {
			var data = JSON.parse(str);
			if(data.version == GM.mainDAT.version) {
				var camps = data.campaigns;
				for(var c in camps) {
					if(!first)
						first = this.addCampaignByData(camps[c]);
					else	
						this.addCampaignByData(camps[c]);
				}
			}
			else {
				GM.debug.log("ERROR: GM.mainSVC.loadLocalStorage","Version of data object in localStorage is out of date",0);
			}
		}
		if(first)
			this.setActiveCampaign(first);
	}
	else {
		GM.debug.log("ERROR: GM.mainSVC.loadLocalStorage","JSON and/or localStorage are not supported",0);
	}
};

// -------------------------------------------------------------------------------------------------
// saveToLocalStorage
// -------------------------------------------------------------------------------------------------
GM.mainSVC.prototype.saveToLocalStorage = function() {
	GM.debug.log("CALL: GM.mainSVC.saveToLocalStorage","Saving data object to localStorage: " + GM.settings.localStorageToken,1);
	if(JSON) {
		var str = JSON.stringify(this.dat);
		localStorage.setItem(GM.settings.localStorageToken,str);
	}
	else {
		GM.debug.log("ERROR: GM.mainSVC.saveToLocalStorage","Failed to save to localStorage.  JSON or localStorage not support by browser",0);
	}
};

// -------------------------------------------------------------------------------------------------
// clearLocalStorage
// -------------------------------------------------------------------------------------------------
GM.mainSVC.prototype.clearLocalStorage = function() {
	GM.debug.log("CALL: GM.mainSVC.clearLocalStorage","Removing the localStorage token: " + GM.settings.localStorageToken,1);
	if(localStorage) {
		if(confirm("Clear all data?")) {
			localStorage.removeItem(GM.settings.localStorageToken);
		}
	}
};

// -------------------------------------------------------------------------------------------------
// addCampaignByData
// -------------------------------------------------------------------------------------------------
GM.mainSVC.prototype.addCampaignByData = function(dat) {
	GM.debug.log("CALL: GM.mainSVC.addCampaignByData","Adding a new campaign from existing data",2);
	var name = dat.name;
	this.dat.campaigns[name] = dat;
	this.campaigns[name] = new GM.campaignSVC(this.dat.campaigns[name],this);
	var key = this.lists.campaigns.push(name);
	this.setActiveCampaign(key - 1);
	this.mainframe.trigger("addCampaign",true);
	return key - 1;
};

// -------------------------------------------------------------------------------------------------
// addCampaign
// -------------------------------------------------------------------------------------------------
GM.mainSVC.prototype.addCampaign = function(dat) {
	GM.debug.log("CALL: GM.mainSVC.addCampaign","Adding campaign: " + dat.name,2);
	var name = dat.name;
	
	this.dat.campaigns[name] = new GM.campaignDAT(name);
	this.campaigns[name] = new GM.campaignSVC(this.dat.campaigns[name],this);
	var key = this.lists.campaigns.push(name);
	this.setActiveCampaign(key - 1);
	this.mainframe.trigger("addCampaign");
};

// -------------------------------------------------------------------------------------------------
// setActiveCampaign
// -------------------------------------------------------------------------------------------------
GM.mainSVC.prototype.setActiveCampaign = function(key) {
	var name = this.lists.campaigns[key];
	var result = false;
	if(this.campaigns[name]) {
		this.activeCampaign = this.campaigns[name];
		this.ui.setActiveCampaign(this.activeCampaign.ui);
		GM.debug.log("MSG: GM.mainSVC.prototype.setActiveCampaign","Campaign " + name + " has been set as active")
		result = true;
	}
	else {
		GM.debug.log("ERROR: GM.mainSVC.prototype.setActiveCampaign","Campaign " + name + " does not exist",0);
		result = false;
	}
	return result;
};

// -------------------------------------------------------------------------------------------------
// getCampaignName
// -------------------------------------------------------------------------------------------------
GM.mainSVC.prototype.getCampaignName = function(key) {
	return this.lists.campaigns[key];
};


// -------------------------------------------------------------------------------------------------
// importData
// -------------------------------------------------------------------------------------------------
GM.mainSVC.prototype.importData = function(dataStr) {
	GM.debug.log("CALL: GM.mainSVC.importData","Overwriting existing data with import data",1);
	// Convert the JSON string back into an object.
	var data = JSON.parse(dataStr.json);

	// Reset the service structure and clear the data.
	this.reset();

	// Rebuild the campaigns (DAT & SVC) and campaign list.
	for(var c in data.campaigns) {
		this.addCampaignByData(data.campaigns[c]);
	}
};

// -------------------------------------------------------------------------------------------------
// exportData
// -------------------------------------------------------------------------------------------------
GM.mainSVC.prototype.exportData = function() {
	GM.debug.log("CALL: GM.mainSVC.exportData","Export data as JSON string",2);
	return JSON.stringify(this.dat);
};

// -------------------------------------------------------------------------------------------------
// getCampaigns
// -------------------------------------------------------------------------------------------------
GM.mainSVC.prototype.getCampaigns = function() {
	GM.debug.log("CALL: GM.mainSVC.getCampaigns","Getting the campaign list and active campaign",2);
	return { 
		list: this.lists.campaigns.slice(),
		active: this.activeCampaign ? this.activeCampaign.name : null
	};
};

// -------------------------------------------------------------------------------------------------
// getTemplates
// -------------------------------------------------------------------------------------------------
GM.mainSVC.prototype.getTemplates = function() {
	GM.debug.log("CALL: GM.mainSVC.getTemplates","Getting the template list and templates hash",2);
	return {
		list: this.lists.templates.slice(),
		hash: this.dat.templates
	};
};

// -------------------------------------------------------------------------------------------------
// reset - this function resets the services and data.  Child objects may also reset UI elements.
// -------------------------------------------------------------------------------------------------
GM.mainSVC.prototype.reset = function() {
	GM.debug.log("CALL: GM.mainSVC.reset","Resetting the services and data",1);
	for(var c in this.campaigns) {
		// Destroy the children.
		this.campaigns[c].destroy();
	}

	// Reset the campaigns hash and the campaignsList array.
	delete this.campaigns;
	this.campaigns = {};
	
	for(var l in this.lists) {
		this.lists[l] = [];
	}

	this.activeCampaign = null;

	// Reset the main interface.
	this.ui.reset();

	// Reset the data object.
	delete this.dat;
	this.dat = new GM.mainDAT();
};

// -------------------------------------------------------------------------------------------------
// setWidget
// -------------------------------------------------------------------------------------------------
GM.mainSVC.prototype.setWidget = function(key,widget) {
	GM.debug.log("CALL: GM.mainSVC.setWidget","Adding/replacing the widget mapped to " + key,2);
	var svc = widget.svc;
	var ui = widget.ui;

	if(this.widgets[key]) {
		// Remove the existing widget.
	}
	
	this.widgets[key] = svc;

	this.ui.setWidget(key,ui);
};