////////////////////////////////////////////////////////////////////////////////////////////////////
// groupSVC
////////////////////////////////////////////////////////////////////////////////////////////////////
GM.groupSVC = function(dat,parent) {
	GM.debug.log("CALL: GM.groupSVC","Initializing groupSVC object",2);

	this.dat = dat;	
	this.members = {};
	this.parent = parent;
	this.mainframe = new lib.mainframe(parent.mainframe);

	this.ui = new GM.groupINT(this.parent.ui,this);

	GM.debug.log("END: GM.groupSVC","Finished initializing groupSVC object",2);
};

// -------------------------------------------------------------------------------------------------
// getName
// -------------------------------------------------------------------------------------------------
GM.groupSVC.prototype.getName = function() {
};

// -------------------------------------------------------------------------------------------------
// getDataConnector
// -------------------------------------------------------------------------------------------------
GM.groupSVC.prototype.getDataConnector = function(token) {
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