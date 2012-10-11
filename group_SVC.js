// -------------------------------------------------------------------------------------------------
// groupSVC - the group service object.
// -------------------------------------------------------------------------------------------------
GM.groupSVC = function(dat,parent) {
	this.dat = dat;
	this.members = {};
	this.ui = new ui.panel("NPCs");
	this.parent = parent;
	this.mainframe = new lib.mainframe(parent.mainframe);
	
	for(var m in dat.members) {
		var memberSVC = new kantia.npcSVC(dat.members[m]);
		this.members[m] = memberSVC;
		this.ui.appendChild(memberSVC.ui);
	}
};

GM.groupSVC.prototype.initialize = function() {
	this.parent.ui.appendChild(this.ui);
};

GM.groupSVC.prototype.addNPC = function() {
};