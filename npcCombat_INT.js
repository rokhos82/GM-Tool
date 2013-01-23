GM.npcCombatINT = function(svc) {
	GM.debug.log("CALL: GM.npcCombatINT","Initializing NPC combat interface",2);
	this.svc = svc;
	this.ui = new ui.panel();
	this.ui.addClass("npc_card");
	this.parent = null;

	var p = this.ui.addPanel();
	p.addClass("colset");
	var s = p.addText("Name: " + this.svc.getName());
	s.addClass("name");

	var p = this.ui.addPanel();
	p.addClass("colset");
	var col = p.addPanel();
	col.addClass("col");
	var t = col.addTable();
	t.addClass("small");

	var attributes = this.svc.getData("attributes");
	var attr_map = {
		"STR":"strength",
		"SIZ":"size",
		"AGL":"agility",
		"REF":"reflexes",
		"CON":"constitution",
		"FOR":"fortitude",
		"REA":"reasoning",
		"WIL":"willpower",
		"SPR":"spirit",
		"PER":"perception"
	};

	for(var a in attr_map) {
		var attr = attr_map[a];
		t.addRow([a,attributes[attr].score]);
	};

	GM.debug.log("END: GM.npcCombatINT","Finished initializing NPC combat interface",2);
};

// -------------------------------------------------------------------------------------------------
//
// -------------------------------------------------------------------------------------------------
GM.npcCombatINT.prototype.initialize = function(parent) {
	GM.debug.log("CALL: GM.npcCombatINT.initialize","Attaching interface to parent",2);
	this.parent = parent;
	this.parent.attachInterface(this);
};