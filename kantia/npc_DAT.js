kantia.npcDAT = function(name,template) {
	this.name = name;
	this.template = template;
	
	var temp = kantia.template.npcs[template];
	
	this.attributes = temp.attributes;
	
	this.skills = temp.skills;
	this.skillList = [];
	for(var s in this.skills) {
		var attr = this.skills[s].attribute;
		var adj = 0;
		if(this.attributes[attr])
			adj = this.attributes[attr].adjust;
		var av = (this.skills[s].rank * 5);
		this.skills[s].av = av;
		this.skills[s].adj = adj;
		this.skills[s].total = av + adj;
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