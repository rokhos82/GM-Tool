////////////////////////////////////////////////////////////////////////////////////////////////////
// groupCombatSVC - this service object controls the group combat popup.  It is responisble for
// tracking damage, effects (prone, stunned, etc), add...
////////////////////////////////////////////////////////////////////////////////////////////////////
GM.groupCombatSVC = function(parent,players) {
	this.parent = parent;
	this.mainframe = new lib.mainframe(parent.mainframe);
	this.players = players;
	this.npcs = this.parent.dat.members;

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

	var p = this.ui.addPanel("Actors");

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
		list.push([player.name,player.attributes.reflexes.score]);
	}
};