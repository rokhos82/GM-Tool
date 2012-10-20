kantia.npcDAT = function(name,template) {
	this.name = name;
	this.template = template;
	
	var temp = kantia.template.npcs[template];
	
	this.skills = temp.skills;
	this.attributes = temp.attributes;
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
};