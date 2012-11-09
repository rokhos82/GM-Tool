////////////////////////////////////////////////////////////////////////////////////////////////////
// groupCombatSVC - this service object controls the group combat popup.  It is responisble for
// tracking damage, effects (prone, stunned, etc), add...
////////////////////////////////////////////////////////////////////////////////////////////////////
GM.groupCombatSVC = function(parent,players) {
	this.parent = parent;
	this.mainframe = new lib.mainframe(parent.mainframe);
	this.players = players;
	this.npcs = this.parent.dat.members;

	this.panels = {};

	this.popup = new ui.popup();
	this.popup.addClass("popup");
	this.popup.addClass("combat");
	this.popup.setOverlayClass("fog");

	this.ui = this.popup.addPanel("Combat");
	var p = this.ui.addPanel("Controls");
	p.addClass("small");
	var b = p.addButton("Next Round");
	var b = p.addButton("End Combat",new db.link(this,this.hide,[]));

	var p = this.ui.addPanel("Initiative");
	p.addClass("small");
	p.addButton("Roll");
	var l = p.addList();
	this.panels.initiative = l;
	var list = this.initiative();
	for(var n in list) {
		l.addItem(list[n][0] + " - " + list[n][1]);
	}

	var p = this.ui.addPanel("Quick Links");

	var p = this.ui.addPanel("Combatants");
	for(var n in this.npcs) {
		var npc_svc = new GM.npcCombatSVC(this,this.npcs[n]);
		p.appendChild(npc_svc.ui);
	}

	this.queue = [];
};

// -------------------------------------------------------------------------------------------------
// initialize
// -------------------------------------------------------------------------------------------------
GM.groupCombatSVC.prototype.initialize = function() {
	this.parent.appendChild(this.popup);
};

// -------------------------------------------------------------------------------------------------
// refreshView
// -------------------------------------------------------------------------------------------------
GM.groupCombatSVC.prototype.refreshView = function() {
};

// -------------------------------------------------------------------------------------------------
// show
// -------------------------------------------------------------------------------------------------
GM.groupCombatSVC.prototype.show = function() {
	this.popup.show();
};

// -------------------------------------------------------------------------------------------------
// hide
// -------------------------------------------------------------------------------------------------
GM.groupCombatSVC.prototype.hide = function() {
	this.popup.hide();
};

GM.groupCombatSVC.prototype.appendChild = function(child) {
};

// -------------------------------------------------------------------------------------------------
// initiative
// -------------------------------------------------------------------------------------------------
GM.groupCombatSVC.prototype.initiative = function() {
	var list = [];

	var sum = 0;
	var count = 0;
	for(var n in this.npcs) {
		sum += this.npcs[n].attributes.reflexes.score;
		count++;
	}
	var avg = Math.floor(sum/count);
	var roll = kantia.func.d10(1) + avg;
	list.push(["NPCs",roll]);

	for(var p in this.players) {
		var player = this.players[p];
		var roll = kantia.func.d10(1) + player.attributes.reflexes.score;
		list.push([player.name,roll]);
	}

	return list;
};