GM.npcCombatINT = function(svc) {
	GM.debug.log("CALL: GM.npcCombatINT","Initializing NPC combat interface",2);
	this.svc = svc;
	this.ui = new ui.panel();
	this.ui.addClass("npc_card");
	this.parent = null;

	// Start building the NPC card.
	var p = this.ui.addPanel();

	// Setup the name
	p.addClass("colset");
	var s = p.addText("Name: " + this.svc.getName());
	s.addClass("name");

	// Setup the attributes table.
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

	// Setup the STATS table.
	var col = p.addPanel();
	col.addClass("col");
	var t = col.addTable();
	t.addClass("small");
	var stats = this.svc.getData("stats");
	t.addRow(["STAM",stats.stamina.current]);
	t.addRow(["Health",stats.health.hitpoints.bludgeon + "B/" + stats.health.hitpoints.wound + "W"]);
	t.addRow(["Stun/Pain",stats.health.stunpain.threshold]);

	// Setup the skills table.
	var col = p.addPanel();
	col.addClass("col");
	var t = col.addTable();
	t.addClass("small centered");
	t.setHeaderClass("bolded");
	t.addHeaderRow(["Skill","AV"]);

	var skills = this.svc.getData("skills");
	for(var s in skills) {
		t.addRow([s,skills[s].total]);
	}

	// Setup the combat actions table.
	var p = this.ui.addPanel();
	p.addClass("colset");
	var t = p.addTable();
	t.addClass("small centered");
	t.setHeaderClass("bolded");
	t.addHeaderRow(["Action","#","1st","2nd","3rd","Dmg","Stg"]);

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