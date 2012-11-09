// -------------------------------------------------------------------------------------------------
// main
// -------------------------------------------------------------------------------------------------
GM.mainSVC = function(root) {
	this.root = root;
	this.mainframe = new lib.mainframe();
	
	this.campaigns = {};
	this.campaignList = {};
	this.activeCampaign = null;
	
	this.templates = {};
	this.templateList = {};
	
	//this.loadData();

	this.ui = new GM.mainINT(root,this);
	this.ui.initialize();
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
	this.panel.appendChild(child);
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
	popup.show();
	popup.addClass("popup");
	popup.setOverlayClass("fog");
	popup.dat = {
		name: "",
	};

	var p = popup.addPanel("New Campaign");
	var tf = p.addTextField("Name:",new db.connector(popup.dat,"name"),false);
	tf.focus();
	var b = p.addButton("Ok",new db.link(this,this.addCampaign,[popup]));
	var b = p.addButton("Cancel",new db.link(this,this.closePopup,[popup]));
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
	this.selector.selectOption(name);
	this.selectCampaign(name,true);
	this.closePopup(popup);
};

// -------------------------------------------------------------------------------------------------
// selectCampaign
// -------------------------------------------------------------------------------------------------
GM.main.prototype.selectCampaign = function(name,conf) {
	if(!name)
		name = this.selector.getValue();

	if(!this.activeCampaign) {
		this.activeCampaign = new GM.campaignSVC(this.campaigns[name],this.mainframe,this);
		this.activeCampaign.initialize();
		this.mainframe.trigger("campaignChange");
	}
	else if(this.activeCampaign.name != name) {
		if(conf || confirm("Change active campaign to: " + name)) {
			this.activeCampaign.setData(this.campaigns[name]);
			this.activeCampaign.refreshView();
			this.mainframe.trigger("campaignChange");
		}
	}
};

// -------------------------------------------------------------------------------------------------
// rollInitiative
// -------------------------------------------------------------------------------------------------
GM.main.prototype.rollInitiative = function(list) {
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
GM.main.prototype.rollGroupInitiative = function(list) {
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
GM.main.prototype.hidePopup = function(popup) {
	popup.hide();
	this.controls.removeChild(popup);
};

// -------------------------------------------------------------------------------------------------
// importDataPopup
// -------------------------------------------------------------------------------------------------
GM.main.prototype.importDataPopup = function() {
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
GM.main.prototype.importData = function(data) {
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
GM.main.prototype.exportDataPopup = function() {
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

GM.main.prototype.addToSidebar = function(ui) {
	this.sidebar.appendChild(ui);
};