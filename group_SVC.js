// -------------------------------------------------------------------------------------------------
// groupSVC - the group service object.
// -------------------------------------------------------------------------------------------------
GM.groupSVC = function(dat,parent) {
	this.dat = {};
	this.name = dat.name;
	this.members = {};
	this.ui = new ui.panel("NPCs");
	this.parent = parent;
	this.mainframe = new lib.mainframe(parent.mainframe);
	
	this.ui.addButton("New NPC",new db.link(this,this.showPopup,[]));
	this.ui.addButton("Clone NPC");
	
	this.links = this.ui.addPanel("Quick Links");
	
	this.setData(dat);
};

// -------------------------------------------------------------------------------------------------
//
// -------------------------------------------------------------------------------------------------
GM.groupSVC.prototype.initialize = function() {
	this.parent.ui.appendChild(this.ui);
};

// -------------------------------------------------------------------------------------------------
// setData
// -------------------------------------------------------------------------------------------------
GM.groupSVC.prototype.setData = function(dat) {
	this.dat = dat;
	this.name = this.dat.name;
	this.links.removeChildren();
	
	for(var m in this.members) {
		var mem = this.members[m];
		this.ui.removeChild(mem.ui);
		delete this.members[m];
	}
	
	var i = 0;
	for(var m in this.dat.members) {
		var a = this.links.addAnchor(m,null,"#" + i);
		a.addClass("quick_link");
		i++;
	}
	
	var i = 0;
	for(var m in this.dat.members) {
		this.ui.addAnchor(null,i,null);
		var svc = new kantia.npcSVC(this.dat.members[m],this);
		this.members[m] = svc;
		this.ui.appendChild(svc.ui);
		i++;
	}
	
	this.refreshView();
};

// -------------------------------------------------------------------------------------------------
//
// -------------------------------------------------------------------------------------------------
GM.groupSVC.prototype.refreshView = function() {
	this.ui.refreshView();
};

// -------------------------------------------------------------------------------------------------
//
// -------------------------------------------------------------------------------------------------
GM.groupSVC.prototype.addNPC = function(popup) {
	var name = popup.dat.name;
	var template = popup.dat.template;
	this.hidePopup(popup);
	
	this.dat.members[name] = new kantia.npcDAT(name,template);
	this.members[name] = new kantia.npcSVC(this.dat.members[name],this);
	this.members[name].initialize();
	this.refreshView();
};

// -------------------------------------------------------------------------------------------------
//
// -------------------------------------------------------------------------------------------------
GM.groupSVC.prototype.showPopup = function() {
	var popup = this.ui.addPopup();
	popup.addClass("popup");
	popup.dat = {
		"name": "",
		"template": ""
	}
	var p = popup.addPanel("New NPC");
	var tf = p.addTextField("Name",new db.connector(popup.dat,"name"));
	var c = new ui.comboBox("Template");
	c.setComplexOptions(kantia.template.npcList);
	c.setData(new db.connector(popup.dat,"template"));
	p.appendChild(c);
	var b = p.addButton("Ok",new db.link(this,this.addNPC,[popup]));
	var b = p.addButton("Cancel",new db.link(this,this.hidePopup,[popup]));
	
	popup.show();
};

// -------------------------------------------------------------------------------------------------
// hidePopup
// -------------------------------------------------------------------------------------------------
GM.groupSVC.prototype.hidePopup = function(popup) {
	this.ui.removeChild(popup);
	popup.hide();
};