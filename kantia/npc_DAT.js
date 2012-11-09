// -------------------------------------------------------------------------------------------------
// npcDAT
// -------------------------------------------------------------------------------------------------
kantia.npcDAT = function(name,template) {
	this.name = name;
	this.template = template;
	
	var temp = kantia.template.npcs[template];
	
	this.description = temp.description;
	this.race = temp.race;
	
	// Build the real attribute objects.
	this.attributes = {};
	for(var a in temp.attributes) {
		var attr = temp.attributes[a];
		this.attributes[a] = new kantia.attributeDAT(attr.name,attr.min,attr.max,attr.avg);
	}

	this.lists = {};
	
	// Build the real skill objects and the skill list.
	this.skills = {};
	this.lists.skills = [];
	this.lists.combatSkills = {};
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
	
	this.effects = {};
	
	this.traits = {};
	this.lists.traits = [];
	for(var t in temp.traits) {
		this.lists.traits.push(temp.traits[t].name);
	}

	this.hc = {};
	this.lists.hc = [];
	for(var h in temp.hc) {
		this.lists.hc.push(temp.hc[h].name);
	}

	this.mastery = {};
	this.lists.mastery = [];
	for(var m in temp.masteries) {
		this.lists.mastery.push(temp.masteries[m].name);
	}
	
	this.magic = {
		text: temp.magic ? temp.magic : "",
		disciplines: {}
	};
};