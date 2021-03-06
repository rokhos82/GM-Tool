////////////////////////////////////////////////////////////////////////////////////////////////////
// groupSVC
////////////////////////////////////////////////////////////////////////////////////////////////////
GM.groupSVC = function(dat,parent) {
	GM.debug.log("CALL: GM.groupSVC","Initializing groupSVC object",2);

	this.dat = dat;	
	this.members = {};
	this.parent = parent;
	this.mainframe = this.parent.mainframe.addChildFrame();
	this.mainframe.addHandler("addCampaign","groupLoad",this.load,this,[]);

	this.lists = {};
	this.lists.members = [];

	this.ui = new GM.groupINT(this.parent.ui,this);

	this.combat = null;

	GM.debug.log("END: GM.groupSVC","Finished initializing groupSVC object",2);
};

// -------------------------------------------------------------------------------------------------
// load
// -------------------------------------------------------------------------------------------------
GM.groupSVC.prototype.load = function() {
	GM.debug.log("CALL: GM.groupSVC.load","Building services and lists from data object",1);

	for(var m in this.dat.members) {
		this.members[m] = new GM.npcSVC(this.dat.members[m],this);
	}

	this.refreshLists();
};

// -------------------------------------------------------------------------------------------------
// refreshLists
// -------------------------------------------------------------------------------------------------
GM.groupSVC.prototype.refreshLists = function() {
	GM.debug.log("CALL: GM.groupSVC.refreshLists","Rebuilding lists",2);
	this.lists.members = [];

	for(var m in this.members) {
		this.lists.members.push(m);
	}
};

// -------------------------------------------------------------------------------------------------
// destroy
// -------------------------------------------------------------------------------------------------
GM.groupSVC.prototype.destroy = function() {
	GM.debug.log("CALL: GM.groupSVC.destroy","Removing interfaces and services",2);

	for(var m in this.members) {
		this.members[m].destroy();
	}

	for(var l in this.lists) {
		this.lists[l] = [];
	}

	this.ui.detach();
	delete this.ui;
	delete this.members;
};

// -------------------------------------------------------------------------------------------------
// getMembers
// -------------------------------------------------------------------------------------------------
GM.groupSVC.prototype.getMembers = function() {
	return {
		list: this.lists.members.slice(),
		members: this.members
	};
};

// -------------------------------------------------------------------------------------------------
// getMembers
// -------------------------------------------------------------------------------------------------
GM.groupSVC.prototype.getMember = function(name) {
	return this.members[name];
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
GM.groupSVC.prototype.addNPC = function(name,template,quantity) {
	GM.debug.log("CALL: GM.groupSVC.addNPC","Adding NPC " + name,2);
	if(!this.dat.members[name]) {
		if(quantity > 1) {
			for(var i = 0;i < quantity;i++) {
				var n = name + " " + (i + 1);
				this.dat.members[n] = new GM.npcDAT(n,template);
				this.members[n] = new GM.npcSVC(this.dat.members[n],this);
				this.ui.addMember(this.members[n].ui);
				this.mainframe.trigger("addNPC");
			}
		}
		else {
			this.dat.members[name] = new GM.npcDAT(name,template);
			this.members[name] = new GM.npcSVC(this.dat.members[name],this);
			this.ui.addMember(this.members[name].ui);
			this.mainframe.trigger("addNPC");
		}
	}
	else {
		GM.debug.log("ERROR: GM.groupSVC.addNPC","NPC " + name + " already exisits",0);
	}
};

// -------------------------------------------------------------------------------------------------
// removeNPC
// -------------------------------------------------------------------------------------------------
GM.groupSVC.prototype.removeNPC = function(svc) {
	var name = svc.getName();
	GM.debug.log("CALL: GM.groupSVC.removeNPC","Removing npc: " + name,2);
	var member = this.members[name];
	member.destroy();
	delete this.members[name];
	delete this.dat.members[name];
	this.ui.refreshView();
};

// -------------------------------------------------------------------------------------------------
//
// -------------------------------------------------------------------------------------------------
GM.groupSVC.prototype.getGroupInitiative = function() {
	GM.debug.log("CALL: GM.groupSVC.getGroupInitiative","Calculate an average initiative for the group",2);

	var count = 0;
	var sum = 0;
	for(var m in this.members) {
		count++;
		sum += this.members.getInitiative();
	}
	var avg = Math.floor(sum/count);
	return avg + kantia.func.d10(1);
};

// -------------------------------------------------------------------------------------------------
//
// -------------------------------------------------------------------------------------------------
GM.groupSVC.prototype.getCombatInterface = function() {
	GM.debug.log("CALL: GM.groupSVC.getCombatInterface","Get the combat interface for the group",2);
	if(!this.combat) {
		this.combat = new GM.groupCombatINT(this);
	}
	return this.combat;
};