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
	
	this.weapons = {
		melee: {
			type: "",
			name: "",
			skill: "",
			av: "",
			attacks: "",
			staging: "",
			damage: "",
			list: temp.weapons.melee
		},
		ranged: {
			type: "",
			name: "",
			skill: "",
			av: "",
			attacks: "",
			staging: "",
			damage: "",
			list: temp.weapons.ranged
		}
	};
	
	this.effects = {
	};
	
	this.traits = temp.traits;
	
	this.magic = {
		text: temp.magic ? temp.magic : "",
		disciplines: {}
	};
};