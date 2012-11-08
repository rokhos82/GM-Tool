// -------------------------------------------------------------------------------------------------
// groupSVC - the group service object.
// -------------------------------------------------------------------------------------------------
GM.groupSVC = function(dat,parent) {
	this.dat = {};
	this.name = "Group - " + dat.name;
	this.members = {};
	this.ui = new ui.panel();
	this.npcs = this.ui.addPanel();
	this.parent = parent;
	this.mainframe = new lib.mainframe(parent.mainframe);
	
	this.controls = new ui.panel(this.name);
	this.controls.setTitleData(new db.connector(this,"name"));
	this.parent.addToSidebar(this.controls);
	this.controls.addButton("New NPC",new db.link(this,this.showPopup,[]));
	this.links = this.controls.addPanel("Quick Links");
	this.controls.addButton("Start Combat",new db.link(this,this.startCombat,[]));
	
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
	
	for(var m in this.dat.members) {
		var svc = new kantia.npcSVC(this.dat.members[m],this);
		this.members[m] = svc;
		this.npcs.addAnchor(null,svc.tag,null);
		this.npcs.appendChild(svc.ui);
	}
	
	this.refreshView();
};

// -------------------------------------------------------------------------------------------------
//
// -------------------------------------------------------------------------------------------------
GM.groupSVC.prototype.refreshView = function() {
	this.links.removeChildren();
	for(var m in this.members) {
		var a = this.links.addAnchor(m,null,"#" + this.members[m].tag);
		a.addClass("quick_link");
	}
	this.ui.refreshView();
	this.controls.refreshView();
};

// -------------------------------------------------------------------------------------------------
//
// -------------------------------------------------------------------------------------------------
GM.groupSVC.prototype.addNPC = function(popup) {
	var name = popup.dat.name;
	var template = popup.dat.template;
	this.hidePopup(popup);
	
	if(!this.dat.members[name]) {
		this.dat.members[name] = new kantia.npcDAT(name,template);
		this.members[name] = new kantia.npcSVC(this.dat.members[name],this);
		this.members[name].initialize();
		this.refreshView();
	}
	else
		alert("NPC with name " + name + " already exists.  Please use a different name.");
};

// -------------------------------------------------------------------------------------------------
//
// -------------------------------------------------------------------------------------------------
GM.groupSVC.prototype.showPopup = function() {
	var popup = this.ui.addPopup();
	popup.addClass("popup");
	popup.setOverlayClass("fog");
	popup.show();
	popup.dat = {
		"name": "",
		"template": ""
	}
	var p = popup.addPanel("New NPC");
	var tf = p.addTextField("Name",new db.connector(popup.dat,"name"));
	tf.focus();
	var c = new ui.comboBox("Template");
	c.setComplexOptions(kantia.template.npcList);
	c.setData(new db.connector(popup.dat,"template"));
	c.updateData();
	p.appendChild(c);
	var b = p.addButton("Ok",new db.link(this,this.addNPC,[popup]));
	var b = p.addButton("Cancel",new db.link(this,this.hidePopup,[popup]));
};

// -------------------------------------------------------------------------------------------------
// hidePopup
// -------------------------------------------------------------------------------------------------
GM.groupSVC.prototype.hidePopup = function(popup) {
	this.ui.removeChild(popup);
	popup.hide();
};

// -------------------------------------------------------------------------------------------------
//
// -------------------------------------------------------------------------------------------------
GM.groupSVC.prototype.appendNPC = function(npc) {
	this.npcs.addAnchor(null,npc.tag,null);
	this.npcs.appendChild(npc.ui);
};

GM.groupSVC.prototype.appendChild = function(ui) {
	this.ui.appendChild(ui);
};

// -------------------------------------------------------------------------------------------------
// removeNPC
// -------------------------------------------------------------------------------------------------
GM.groupSVC.prototype.removeNPC = function(name) {
	var member = this.members[name];
	this.npcs.removeChild(member.ui);
	member.destroy();
	delete this.members[name];
	delete this.dat.members[name];
	this.refreshView();
};

GM.groupSVC.prototype.startCombat = function() {
	var cp = new GM.groupCombatSVC(this);
	cp.initialize();
	cp.show();
};