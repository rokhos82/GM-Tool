// -------------------------------------------------------------------------------------------------
// groupSVC - the group service object.
// -------------------------------------------------------------------------------------------------
GM.groupSVC = function(dat,parent) {
	this.dat = {};
	this.name = dat.name;
	this.members = {};
	this.memberCount = 0;
	this.ui = new ui.panel("NPCs");
	this.parent = parent;
	this.mainframe = new lib.mainframe(parent.mainframe);
	
	this.ui.addButton("New NPC",new db.link(this,this.showPopup,[]));
	this.ui.addButton("Clone NPC");
	
	this.links = this.ui.addPanel("Quick Links");
	this.npcs = this.ui.addPanel();
	
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
	this.npcs.removeChildren();
	this.members = {};
	
	var i = 0;
	for(var m in this.dat.members) {
		var a = this.links.addAnchor(m,null,"#" + (i+1));
		a.addClass("quick_link");
		this.memberCount++;
		i++;
	}
	
	var i = 0;
	for(var m in this.dat.members) {
		this.npcs.addAnchor(null,i+1,null);
		var svc = new kantia.npcSVC(this.dat.members[m],this);
		this.members[m] = svc;
		this.npcs.appendChild(svc.ui);
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
	
	this.memberCount++;
	var a  = this.links.addAnchor(name,null,"#" + this.memberCount);
	a.addClass("quick_link");
	this.npcs.addAnchor(null,this.memberCount,null);
	
	
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
	c.updateData();
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

GM.groupSVC.prototype.appendNPC = function(npc) {
	this.npcs.appendChild(npc.ui);
};