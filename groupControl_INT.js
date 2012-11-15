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
// 
// -------------------------------------------------------------------------------------------------
GM.groupControlINT.prototype.initialize = function() {
};

// -------------------------------------------------------------------------------------------------
//
// -------------------------------------------------------------------------------------------------
GM.groupControlINT.prototype.showPopup = function() {
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
GM.groupControlINT.prototype.hidePopup = function(popup) {
	this.ui.removeChild(popup);
	popup.hide();
};