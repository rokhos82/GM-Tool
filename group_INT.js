////////////////////////////////////////////////////////////////////////////////////////////////////
// groupINT
////////////////////////////////////////////////////////////////////////////////////////////////////
GM.groupINT = function(parent,svc) {
	GM.debug.log("CALL: GM.groupINT","Initializing groupINT object",2);

	this.parent = parent;
	this.svc = svc;
	this.mainframe = svc.mainframe;

	this.ui = new ui.panel();
	this.npcs = this.ui.addPanel();

	this.controls = new ui.panel(this.name);
	this.controls.setTitleData(new db.connector(this,"name"));
	this.parent.addToSidebar(this.controls);
	this.controls.addButton("New NPC",new db.link(this,this.showPopup,[]));
	this.links = this.controls.addPanel("Quick Links");
	this.controls.addButton("Start Combat",new db.link(this,this.startCombat,[]));

	GM.debug.log("END: GM.groupINT","Finished initializing groupINT object",2);
};

// -------------------------------------------------------------------------------------------------
//
// -------------------------------------------------------------------------------------------------
GM.groupINT.prototype.initialize = function() {
	GM.debug.log("CALL: GM.groupINT.initialize","Attaching interface to parent",2);
	this.parent.appendChild(this);
};

// -------------------------------------------------------------------------------------------------
//
// -------------------------------------------------------------------------------------------------
GM.groupINT.prototype.refreshView = function() {
	this.links.removeChildren();
	for(var m in this.members) {
		var a = this.links.addAnchor(m,null,"#" + this.members[m].tag);
		a.addClass("quick_link");
	}
	this.ui.refreshView();
	this.controls.refreshView();
};