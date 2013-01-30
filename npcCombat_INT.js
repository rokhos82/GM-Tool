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
	var s = p.addText("Name: " + this.svc.getName() + " (" + this.svc.getTemplate() + ")");
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
		var r = t.addRow([a,attributes[attr].score]);
		r.setClass("tooltip");
		var tooltip = "AV: " + attributes[attr].av;
		tooltip += " <br/>Adj: " + attributes[attr].adjust;
		r.addTooltip(tooltip,"classic");
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

	// Setup the defense table.
	var t = col.addTable();
	t.addClass("small");
	t.addRow(["Normal DR",stats.defense.dr]);
	t.addRow(["No-Agl DR",stats.defense.noagldr]);
	t.addRow(["Touch DR",stats.defense.touchdr]);
	t.addRow(["Absorb",stats.defense.absorb]);
	t.addRow(["Staging",stats.defense.staging]);

	// Setup the skills table.
	var col = p.addPanel();
	col.addClass("col");
	var t = col.addTable();
	t.addClass("small centered");
	t.setHeaderClass("bolded");
	t.addHeaderRow(["Skill","AV"]);

	var skills = this.svc.getData("skills");
	for(var s in skills) {
		var r = t.addRow([s,skills[s].total]);
		r.setClass("tooltip");
		var tooltip = "<ul>";
		tooltip += "<li>Rank: " + skills[s].rank + "</li>";
		tooltip += "<li>Adj: " + skills[s].adjust + "</li>";
		tooltip += "</ul>";
		r.addTooltip(tooltip,"classic");
	}

	// Setup the combat actions table.
	var p = this.ui.addPanel();
	p.addClass("colset");
	var t = p.addTable();
	t.addClass("small centered");
	t.setHeaderClass("bolded");
	t.addHeaderRow(["Action","#","1st","2nd","3rd","Dmg","Stg"]);

	var actions = this.svc.getData("actions");
	for(var a in actions) {
		var action = actions[a];
		if(action.item && action.item.damage) {
			var attr = this.svc.getAttribute(action.item.staging.source);
			var staging = action.item.staging.value + attr.score;
			var av1 = action.avs[0] ? action.avs[0] : "--";
			var av2 = action.avs[1] ? action.avs[1] : "--";
			var av3 = action.avs[2] ? action.avs[2] : "--";
			var r = t.addRow([action.name,action.actions,av1,av2,av3,action.item.damage.text,staging]);
			r.setClass("tooltip");
			var tooltip = "<ul>";
			var others = action.item.other;
			var show = false;
			for(var o in others) {
				tooltip += "<li>" + o + ": " + others[o] + "</li>";
				show = true;
			}
			tooltip += "</ul>";
			if(show)
				r.addTooltip(tooltip,"classic");
		}
		else {
			t.addRow([action.name,action.actions,action.avs[0],action.avs[1],action.avs[2],"--","--"]);
		}
	}

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