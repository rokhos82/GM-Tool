GM.npcCombatSVC = function(parent,dat) {
	this.parent = parent;
	this.mainframe = new lib.mainframe(parent.mainframe);
	this.dat = dat;

	this.ui = new ui.panel(this.dat.name);
	this.panels = {};

	var p = this.ui.addPanel("Actions");
	var b = p.addButton("Attack",new db.link(this,this.combatPopup,[]));
	var b = p.addButton("Defend",new db.link(this,this.defensiveAction,[]));
	var b = p.addButton("Stun",new db.link(this,this.addEffect,["stun",1]));
	var b = p.addButton("Grapple");
	var b = p.addButton("Prone",new db.link(this,this.addEffect,["prone",1]));
	var b = p.addButton("K.O.");
	var b = p.addButton("Bound/Helpless");
	var b = p.addButton("Fight Defensively");
	var b = p.addButton("Throwing Caution");
	var b = p.addButton("Delay");
	var b = p.addButton("Rush");
	var b = p.addButton("Reset",new db.link(this,this.resetEffects,["all"]));

	var p = this.ui.addPanel("Effects");
	this.panels.effects = p;
	//this.refreshEffects();

	var p = this.ui.addPanel("Combat AVs");
	var t = p.addTable();
	for(var i in this.dat.lists.combatSkills) {
		var skill = this.dat.skills[i];
		if(skill) {
			var r = t.addRow([
				new db.view(skill,"name"),
				new db.view(skill,"total")
			]);
		}
	}
};

GM.npcCombatSVC.prototype.initialize = function() {
};

GM.npcCombatSVC.prototype.setData = function(dat) {
};