////////////////////////////////////////////////////////////////////////////////////////////////////
// groupSVC
////////////////////////////////////////////////////////////////////////////////////////////////////
GM.groupSVC = function(dat,parent) {
	GM.debug.log("CALL: GM.groupSVC","Initializing groupSVC object",2);

	this.dat = dat;	
	this.members = {};
	this.parent = parent;
	this.mainframe = this.parent.mainframe.addChildFrame();

	this.ui = new GM.groupINT(this.parent.ui,this);

	GM.debug.log("END: GM.groupSVC","Finished initializing groupSVC object",2);
};

// -------------------------------------------------------------------------------------------------
// getName
// -------------------------------------------------------------------------------------------------
GM.groupSVC.prototype.getName = function() {
	return this.dat.name;
};

// -------------------------------------------------------------------------------------------------
// getDataConnector
// -------------------------------------------------------------------------------------------------
GM.groupSVC.prototype.getDataConnector = function(token) {
	return new db.connector(this.dat,token);
};

// -------------------------------------------------------------------------------------------------
// addNPC
// -------------------------------------------------------------------------------------------------
GM.groupSVC.prototype.addNPC = function(name,template) {
	GM.debug.log("CALL: GM.groupSVC.addNPC","Adding NPC " + name,2);
	if(!this.dat.members[name]) {
		this.dat.members[name] = new GM.npcDAT(name,template);
		this.members[name] = new GM.npcSVC(this.dat.members[name],this);
		this.ui.addNPC(this.members[name].ui);
	}
	else {
		GM.debug.log("ERROR: GM.groupSVC.addNPC","NPC " + name + " already exisits",0);
	}
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

// -------------------------------------------------------------------------------------------------
//
// -------------------------------------------------------------------------------------------------
GM.groupSVC.prototype.startCombat = function() {
	var cp = new GM.groupCombatSVC(this);
	cp.initialize();
	cp.show();
};