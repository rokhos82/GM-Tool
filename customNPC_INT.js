////////////////////////////////////////////////////////////////////////////////////////////////////
// customNPCINT
////////////////////////////////////////////////////////////////////////////////////////////////////
GM.customNPCINT = function(svc) {
	GM.debug.log("BEGIN: GM.customNPCINT","Started constructing a custom NPC interface object",2);
	this.svc = svc;
	this.parent = null;
	this.initialized = false;

	this.ui = new ui.popup("popup","fog");
	this.panel = this.ui.addPanel("Editor: " + this.svc.getName());
	this.panel.addClass("editor");

	this.panel.addButton("Close",new db.link(this,this.hide,[]));
	
	this.panels = {};
	var p = this.panel.addPanel("Info");
	this.panels["info"] = p;
	p.addTextField("Name",this.svc.getDataConnector("name"));
	p.addTextField("Race",this.svc.getDataConnector("race"));

	var p = this.panel.addPanel("Attributes");
	p.addClass("small");
	this.panels["attr"] = p;
	var t = p.addTable();
	//t.addClass("attr_table");
	t.addRow(["Attribute","Avg","Min","Max"]);
	var attributes = this.svc.getData("attributes");
	for(var a in attributes) {
		var attr = attributes[a];
		t.addRow([attr.name,new db.connector(attr,"avg"),new db.connector(attr,"min"),new db.connector(attr,"max")]);
	}

	var p = this.panel.addPanel("Traits & HCs");
	p.addClass("small");
	this.panels["traits"] = p;

	var p = this.panel.addPanel("Equipment");
	this.panels["equipment"] = p;
	var sp = p.addPanel("Armor");
	var sp = p.addPanel("Weapons");

	this.panels["skills"] = this.panel.addPanel("Skills");

	GM.debug.log("END: GM.customNPCINT","Finished connstructing a custom NPC interface object",2);
};

GM.customNPCINT.prototype.initialize = function(parent) {
	GM.debug.log("CALL: GM.customNPCINT.initialize","Initializing a custom NPC interface object",2);
	this.parent = parent;
	this.parent.appendChild(this);
	this.initialized = true;
};

GM.customNPCINT.prototype.show = function(parent) {
	GM.debug.log("CALL: GM.customNPCINT.show","Showing custom template editor",2);
	if(!this.initialized && parent)
		this.initialize(parent);
	this.ui.show();
};

GM.customNPCINT.prototype.hide = function() {
	GM.debug.log("CALL: GM.customNPCINT.hide","Hiding custom template editor",2);
	this.ui.hide();
};