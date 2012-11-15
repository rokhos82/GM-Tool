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

	GM.debug.log("END: GM.groupControlINT","Finished initializing groupControlINT object",2);
};

// -------------------------------------------------------------------------------------------------
// initialize
// -------------------------------------------------------------------------------------------------
GM.groupControlINT.prototype.initialize = function() {
};

// -------------------------------------------------------------------------------------------------
// addNPCPopup
// -------------------------------------------------------------------------------------------------
GM.groupControlINT.prototype.addNPCPopup = function() {
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
	c.setData(new db.connector(popup.dat,"template"));
	c.updateData();
	p.appendChild(c);
	var b = p.addButton("Ok");
	var b = p.addButton("Cancel",new db.link(this,this.hidePopup,[popup]));
};

// -------------------------------------------------------------------------------------------------
// hidePopup
// -------------------------------------------------------------------------------------------------
GM.groupControlINT.prototype.hidePopup = function(popup) {
	this.ui.removeChild(popup);
	popup.hide();
};