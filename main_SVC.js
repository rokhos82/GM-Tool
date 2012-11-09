// -------------------------------------------------------------------------------------------------
// main
// -------------------------------------------------------------------------------------------------
GM.mainSVC = function(root,dat) {
	GM.debug.log("call: GM.mainSVC","Initializing mainSVC object",2);
	this.root = root;
	this.mainframe = new lib.mainframe();
	this.dat = dat;
	
	this.campaigns = {};
	this.campaignList = {};
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
	
	this.campaigns[name] = new GM.campaignDAT(name);
	this.campaignList[name] = 1;
	this.selectCampaign(name);
};

// -------------------------------------------------------------------------------------------------
// selectCampaign
// -------------------------------------------------------------------------------------------------
GM.mainSVC.prototype.selectCampaign = function(name) {
	var result = false;
	if(this.campaigns[name]) {
		this.activeCampaign = this.campaigns[name];
		result = true;
	}
	else {
		GM.debug.log("ERROR: GM.mainSVC.prototype.selectCampaign","Campaign does not exist.",0);
		result = false;
	}
};

// -------------------------------------------------------------------------------------------------
// rollInitiative
// -------------------------------------------------------------------------------------------------
GM.mainSVC.prototype.rollInitiative = function(list) {
	list.removeChildren();
	var init = new Array();
	
	for(var m in this.activeCampaign.activeGroup.members) {
		var member = this.activeCampaign.activeGroup.members[m];
		var roll = GM.utility.d10() + member.dat.attributes.reflexes.score;
		for(var a in member.dat.armor) {
			var armor = member.dat.armor[a];
			if(armor.penalties.i)
				roll += parseInt(armor.penalties.i);
		}
		init.push({"name":member.dat.name,"roll":roll});
	}
	
	init.sort(function(a,b) {
		if(a.roll < b.roll)
			return 1;
		else if(a.roll > b.roll)
			return -1;
		else
			return 0;
	});
	
	for(var i in init) {
		list.addAnchorItem(init[i].name + " - " + init[i].roll,null,"#" + init[i].name.replace(/ /g,'').toLowerCase());
	}
};

// -------------------------------------------------------------------------------------------------
// rollGroupInitiative
// -------------------------------------------------------------------------------------------------
GM.mainSVC.prototype.rollGroupInitiative = function(list) {
	list.removeChildren();
	var sum = 0;
	var cnt = 0;
	for(var m in this.activeCampaign.activeGroup.members) {
		var member = this.activeCampaign.activeGroup.members[m];
		sum += member.dat.attributes.reflexes.score;
		cnt++;
	}
	var avg = Math.round(sum/cnt);
	var roll = kantia.func.d10(1) + avg;
	
	list.addItem("Group - " + roll);
};

// -------------------------------------------------------------------------------------------------
// hidePopup
// -------------------------------------------------------------------------------------------------
GM.mainSVC.prototype.hidePopup = function(popup) {
	popup.hide();
	this.controls.removeChild(popup);
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