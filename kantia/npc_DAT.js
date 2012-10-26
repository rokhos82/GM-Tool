kantia.npcDAT = function(name,template) {
	this.name = name;
	this.template = template;
	
	var temp = kantia.template.npcs[template];
	
	this.description = temp.description;
	
	// Build the real attribute objects.
	this.attributes = {};
	for(var a in temp.attributes) {
		var attr = temp.attributes[a];
		this.attributes[a] = new kantia.attributeDAT(attr.name,attr.min,attr.max,attr.avg);
	}
	
	// Build the real skill objects and the skill list.
	this.skills = {};
	this.skillList = [];
	for(var s in temp.skills) {
		var skill = temp.skills[s];
		var attr = this.attributes[skill.attribute];
		this.skills[s] = new kantia.skillDAT(skill.name,skill.attribute,skill.rank);
		this.skillList.push(s);
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
	
	this.armor = {};
	for(var a in temp.armor) {
		var armor = temp.armor[a];
		this.armor[armor] = kantia.armor[armor];
		this.stats.defense.dr += this.armor[armor].deflect;
		this.stats.defense.noagldr += this.armor[armor].deflect;
		if(this.armor[armor].coverage == "Torso") {
			this.stats.defense.staging += this.armor[armor].staging;
			this.stats.defense.absorb += this.armor[armor].absorb;
		}
	}
	
	this.meleeList = temp.weapons.melee;
	this.rangedList = temp.weapons.ranged;
	this.weapons = {
		main: { type: "", name: "", skill: "", av: "", attacks: "", staging: "", damage: ""},
		off: { type: "", name: "", skill: "", av: "", attacks: "", staging: "", damage: ""},
		ranged: { type: "", name: "", skill: "", av: "", attacks: "", staging: "", damage: ""}
	};
	
	this.effects = {};
	
	this.traits = {};
	for(var t in temp.traits) {
		this.traits[t] = temp.traits[t].name;
	}
	
	this.magic = {
		text: temp.magic ? temp.magic : "",
		disciplines: {}
	};
};