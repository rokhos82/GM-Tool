GM.npcSVC = function(dat,parent) {
	GM.debug.log("CALL: GM.npcSVC","Initializing npcSVC object",2);
	
	this.dat = dat;
	this.parent = parent;
	this.mainframe = this.parent.mainframe.addChildFrame();
	
	this.ui = new GM.npcINT(this.parent.ui,this);

	this.mainframe.addHandler("strengthUpdate","movement",this.updateMovement,this,[]);
	this.mainframe.addHandler("sizeUpdate","hitpoints",this.updateHitpoints,this,[]);
	this.mainframe.addHandler("sizeUpdate","movement",this.updateMovement,this,[]);
	this.mainframe.addHandler("constitutionUpdate","hitpoints",this.updateHitpoints,this,[]);
	this.mainframe.addHandler("fortitudeUpdate","hitpoints",this.updateHitpoints,this,[]);
	this.mainframe.addHandler("willpowerUpdate","hitpoints",this.updateHitpoints,this,[]);
	this.mainframe.addHandler("constitutionUpdate","stamina",this.updateStamina,this,[]);
	this.mainframe.addHandler("fortitudeUpdate","stamina",this.updateStamina,this,[]);
	this.mainframe.addHandler("willpowerUpdate","stamina",this.updateStamina,this,[]);
	this.mainframe.addHandler("spiritUpdate","stamina",this.updateStamina,this,[]);

	this.mainframe.addHandler("updateArmor","defense",this.updateDefense,this,[]);

	GM.debug.log("END: GM.npcSVC","Finished initializing npcSVC object",2);
};

// -------------------------------------------------------------------------------------------------
// destroy
// -------------------------------------------------------------------------------------------------
GM.npcSVC.prototype.destroy = function() {
	GM.debug.log("CALL: GM.npcSVC.destroy","Removing interfaces and services",2);

	this.ui.detach();
	delete this.ui;
};

// -------------------------------------------------------------------------------------------------
//
// -------------------------------------------------------------------------------------------------
GM.npcSVC.prototype.getName = function() {
	return this.dat.name;
};

// -------------------------------------------------------------------------------------------------
//
// -------------------------------------------------------------------------------------------------
GM.npcSVC.prototype.getTemplate = function() {
	return this.dat.template;
};

// -------------------------------------------------------------------------------------------------
//
// -------------------------------------------------------------------------------------------------
GM.npcSVC.prototype.getData = function(token) {
	return this.dat[token];
};

// -------------------------------------------------------------------------------------------------
//
// -------------------------------------------------------------------------------------------------
GM.npcSVC.prototype.getDataObject = function(token) {
	return new db.connector(this.dat,token);
};

// -------------------------------------------------------------------------------------------------
//
// -------------------------------------------------------------------------------------------------
GM.npcSVC.prototype.getList = function(token) {
	return this.dat.lists[token];
}

// -------------------------------------------------------------------------------------------------
//
// -------------------------------------------------------------------------------------------------
GM.npcSVC.prototype.getTag = function() {
	return this.dat.name.replace(/ /g,'').toLowerCase();
};

GM.npcSVC.prototype.remove = function() {
	GM.debug.log("CALL: GM.npcSVC.remove","Self-destroy",2);
	this.parent.removeNPC(this);
};

// -------------------------------------------------------------------------------------------------
// updateAttribute
// -------------------------------------------------------------------------------------------------
GM.npcSVC.prototype.updateAttribute = function(a) {
	GM.debug.log("GM.npcSVC.updateAttribute","Updating attribute: " + a,3);
	var attr = this.dat.attributes[a];
	attr.adjust = (attr.score < 10) ? kantia.attributes.adjust[attr.score] : (attr.score - 10) * 2 ;
	this.mainframe.trigger(a + "Update");
};

// -------------------------------------------------------------------------------------------------
//
// -------------------------------------------------------------------------------------------------
GM.npcSVC.prototype.updateHitpoints = function() {
	GM.debug.log("GM.npcSVC.updateHitpoints","Recalculating hitpoints",3);
	var size = parseInt(this.dat.attributes.size.score);
	var fort = parseInt(this.dat.attributes.fortitude.score);
	var con = parseInt(this.dat.attributes.constitution.score);
	var wil = parseInt(this.dat.attributes.willpower.score);

	var total_hp = (size * 2) + fort + con + wil - 10;
	var wound = Math.ceil(total_hp / 2);
	var bludgeon = total_hp - wound;

	this.dat.stats.health.hitpoints.wound = wound;
	this.dat.stats.health.hitpoints.bludgeon = bludgeon;
	this.mainframe.trigger("updateHitpoints");
};

// -------------------------------------------------------------------------------------------------
//
// -------------------------------------------------------------------------------------------------
GM.npcSVC.prototype.updateStamina = function() {
	GM.debug.log("GM.npcSVC.updateStamina","Recalculating stamina",3);
	var con = parseInt(this.dat.attributes.constitution.score);
	var fort = parseInt(this.dat.attributes.fortitude.score);
	var wil = parseInt(this.dat.attributes.willpower.score);
	var spr = parseInt(this.dat.attributes.spirit.score);

	var stam = con + fort + wil + spr;
	var rec = Math.ceil(con / 3);

	this.dat.stats.stamina.max = stam;
	this.dat.stats.stamina.current = stam;
	this.dat.stats.stamina.recovery = rec;
	this.mainframe.trigger("updateStamina");
};

// -------------------------------------------------------------------------------------------------
//
// -------------------------------------------------------------------------------------------------
GM.npcSVC.prototype.updateMovement = function() {
	GM.debug.log("GM.npcSVC.updateMovement","Recalculating movement rates",2);

	var str = parseInt(this.dat.attributes.strength.score);
	var siz = parseInt(this.dat.attributes.size.score);

	var major = 10;
	if(str - siz >= 3)
		major += 3;
	else
		major += (str - siz);

	// Get armor penalties for initiavite.

	// Adjust for short stride (every 6" under 5') and long stride (every 1' over 6').
	var height = kantia.attributes.height[siz];
	if(siz < 9) {
		// Short stride
		var diff = 60 - height;
		var mod = Math.round(diff / 6);
		major += (mod < -3) ? -3 : mod;
	}
	else if(siz > 12) {
		// Long stride
		var diff = height - 72;
		var mod = Math.round(diff / 12);
		major += mod;
	}

	var free = Math.round(major/3);
	var sprint = Math.round(major * 8);

	this.dat.stats.movement.major = major;
	this.dat.stats.movement.free = free;
	this.dat.stats.movement.sprint = sprint;

	this.mainframe.trigger("updateMovement");
};

// -------------------------------------------------------------------------------------------------
//
// -------------------------------------------------------------------------------------------------
GM.npcSVC.prototype.updateSkill = function(s,tf) {
	var rank = tf.getValue();
	this.dat.skills[s].rank = rank;
	var av = rank * 5;
	var adj = 0;
	if(this.dat.skills[s].attribute.length)
		adj = this.dat.skills[s].attribute[0].adjust - this.dat.skills[s].attribute[1].adjust;
	else
		adj = this.dat.skills[s].attribute.adjust;
	this.dat.skills[s].adjust = adj;
	this.dat.skills[s].av = av;
	this.dat.skills[s].total = av + adj;
	this.mainframe.trigger("skill_update");
};

// -------------------------------------------------------------------------------------------------
// updateWeapons
// -------------------------------------------------------------------------------------------------
GM.npcSVC.prototype.updateWeapons = function() {
	if(this.dat.weapons.main.name != "" && this.dat.weapons.off.name != "") {
		this.addEffect("dualwield",1);
	}
	
	// Update equiped weapons.
	for(var w in this.dat.weapons) {
		var name = this.dat.weapons[w].name;
		var sname = this.dat.weapons[w].skill;
		
		if(name != "" && sname != "") {
			var dat = this.dat.weapons[w];
			var type = dat.type;
			var weapon = kantia.weapons[type][name];
			var skill = this.dat.skills[sname];
			
			var av = skill.total - weapon.difficulty.base;
			var penalties = kantia.func.armorPenalties(this.dat.armor,["ar","r"]);
			if(type == "melee") {
				av += penalties.ar;
			}
			else if(type == "ranged") {
				av += penalties.r;
			}

			var pen = this.combatSkillPenalties(w,this.dat.weapons[w]);
			av -= pen;

			for(var a in dat.av) {
				dat.av[a] = av;
				av -= 20;
			}
			
			if(weapon.staging.source)
				dat.staging = this.dat.attributes[weapon.staging.source].score + weapon.staging.value;
			else
				dat.staging = weapon.staging.value;

			dat.attacks = Math.floor(skill.rank / 3);
			dat.damage = weapon.damage.text;
		}
	}
	this.mainframe.trigger("updateWeapon");
};

// -------------------------------------------------------------------------------------------------
//
// -------------------------------------------------------------------------------------------------
GM.npcSVC.prototype.updateList = function(list,skill,action) {
	if(!this.dat.lists[list])
		this.dat.lists[list] = {};

	if(!this.dat.lists[list][skill])
		this.dat.lists[list][skill] = 0;

	if(action === "add") {
		this.dat.lists[list][skill]++;
	}
	else if(action === "remove") {
		this.dat.lists[list][skill]--;

		if(this.dat.lists[list][skill] <= 0)
			delete this.dat.lists[list][skill];
	}
};

// -------------------------------------------------------------------------------------------------
// addDiscipline
// -------------------------------------------------------------------------------------------------
GM.npcSVC.prototype.addDiscipline = function(popup) {
	var name = popup.dat.name;
	var rank = popup.dat.rank;
	var attr = kantia.skills[name].attribute;
	this.hidePopup(popup);
	
	var disc = new kantia.template.magic(name,rank,name + " - Casting",rank,attr);
	disc.casting.adjust = this.dat.attributes[disc.casting.attribute].adjust;
	disc.casting.total = parseInt(disc.casting.av) + parseInt(disc.casting.adjust);
	this.dat.magic.disciplines[name] = disc;
	this.refreshDisciplines();
};

// -------------------------------------------------------------------------------------------------
// updateDiscipline - recalculates casting av, etc for the specified discipline.
// -------------------------------------------------------------------------------------------------
GM.npcSVC.prototype.updateDiscipline = function(disc,tf) {
	var r = tf.getValue();
	var d = this.dat.magic.disciplines[disc];
	d.casting.rank = r;
	d.casting.av = r * 5;
	d.casting.adjust = this.dat.attributes[d.casting.attribute].adjust;
	d.casting.total = d.casting.av + d.casting.adjust;
	
	this.mainframe.trigger("disc_update");
};

// -------------------------------------------------------------------------------------------------
// addSpell - this funciton adds a spell to a discipline.
// -------------------------------------------------------------------------------------------------
GM.npcSVC.prototype.addSpell = function(popup) {
	var name = popup.dat.spell;
	var rank = popup.dat.rank;
	var discipline = popup.dat.discipline;
	this.hidePopup(popup);
	
	var drank = this.dat.magic.disciplines[discipline].rank;
	var spell = new kantia.template.spell(name,rank);
	spell.power = parseInt(rank) + parseInt(drank);
	this.dat.magic.disciplines[discipline].spells[name] = spell;

	this.refreshDisciplines();
};

// -------------------------------------------------------------------------------------------------
// updateSpellRank
// -------------------------------------------------------------------------------------------------
GM.npcSVC.prototype.updateSpellRank = function(disc,spell,tf) {
	spell.rank = parseInt(tf.getValue());
	this.updateSpells(disc);
};

// -------------------------------------------------------------------------------------------------
// updateSpells
// -------------------------------------------------------------------------------------------------
GM.npcSVC.prototype.updateSpells = function(disc) {
	var discipline = this.dat.magic.disciplines[disc];
	var drank = parseInt(discipline.rank);

	for(var s in discipline.spells) {
		var spell = discipline.spells[s];
		var srank = parseInt(spell.rank);
		spell.power = drank + srank;
	}

	this.mainframe.trigger(disc + "_spell_update");
};

// -------------------------------------------------------------------------------------------------
// combatSkillPenalties
// -------------------------------------------------------------------------------------------------
GM.npcSVC.prototype.combatSkillPenalties = function(hand,weapon) {
	var p = 0;
	
	if(this.dat.effects.stun)
		p += 20;
	
	if(this.dat.effects.defense)
		p += this.dat.effects.defense * 20;

	if(weapon.type == "melee") {
		if(this.dat.effects.prone)
			p += 10;
		
		if(this.dat.effects.dualwield) {
			var twm = {};
			if(this.checkHC("Two Weapon Mastery"))
				twm = this.getHC("Two Weapon Mastery");

			if(this.checkTrait("Ambidextrious")) {
				if(twm.ambi)
					p += twm.ambi
				else
					p += 25;
			}
			else {
				if(twm[hand]) {
					p += twm[hand];
				}
				else if(hand == "main") {
					p += 30;
				}
				else if(hand == "off") {
					p += 50;
				}
			}

			if(kantia.weapons[weapon.type][weapon.name].other["Easy Two Weapon"])
				p -= 10;
		}
	}

	return p;
};

// -------------------------------------------------------------------------------------------------
// checkTrait
// -------------------------------------------------------------------------------------------------
GM.npcSVC.prototype.checkTrait = function(trait) {
	return this.dat.traits[trait] ? true : false;
};

// -------------------------------------------------------------------------------------------------
// checkHC
// -------------------------------------------------------------------------------------------------
GM.npcSVC.prototype.checkHC = function(hc) {
	return this.dat.mastery[hc] ? true : false;
};

// -------------------------------------------------------------------------------------------------
// getHC
// -------------------------------------------------------------------------------------------------
GM.npcSVC.prototype.getHC = function(hc) {
	return this.dat.mastery[hc].effect;
};

// -------------------------------------------------------------------------------------------------
//
// -------------------------------------------------------------------------------------------------
GM.npcSVC.prototype.addTrait = function(dat) {
	GM.debug.log("CALL: GM.npcSVC.addTrait","Adding trait",2);
	var index = dat.index;
	var name = this.dat.lists.traits[index];
	this.dat.traits[name] = name;
	this.mainframe.trigger("traitUpdate");
};

// -------------------------------------------------------------------------------------------------
//
// -------------------------------------------------------------------------------------------------
GM.npcSVC.prototype.removeTrait = function(name) {
	delete this.dat.traits[name];
	this.mainframe.trigger("traitUpdate");
};

// -------------------------------------------------------------------------------------------------
//
// -------------------------------------------------------------------------------------------------
GM.npcSVC.prototype.addArmor = function(dat) {
	var index = dat.index;
	var slot = dat.slot;
	var name = kantia.lists.armor[slot][index];
	var armor = kantia.armor[name];

	for(var a in armor) {
		this.dat.armor[slot][a] = armor[a];
	}
	this.mainframe.trigger("updateArmor");
};

// -------------------------------------------------------------------------------------------------
//
// -------------------------------------------------------------------------------------------------
GM.npcSVC.prototype.updateDefense = function() {
	var dr = 50;
	var noagldr = 50;
	var touchdr = 50;
	var staging = this.dat.attributes.fortitude.score;
	var absorb = 0;
	var race = this.dat.race.toLowerCase();

	// Add the agility adjust
	dr += this.dat.attributes.agility.adjust;
	touchdr += this.dat.attributes.agility.adjust;
	if(kantia.race[race].defense.agldr) {
		dr += kantia.race[race].defense.agldr;
		touchdr += kantia.race[race].defense.agldr;
	}

	// Add the size adjust
	dr -= this.dat.attributes.size.adjust;
	noagldr -= this.dat.attributes.size.adjust;
	touchdr -= this.dat.attributes.size.adjust;

	// Add the deflection bonus
	for(var a in this.dat.armor) {
		var armor = this.dat.armor[a];
		dr += armor.deflect;
		noagldr += armor.deflect;
		if(a == "torso") {
			staging += armor.staging;
			absorb += armor.absorb;
		}
	}

	if(kantia.race[race].defense.defdr) {
		dr += kantia.race[race].defense.defdr;
		noagldr += kantia.race[race].defense.defdr;
	}

	// Update the defense stat.
	this.dat.stats.defense.dr = dr;
	this.dat.stats.defense.noagldr = noagldr;
	this.dat.stats.defense.touchdr = touchdr;
	this.dat.stats.defense.staging = staging;
	this.dat.stats.defense.absorb = absorb;

	this.mainframe.trigger("updateDefense");
};

// -------------------------------------------------------------------------------------------------
//
// -------------------------------------------------------------------------------------------------
GM.npcSVC.prototype.removeArmor = function(slot) {
	var armor = this.dat.armor[slot];

	armor.name = "";
	armor.deflect = 0;
	armor.calledshot = 0;
	armor.staging = 0;
	armor.absorb = 0;
	armor.ballistic = 0;
	armor.bypass = 0;
	armor.block = 0;
	armor.coverage = 0;
	armor.penalties = {};
	armor.category = "";

	this.mainframe.trigger("updateArmor");
};

// -------------------------------------------------------------------------------------------------
//
// -------------------------------------------------------------------------------------------------
GM.npcSVC.prototype.addHC = function(dat) {
	var name = this.dat.lists.hc[dat.index];
	var rank = dat.rank;

	this.dat.hc[name] = rank;
	this.mainframe.trigger("HCUpdate");
};

// -------------------------------------------------------------------------------------------------
//
// -------------------------------------------------------------------------------------------------
GM.npcSVC.prototype.removeHC = function(name) {
	delete this.dat.hc[name];
	this.mainframe.trigger("HCUpdate");
};

// -------------------------------------------------------------------------------------------------
//
// -------------------------------------------------------------------------------------------------
GM.npcSVC.prototype.addMastery = function(dat) {
	var name = this.dat.lists.mastery[dat.index];
	var r = dat.rank;

	this.dat.mastery[name] = {rank: r,effect: kantia.mastery[name][r]};
	this.refreshMastery();
	this.mainframe.trigger("mastery_update");
};

// -------------------------------------------------------------------------------------------------
//
// -------------------------------------------------------------------------------------------------
GM.npcSVC.prototype.removeMastery = function(name) {
	this.dat.mastery[name] = {};
	delete this.dat.mastery[name];
	this.refreshMastery();
	this.mainframe.trigger("mastery_update");
};

// -------------------------------------------------------------------------------------------------
// selectWeapon
// -------------------------------------------------------------------------------------------------
GM.npcSVC.prototype.selectWeapon = function(dat) {
	var type = dat.type;
	var slot = dat.slot;
	var iname = dat.name;
	var iskill = dat.skill;
	
	var name = this.dat.lists[type][iname];
	var skill = this.dat.lists.skills[iskill];
	this.dat.weapons[slot].type = type;
	this.dat.weapons[slot].name = name;
	this.dat.weapons[slot].skill = skill;
	this.updateList("combatSkills",skill,"add");
	
	this.updateWeapons();
};

// -------------------------------------------------------------------------------------------------
//
// -------------------------------------------------------------------------------------------------
GM.npcSVC.prototype.removeWeapon = function(slot) {
	var weapon = this.dat.weapons[slot];

	var s = weapon.skill;
	this.updateList("combatSkills",s,"remove");

	weapon.type = ""; 
	weapon.name = "";
	weapon.skill = "";
	var av = 0;
	for(var a in weapon.av) {
		weapon.av[a] = av;
		av -= 20;
	}
	weapon.attacks = "";
	weapon.staging = "";
	weapon.damage = "";

	if(this.dat.weapons["main"].type == "" || this.dat.weapons["off"].type == "") {
		//this.clearEffect("dualwield");
		this.updateWeapons();
		//this.mainframe.trigger("updateEffect");
	}
	else
		this.updateWeapons();
};

// -------------------------------------------------------------------------------------------------
//
// -------------------------------------------------------------------------------------------------
GM.npcSVC.prototype.addEffect = function(name) {
	GM.debug.log("GM.npcSVC.addEffect","Adding effect:" + name,2);
}