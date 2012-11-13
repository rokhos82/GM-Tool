GM.mainINT = function(root,svc) {
	GM.debug.log("CALL: GM.mainINT","Initializing mainINT object",2);

	this.root = root;
	this.svc = svc;

	this.mainframe = this.svc.mainframe;
	this.children = [];

	this.widgets = {};

	this.ui = new ui.panel();
	this.ui.addClass("panel");
	this.sidebar = new ui.panel();
	this.sidebar.addClass("sidebar");
	this.popups = new ui.panel();

	this.setWidget("mainControls",new GM.mainControlINT(this,this.svc));

	GM.debug.log("END: GM.mainINT","Done initializing mainINT object",2);
};

// -------------------------------------------------------------------------------------------------
// initialize
// -------------------------------------------------------------------------------------------------
GM.mainINT.prototype.initialize = function() {
	GM.debug.log("CALL: GM.mainINT.initialize","Attaching UI elements to the DOM root",2);
	this.root.appendChild(this.ui.dom);
	this.root.appendChild(this.sidebar.dom);
	this.root.appendChild(this.popups.dom);
};

// -------------------------------------------------------------------------------------------------
// refreshView
// -------------------------------------------------------------------------------------------------
GM.mainINT.prototype.refreshView = function() {
	GM.debug.log("CALL: GM.mainINT.refreshView","Refreshing the UI to reflect changes to the data",2);
};

// -------------------------------------------------------------------------------------------------
// importDataPopup
// -------------------------------------------------------------------------------------------------
GM.mainINT.prototype.importDataPopup = function() {
	GM.debug.log("GM.mainINT.importDataPopup","Showing the data import popup",2);
	var popup = this.sidebar.addPopup();
	popup.addClass("popup");
	popup.setOverlayClass("fog");
	popup.show();
	var dat = {
		json: ""
	};

	var p = popup.addPanel("JSON Import");
	var ta = p.addTextArea(new db.connector(dat,"json"));
	var seq = new db.sequence();
	seq.addAction("import",new db.sequence.action(this.svc,this.svc.importData,[dat]));
	seq.addAction("hide",new db.sequence.action(this,this.hidePopup,[popup]));
	var b = p.addButton("Ok",seq);
	var b = p.addButton("Cancel",new db.link(this,this.hidePopup,[popup]));
};

// -------------------------------------------------------------------------------------------------
// exportDataPopup
// -------------------------------------------------------------------------------------------------
GM.mainINT.prototype.exportDataPopup = function() {
	GM.debug.log("GM.mainINT.exportDataPopup","Show the data export popup",2);
	var popup = this.sidebar.addPopup();
	popup.addClass("popup");
	popup.setOverlayClass("fog");
	popup.show();

	var p = popup.addPanel("JSON Export");
	var dat = {
		json: this.svc.exportData()
	};
	var ta = p.addTextArea(new db.connector(dat,"json"));
	var b = p.addButton("Close",new db.link(this,this.hidePopup,[popup]));
};

// -------------------------------------------------------------------------------------------------
// appendChild
// -------------------------------------------------------------------------------------------------
GM.mainINT.prototype.appendChild = function(child) {
	this.children.push(child);
	this.ui.appendChild(child.ui);
};

// -------------------------------------------------------------------------------------------------
// destroy
// -------------------------------------------------------------------------------------------------
GM.mainINT.prototype.destroy = function() {
};

// -------------------------------------------------------------------------------------------------
// setWidget
// -------------------------------------------------------------------------------------------------
GM.mainINT.prototype.setWidget = function(key,ui) {
	GM.debug.log("CALL: GM.mainINT.setWidget","Adding/replacing the widget mapped to " + key,2);

	if(this.widgets[key]) {
	}
	
	this.widgets[key] = ui;

	this.sidebar.appendChild(ui.ui);
};