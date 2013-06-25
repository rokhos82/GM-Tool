////////////////////////////////////////////////////////////////////////////////////////////////////
// groupControlINT
////////////////////////////////////////////////////////////////////////////////////////////////////
GM.groupControlINT = function(parent,svc) {
	GM.debug.log("CALL: GM.groupControlINT","Initializing groupControlINT object",2);
	
	this.parent = parent;
	this.svc = svc;
	this.mainframe = svc.mainframe;

	this.attached = false;
	this.label = "Group: " + svc.getName();
	this.ui = new ui.panel(this.label);

	this.ui.addButton("New NPC",new db.link(this,this.addNPCPopup,[]));
	var p = this.ui.addPanel("Quick Links");
	this.links = p.addList(false);

	this.mainframe.addHandler("clearWidgets","GCI" + this.svc.getName(),this.detach,this,[]);
	this.mainframe.addHandler("clearEncounterWidgets","GCI" + this.svc.getName(),this.detach,this,[]);;
	this.mainframe.addHandler("addNPC","quicklinks",this.refreshQuickLinks,this,[]);
	this.refreshQuickLinks();

	GM.debug.log("END: GM.groupControlINT","Finished initializing groupControlINT object",2);
};

// -------------------------------------------------------------------------------------------------
// initialize
// -------------------------------------------------------------------------------------------------
GM.groupControlINT.prototype.initialize = function() {
	GM.debug.log("CALL: GM.groupControlINT.initialize","Attaching widget to parent",2);
	this.mainframe.sendEvent("setWidget",["groupControl",{svc: this.svc,ui: this}]);
	this.attached = true;
};

// -------------------------------------------------------------------------------------------------
// detach
// -------------------------------------------------------------------------------------------------
GM.groupControlINT.prototype.detach = function() {
	GM.debug.log("CALL: GM.groupControlINT.detach","Detaching interface from the parent",2);
	if(this.attached)
		this.ui.parent.removeChild(this.ui);
	this.attached = false;
};

// -------------------------------------------------------------------------------------------------
// addNPCPopup
// -------------------------------------------------------------------------------------------------
GM.groupControlINT.prototype.addNPCPopup = function() {
	GM.debug.log("CALL: GM.groupControlINT.addNPCPopup","Creating new npc popup",2);
	var popup = this.ui.addPopup("popup","fog");
	popup.show();
	
	var dat = {
		"name": "",
		"template": "",
		"quantity": ""
	}

	var p = popup.addPanel("New NPC");
	var tf = p.addTextField("Name",new db.connector(dat,"name"));
	tf.focus();
	var tf = p.addTextField("Quantity",new db.connector(dat,"quantity"));
	var c = new ui.comboBox("Template");
	c.setComplexOptions(kantia.template.npcList);
	c.setData(new db.connector(dat,"template"));
	c.updateData();
	p.appendChild(c);

	var seq = new db.sequence();
	seq.addAction("add",new db.link(this,this.addNPC,[dat]));
	seq.addAction("hide",new db.link(this,this.hidePopup,[popup]));
	var b = p.addButton("Ok",seq);
	var b = p.addButton("Cancel",new db.link(this,this.hidePopup,[popup]));
};

// -------------------------------------------------------------------------------------------------
// hidePopup
// -------------------------------------------------------------------------------------------------
GM.groupControlINT.prototype.hidePopup = function(popup) {
	GM.debug.log("CALL: GM.groupControlINT.hidePopup","Closing the popup",2);
	this.ui.removeChild(popup);
	popup.hide();
};

// -------------------------------------------------------------------------------------------------
// addNPC
// -------------------------------------------------------------------------------------------------
GM.groupControlINT.prototype.addNPC = function(dat) {
	GM.debug.log("CALL: GM.groupControlINT.addNPC","Adding npc " + dat.name,2);
	this.svc.addNPC(dat.name,dat.template,dat.quantity);
};

// -------------------------------------------------------------------------------------------------
// refreshQuickLinks
// -------------------------------------------------------------------------------------------------
GM.groupControlINT.prototype.refreshQuickLinks = function() {
	GM.debug.log("CALL: GM.groupControlINT.refreshQuickLinks","Rebuilding quick links list",2);
	this.links.removeChildren();
	var members = this.svc.getMembers().members;
	for(var m in members) {
		var tag = members[m].getTag();
		this.links.addAnchorItem(m,null,"#" + tag);
	}
};

// -------------------------------------------------------------------------------------------------
// refreshView
// -------------------------------------------------------------------------------------------------
GM.groupControlINT.prototype.refreshView = function() {
	GM.debug.log("CALL: GM.groupControlINT.refreshView","Refreshing interface widget",2);
	this.refreshQuickLinks();
};