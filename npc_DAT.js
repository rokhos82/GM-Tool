// -------------------------------------------------------------------------------------------------
// npcDAT
// -------------------------------------------------------------------------------------------------
GM.npcDAT = function(name,template) {
	this.version = "20130123";
	GM.debug.log("INIT: GM.npcDAT","Creating GM.npcDAT object - version " + this.version,2);
	
	this.name = name;
	this.template = template;
	
	this.lists = {};
	this.lists.skills = [];
	this.lists.combatSkills = {};
	this.lists.melee = [];
	this.lists.ranged = [];
	this.lists.hc = [];
	this.lists.traits = [];
	this.lists.mastery = [];
	
	this.attributes = {};
	this.skills = {};
	this.effects = {};
	this.traits = {};
	this.hc = {};
	this.mastery = {};
	this.actions = {};
	
	var temp = kantia.template.npcs[template];
	
	this.description = temp.description;
	this.race = temp.race;
	
	// Build the real attribute objects
	for(var a in temp.attributes) {
		var attr = temp.attributes[a];
		this.attributes[a] = new kantia.attributeDAT(attr.name,attr.min,attr.max,attr.avg);
	}
	
	// Build the real skill objects and the skill list.
	for(var s in temp.skills) {
		var skill = temp.skills[s];
		var attr = null;
		if(typeof skill.attribute === "object") {
			attr = [this.attributes[skill.attribute[0]],this.attributes[skill.attribute[1]]];
		}
		else {
			attr = this.attributes[skill.attribute];
		}
		this.skills[s] = new kantia.skillDAT(skill.name,attr,skill.rank);
		this.lists.skills.push(s);
	}
	
	// Build the stats objects.
	this.stats = {
		"health": new kantia.healthDAT(this.attributes,"npc"),
		"stamina": new kantia.staminaDAT(this.attributes,"npc"),
		"wind": new kantia.windDAT(this.attributes,"npc"),
		"movement": new kantia.movementDAT(this.attributes,"npc"),
		"defense": new kantia.defenseDAT(this.attributes,"npc"),
		"offense": new kantia.offenseDAT(this.attributes,"npc")
	};
	

	// Setup the armor
	this.armor = {
		torso: new kantia.template.armor(),
		arms: new kantia.template.armor(),
		legs: new kantia.template.armor(),
		blocking: new kantia.template.armor(),
		head: new kantia.template.armor(),
		hands: new kantia.template.armor()
	};

	for(var a in temp.armor) {
		var name = temp.armor[a];
		var armor = kantia.armor[name];
		var slot = armor.coverage.toLowerCase();
		this.armor[slot] = kantia.armor[name];
	}
	
	// Setup the weapons
	this.lists.melee = temp.weapons.melee.slice();
	this.lists.ranged = temp.weapons.ranged.slice();
	this.weapons = {
		main: { type: "", name: "", skill: "", av: [0,-20,-40,-60,-80], attacks: "", staging: "", damage: ""},
		off: { type: "", name: "", skill: "", av: [0,-20,-40,-60,-80], attacks: "", staging: "", damage: ""},
		ranged: { type: "", name: "", skill: "", av: [0,-20,-40,-60,-80], attacks: "", staging: "", damage: ""}
	};
	
	for(var t in temp.traits) {
		this.lists.traits.push(temp.traits[t].name);
	}

	for(var h in temp.hc) {
		this.lists.hc.push(temp.hc[h].name);
	}

	for(var m in temp.masteries) {
		this.lists.mastery.push(temp.masteries[m].name);
	}
	
	this.magic = {
		text: temp.magic ? temp.magic : "",
		disciplines: {}
	};

	// Setup the actions obejct
	this.actions["Dodge"] = new GM.actionDAT("Dodge","*",this.skills["Dodge"],null);
};

GM.npcDAT.version = "20130123";

//
//	Version Change Log
//		20121115 - base
//		20130122 - convert old skills to new melee/aim/proficiency system.
//		20130123 - added an actions field for combat action persistance.
//

GM.npcDAT.upgrade = function(dat) {
	GM.debug.log("CALL: GM.npcDAT.upgrade","Upgrading npcDAT object",1);
	if(dat.version == GM.npcDAT.version) {
		// Version is up to date.  Stop upgrading.
	}
	else if(dat.version == "20121115") {
		// Find old skills and convert them to the new Melee/Aim/Proficiency system.
		// Convert weapon of choice, agility based, to melee, agility based and
		// aim, agility based.
		var skill = "Weapon of Choice (Agility)";
		if(dat.skills[skill]) {
			var rank = dat.skills[skill].rank;
			var attribute = dat.skills[skill].attribute;
			delete dat.skills[skill]
			dat.skills["Melee"] = new kantia.skillDAT("Melee",attribute,rank);
			dat.skills["Aim (AGL)"] = new kantia.skillDAT("Aim (AGL)",attribute,rank);
		}
		// Convert weapon of choice, perception based, to aim, perception based.
		var skill = "Weapon of Choice (Perception)";
		if(dat.skills[skill]) {
			var rank = dat.skills[skill].rank;
			var attribute = dat.skills[skill].attribute;
			delete dat.skills[skill];
			dat.skills["Aim (PER)"] = new kantia.skillDAT("Aim (PER)",attribute,rank);
		}
		// Convert simple weapons to melee.
		var skill = "Simple Weapons";
		if(dat.skills[skill]) {
			var rank = dat.skills[skill].rank;
			var attribute = dat.skills[skill].attribute;
			delete dat.skills[skill];
			if((dat.skills["Melee"] && dat.skills["Melee"].rank < rank) || !dat.skills["Melee"])
				dat.skills["Melee"] = new kantia.skillDAT("Melee",attribute,rank);
		}
		// Remove the now defunct brawling skill
		var skill = "Brawling";
		if(dat.skills[skill]) {
			delete dat.skills[skill];
		}

		// Rebuild skills list
		dat.lists.skills = new Array();
		for(var s in dat.skills) {
			dat.lists.skills.push(s);
		}
		dat.version = "20130122";
		GM.npcDAT.upgrade(dat);
	}
	else if(dat.version == "20130122") {
		dat.actions = {"Dodge": new GM.actionDAT("Dodge","*",dat.skills["Dodge"],null)};
		dat.version = "20130123";
		GM.npcDAT.upgrade(dat);
	}
	else {
		GM.debug.log("ERROR: GM.npcDAT.upgrade","npcDAT version not found",0);
	}
};