////////////////////////////////////////////////////////////////////////////////////////////////////
// groupControlINT
////////////////////////////////////////////////////////////////////////////////////////////////////
GM.groupControlINT = function(parent,svc) {
	GM.debug.log("CALL: GM.groupControlINT","Initializing groupControlINT object",2);
	
	this.parent = parent;
	this.svc = svc;
	this.mainframe = svc.mainframe;

	this.label = "Group: " + svc.getName();
	this.ui = new ui.panel(this.label);

	this.ui.addButton("New NPC",new db.link(this,this.addNPCPopup,[]));
	this.links = this.ui.addPanel("Quick Links");
	//this.ui.addButton("Start Combat",new db.link(this,this.startCombat,[]));

	this.mainframe.addHandler("clearWidgets","GCI" + this.svc.getName,this.detach,this,[]);

	GM.debug.log("END: GM.groupControlINT","Finished initializing groupControlINT object",2);
};

// -------------------------------------------------------------------------------------------------
// initialize
// -------------------------------------------------------------------------------------------------
GM.groupControlINT.prototype.initialize = function() {
	GM.debug.log("CALL: GM.groupControlINT.initialize","Attaching widget to parent",2);
	this.mainframe.sendEvent("setWidget",["groupControl",{svc: this.svc,ui: this}]);
};

// -------------------------------------------------------------------------------------------------
// detach
// -------------------------------------------------------------------------------------------------
GM.groupControlINT.prototype.detach = function() {
	GM.debug.log("CALL: GM.groupControlINT.detach","Detaching interface from the parent",2);
	this.ui.parent.removeChild(this.ui);
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
		"template": ""
	}

	var p = popup.addPanel("New NPC");
	var tf = p.addTextField("Name",new db.connector(dat,"name"));
	tf.focus();
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
	this.svc.addNPC(dat.name,dat.template);
};