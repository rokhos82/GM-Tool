// -------------------------------------------------------------------------------------------------
// main
// -------------------------------------------------------------------------------------------------
GM.mainSVC = function(root,dat) {
	GM.debug.log("call: GM.mainSVC","Initializing mainSVC object",2);
	this.root = root;
	this.mainframe = new lib.mainframe();
	this.dat = dat;
	
	this.campaigns = {};
	this.campaignList = [];
	this.activeCampaign = null;
	
	this.templates = {};
	this.templateList = {};
	
	//this.loadData();

	this.ui = new GM.mainINT(root,this);
	this.ui.initialize();
	GM.debug.log("end: GM.mainSVC","Finished initializing mainSVC object",2);
};

// -------------------------------------------------------------------------------------------------
// loadData
// -------------------------------------------------------------------------------------------------
GM.mainSVC.prototype.loadData = function() {
	GM.debug.log("call: GM.mainSVC.loadData","Loading data from localStorage",2);
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
		GM.debug.log("ERROR: GM.mainSVC.loadData","JSON and/or localStorage are not supported",0);
	}
};

// -------------------------------------------------------------------------------------------------
// saveData
// -------------------------------------------------------------------------------------------------
GM.mainSVC.prototype.saveData = function() {
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
GM.mainSVC.prototype.clearData = function() {
	if(localStorage) {
		if(confirm("Clear all data?")) {
			localStorage.removeItem("kantia.gm.campaigns");
		}
	}
};

// -------------------------------------------------------------------------------------------------
// appendChild
// -------------------------------------------------------------------------------------------------
GM.mainSVC.prototype.appendChild = function(child) {
	this.panel.appendChild(child);
};

// -------------------------------------------------------------------------------------------------
// addCampaign
// -------------------------------------------------------------------------------------------------
GM.mainSVC.prototype.addCampaign = function(dat) {
	GM.debug.log("call: GM.mainSVC.addCampaign","Adding campaign: " + dat.name,2);
	var name = dat.name;
	
	this.dat.campaigns[name] = new GM.campaignDAT(name);
	//this.campaigns[name] = new GM.campaignSVC(this.dat.campaigns[name]);
	this.campaigns[name] = {};
	var key = this.campaignList.push(name);
	this.setActiveCampaign(key - 1);
};

// -------------------------------------------------------------------------------------------------
// setActiveCampaign
// -------------------------------------------------------------------------------------------------
GM.mainSVC.prototype.setActiveCampaign = function(key) {
	var name = this.campaignList[key];
	var result = false;
	if(this.campaigns[name]) {
		this.activeCampaign = this.campaigns[name];
		GM.debug.log("MSG: GM.mainSVC.prototype.selectCampaign","Campaign " + name + " has been set as active")
		result = true;
	}
	else {
		GM.debug.log("ERROR: GM.mainSVC.prototype.selectCampaign","Campaign, " + name + " ,does not exist",0);
		result = false;
	}
	return result;
};

GM.mainSVC.prototype.getCampaignName = function(key) {
	return this.campaignList[key];
};


// -------------------------------------------------------------------------------------------------
// importDataPopup
// -------------------------------------------------------------------------------------------------
GM.mainSVC.prototype.importDataPopup = function() {
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
	seq.addAction("import",new db.sequence.action(this,this.importData,[dat]));
	seq.addAction("hide",new db.sequence.action(this,this.hidePopup,[popup]));
	var b = p.addButton("Ok",seq);
	var b = p.addButton("Cancel",new db.link(this,this.hidePopup,[popup]));
};

// -------------------------------------------------------------------------------------------------
// importData
// -------------------------------------------------------------------------------------------------
GM.mainSVC.prototype.importData = function(data) {
	var str = data.json;
	var camps = JSON.parse(str);
	var first = null;
	for(var c in camps) {
		if(!first) {
			first = c;
		}
		this.campaigns[c] = camps[c];
		this.campaignList[c] = c;
	}

	if(this.activeCampaign) {
		this.activeCampaign.setData(camps[first]);
	}
	else {
		this.activeCampaign = new GM.campaignSVC(camps[first],this.mainframe,this);
		this.activeCampaign.initialize();
	}

	this.selector.setOptions(this.campaignList);
};

// -------------------------------------------------------------------------------------------------
// exportDataPopup
// -------------------------------------------------------------------------------------------------
GM.mainSVC.prototype.exportDataPopup = function() {
	var popup = this.controls.addPopup();
	popup.addClass("popup");
	popup.setOverlayClass("fog");
	popup.show();

	var p = popup.addPanel("JSON Export");
	var dat = {
		json: JSON.stringify(this.campaigns)
	};
	var ta = p.addTextArea(new db.connector(dat,"json"));
	var b = p.addButton("Close",new db.link(this,this.hidePopup,[popup]));
};

GM.mainSVC.prototype.addToSidebar = function(ui) {
	this.sidebar.appendChild(ui);
};

GM.mainSVC.prototype.getCampaigns = function() {
	return { 
		list: this.campaignList.slice(),
		active: this.activeCampaign ? this.activeCampaign.name : null
	};
};