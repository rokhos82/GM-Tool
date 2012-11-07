kantia.npcSVC = function(dat,parent) {
	this.dat = dat;
	this.name = dat.name;
	this.tag = this.name.replace(/ /g,'').toLowerCase();
	this.parent = parent;
	this.mainframe = new lib.mainframe(parent.mainframe);
	this.children = new Array();
	
	this.ui = new ui.panel(dat.name + " - " + dat.template);
	this.panels = {};
	
	this.ui.addButton("Remove",new db.link(this.parent,this.parent.removeNPC,[this.dat.name]));

	var stats = this.dat.stats;
	
	var p = this.ui.addPanel("Description");
	var ta = p.addTextArea(new db.connector(this.dat,"description"));
	ta.addClass("desc_box");
	ta.dom.setAttribute("rows",4);
		
	var p = this.ui.addPanel("Attributes");
	this.panels.attributes = p;
	p.addClass("small");
	var t = p.addTable();
	t.addClass("attr_table");
	for(var a in this.dat.attributes) {
		var attr = this.dat.attributes[a];
		t.addRow([attr.name,attr.score,attr.adjust]);
	}
	
	var hlth = this.ui.addPanel("Health");
	this.panels.health = hlth;
	hlth.addClass("small");
	var p = hlth.addPanel("Hitpoints");
	var t = p.addTable();
	t.addRow(["Bludgeon",stats.health.hitpoints.bludgeon]);
	t.addRow(["Wound",stats.health.hitpoints.wound]);
	
	var p = hlth.addPanel("Stamina");
	var t = p.addTable();
	t.addRow(["Max",stats.stamina.max]);
	t.addRow(["Current",stats.stamina.current]);
	t.addRow(["Wind",stats.wind.max]);
	
	// Build the other section -------------------------
	var other = this.ui.addPanel("Other");
	this.panels.other = other;
	other.addClass("small");
	var p = other.addPanel("Movement");
	var t = p.addTable();
	t.addRow(["Free",stats.movement.free]);
	t.addRow(["Major",stats.movement.major]);
	t.addRow(["Sprint",stats.movement.sprint]);
	
	var traits = other.addPanel("Traits");
	traits.addClass("small");
	var l = traits.addTable();
	this.panels.traits = l;
	this.refreshTraits();
	traits.addButton("+",new db.link(this,this.addTraitPopup,[]));

	// Build the HC section ---------------------------
	var hc = this.ui.addPanel("HC");
	hc.addClass("small");
	var t = hc.addTable();
	this.panels.hc = t;
	this.refreshHC();
	var b = hc.addButton("+",new db.link(this,this.addHCPopup,[]));
	
	// Build the combat section -----------------------
	var combat = this.ui.addPanel("Combat");
	
	var defense = combat.addPanel("Defense");
	this.panels.defense = defense;
	defense.addClass("small");
	var t = defense.addTable();
	this.mainframe.addHandler("defense_update","def_table",t.refreshView,t,[]);
	t.addCustomRow([new ui.text("Normal DR"),new ui.text(new db.view(stats.defense,"dr"))]);
	t.addCustomRow([new ui.text("No Agility DR"),new ui.text(new db.view(stats.defense,"noagldr"))]);
	t.addCustomRow([new ui.text("Touch DR"),new ui.text(new db.view(stats.defense,"touchdr"))]);
	t.addCustomRow([new ui.text("Staging"),new ui.text(new db.view(stats.defense,"staging"))]);
	t.addCustomRow([new ui.text("Absorb"),new ui.text(new db.view(stats.defense,"absorb"))]);

	// Build the armor section
	var armor = combat.addPanel("Armor");
	armor.addClass("small");
	var t = armor.addTable();
	t.addClass("attr_table");
	this.mainframe.addHandler("armor_update","armor_table",t.refreshView,t,[]);
	t.addRow(["Slot","Armor","DR","Called Shot","Staging","Absorb","Bypass"]);
	for(var a in this.dat.armor) {
		var armor = this.dat.armor[a];
		var r = [];
		r.push(new ui.text(a));
		r.push(new ui.text(new db.view(armor,"name")));
		r.push(new ui.text(new db.view(armor,"deflect")));
		r.push(new ui.text(new db.view(armor,"calledshot")));
		r.push(new ui.text(new db.view(armor,"staging")));
		r.push(new ui.text(new db.view(armor,"absorb")));
		r.push(new ui.text(new db.view(armor,"bypass")));
		r.push(new ui.button("+",new db.link(this,this.addArmorPopup,[a])));
		r.push(new ui.button("X",new db.link(this,this.removeArmor,[a])));
		t.addCustomRow(r);
	}
	this.updateDefense();

	// Build the combat av section
	var cav = this.ui.addPanel("Combat AVs");
	cav.addClass("small");
	var t = cav.addTable();
	t.addClass("attr_table");
	this.mainframe.addHandler("weapon_update","weap_table",t.refreshView,t,[]);
	t.addRow(["Slot","Weapon/Skill","Actions","1st","2nd","3rd","4th","5th","Staging","Damage"]);
	for(var w in this.dat.weapons) {
		var weap = this.dat.weapons[w];
		var r = [
			new ui.text(w),
			new ui.text(new db.view(weap,"name")),
			new ui.text(new db.view(weap,"attacks")),
			new ui.text(new db.view(weap.av,0)),
			new ui.text(new db.view(weap.av,1)),
			new ui.text(new db.view(weap.av,2)),
			new ui.text(new db.view(weap.av,3)),
			new ui.text(new db.view(weap.av,4)),
			new ui.text(new db.view(weap,"staging")),
			new ui.text(new db.view(weap,"damage")),
			new ui.button("+",new db.link(this,this.selectWeaponPopup,[w])),
			new ui.button("X",new db.link(this,this.removeWeapon,[w]))
		];
		t.addCustomRow(r);
	}

	var mastery = this.ui.addPanel("Mastery");
	mastery.addClass("small");
	var t = mastery.addTable();
	t.addClass("attr_table");
	this.panels.mastery = t;
	this.refreshMastery();
	mastery.addButton("+",new db.link(this,this.addMasteryPopup,[]));
	
	// Build the skills section ------------------------
	var skills = this.ui.addPanel("Skills");
	this.panels.skills = skills;
	var t1 = skills.addTable();
	t1.addClass("skill_table");
	t1.addClass("attr_table");
	t1.addRow(["Skill","Rank","AV"]);
	this.mainframe.addHandler("skill_update","skill_table1",t1.refreshView,t1,[]);
	var t2 = skills.addTable();
	t2.addClass("skill_table");
	t2.addClass("attr_table");
	t2.addRow(["Skill","Rank","AV"]);
	this.mainframe.addHandler("skill_update","skill_table2",t2.refreshView,t2,[]);
	var l = this.dat.lists.skills.length;
	var shift = Math.ceil(l/2);
	for(var i = 0;i < shift;i++) {
		var name1 = this.dat.lists.skills[i];
		var skill1 = this.dat.skills[name1];
		var r = t1.addRow([skill1.name,new db.connector(skill1,"rank"),new db.view(skill1,"total")]);
		var c = r.cells[1].children[0];
		c.setUpdate(this,this.updateSkill,[name1,c]);

		if(i + shift < l) {
			var name2 = this.dat.lists.skills[i + shift];
			var skill2 = this.dat.skills[name2];
			var r = t2.addRow([
				skill2.name,
				new db.connector(skill2,"rank"),
				new db.view(skill2,"total")
			]);
			var c = r.cells[1].children[0];
			c.setUpdate(this,this.updateSkill,[name2,c]);
		}
	}
	
	// Build the spell section
	var spell = this.ui.addPanel("Magic");
	var t = spell.addText(this.dat.magic.text);
	t.addClass("block");
	var b = spell.addButton("Add Discipline",new db.link(this,this.addDisciplinePopup,[]));
	var disc = spell.addPanel();
	this.panels.disciplines = disc;
	this.mainframe.addHandler("disc_update","disc_table",disc.refreshView,disc,[]);
	this.refreshDisciplines();

	// Mainframe handlers
	this.mainframe.addHandler("defense_action","update_weapons",this.updateWeapons,this,[]);
	this.mainframe.addHandler("defense_action","effect_refresh",this.refreshEffects,this,[]);
	this.mainframe.addHandler("new_round","update_weapons",this.updateWeapons,this,[]);
	this.mainframe.addHandler("new_round","effect_refresh",this.refreshEffects,this,[]);
	this.mainframe.addHandler("add_effect","effect_refresh",this.refreshEffects,this,[]);
	this.mainframe.addHandler("effect_update","effect_refresh",this.refreshEffects,this,[]);
	this.mainframe.addHandler("skill_update","update_weapons",this.updateWeapons,this,[]);
	this.mainframe.addHandler("trait_update","update_weapons",this.updateWeapons,this,[]);
	this.mainframe.addHandler("armor_update","update_defense",this.updateDefense,this,[]);
	this.mainframe.addHandler("armor_update","update_weapons",this.updateWeapons,this,[]);
	this.mainframe.addHandler("mastery_update","update_weapons",this.updateWeapons,this,[]);
	this.mainframe.addHandler("mastery_update","update_defense",this.updateDefense,this,[]);
};

// -------------------------------------------------------------------------------------------------
//
// -------------------------------------------------------------------------------------------------
kantia.npcSVC.prototype.initialize = function() {
	this.parent.appendNPC(this);
};

// -------------------------------------------------------------------------------------------------
//
// -------------------------------------------------------------------------------------------------
kantia.npcSVC.prototype.destroy = function() {
	this.ui.destroy();
	delete this.ui;
};

// -------------------------------------------------------------------------------------------------
//
// -------------------------------------------------------------------------------------------------
kantia.npcSVC.prototype.updateSkill = function(s,tf) {
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
// selectWeaponPopup
// -------------------------------------------------------------------------------------------------
kantia.npcSVC.prototype.selectWeaponPopup = function(slot) {
	var popup = this.ui.addPopup();
	popup.show();
	popup.addClass("popup");
	popup.setOverlayClass("fog");
	var type = "melee";
	if(slot == "ranged")
		type = "ranged";
	
	popup.dat = {
		name: "",
		skill: "",
		type: type,
		slot: slot
	};

	var p = popup.addPanel("Select Weapon");
	var cb = p.addComboBox("Weapon",this.dat.lists[type],new db.connector(popup.dat,"name"));
	cb.updateData();
	cb.focus();
	var cb = p.addComboBox("Skill",this.dat.lists.skills,new db.connector(popup.dat,"skill"));
	cb.updateData();
	var b = p.addButton("Ok",new db.link(this,this.selectWeapon,[popup]));
	var b = p.addButton("Cancel",new db.link(this,this.hidePopup,[popup]));
};

// -------------------------------------------------------------------------------------------------
// selectWeapon
// -------------------------------------------------------------------------------------------------
kantia.npcSVC.prototype.selectWeapon = function(popup) {
	var type = popup.dat.type;
	var slot = popup.dat.slot;
	var iname = popup.dat.name;
	var iskill = popup.dat.skill;
	this.hidePopup(popup);

	var name = this.dat.lists[type][iname];
	var skill = this.dat.lists.skills[iskill];
	this.dat.weapons[slot].type = type;
	this.dat.weapons[slot].name = name;
	this.dat.weapons[slot].skill = skill;
	
	this.updateWeapons();
};

// -------------------------------------------------------------------------------------------------
// hidePopup
// -------------------------------------------------------------------------------------------------
kantia.npcSVC.prototype.hidePopup = function(popup) {
	popup.hide();
	this.ui.removeChild(popup);
};

// -------------------------------------------------------------------------------------------------
// updateWeapons
// -------------------------------------------------------------------------------------------------
kantia.npcSVC.prototype.updateWeapons = function() {
	if(this.dat.weapons.main.name != "" && this.dat.weapons.off.name != "")
		this.addEffect("dualwield",1);
	
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
	this.mainframe.trigger("weapon_update");
};

// -------------------------------------------------------------------------------------------------
//
// -------------------------------------------------------------------------------------------------
kantia.npcSVC.prototype.removeWeapon = function(slot) {
	var weapon = this.dat.weapons[slot];
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
		this.clearEffect("dualwield");
		this.updateWeapons();
		this.mainframe.trigger("effect_update");
	}
	else
		this.mainframe.trigger("weapon_update");
};

// -------------------------------------------------------------------------------------------------
// addDisciplinePopup
// -------------------------------------------------------------------------------------------------
kantia.npcSVC.prototype.addDisciplinePopup = function() {
	var popup = this.ui.addPopup();
	popup.show();
	popup.addClass("popup");
	popup.setOverlayClass("fog");
	popup.dat = {
		name: "",
		rank: 0,
	};

	var p = popup.addPanel("Add Discipline");
	var cb = p.addComboBox("Discipline",null,new db.connector(popup.dat,"name"));
	cb.setComplexOptions(kantia.disciplineList);
	cb.updateData();
	cb.focus();
	p.addTextField("Rank",new db.connector(popup.dat,"rank"));
	p.addButton("Ok",new db.link(this,this.addDiscipline,[popup]));
	p.addButton("Cancel",new db.link(this,this.hidePopup,[popup]));
};

// -------------------------------------------------------------------------------------------------
// addDiscipline
// -------------------------------------------------------------------------------------------------
kantia.npcSVC.prototype.addDiscipline = function(popup) {
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
// refreshDisciplines - rebuilds the UI elements for the disciplines.
// -------------------------------------------------------------------------------------------------
kantia.npcSVC.prototype.refreshDisciplines = function() {
	this.panels.disciplines.removeChildren();
	
	for(var d in this.dat.magic.disciplines) {
		var panel = this.panels.disciplines.addPanel(d);
		var disc = this.dat.magic.disciplines[d];
		panel.addButton("Remove");
		var t = panel.addTable();
		t.addRow(["Disc Rank",new db.connector(disc,"rank")]);
		var r = t.addRow([
			"Casting Rank",
			new db.connector(disc.casting,"rank"),
			new db.connector(disc.casting,"total")
		]);
		r.cells[0].setUpdate(this,this.updateDiscipline,[d,r.cells[0]]);
		panel.addButton("Add Spell",new db.link(this,this.addSpellPopup,[disc.discipline]));
		var p = panel.addPanel("Spells");
		this.refreshSpells(d,p);
	}
	
	this.mainframe.trigger("disc_update");
};

// -------------------------------------------------------------------------------------------------
// updateDiscipline - recalculates casting av, etc for the specified discipline.
// -------------------------------------------------------------------------------------------------
kantia.npcSVC.prototype.updateDiscipline = function(disc,tf) {
	var r = tf.getValue();
	var d = this.dat.magic.disciplines[disc];
	d.casting.rank = r;
	d.casting.av = r * 5;
	d.casting.adjust = this.dat.attributes[d.casting.attribute].adjust;
	d.casting.total = d.casting.av + d.casting.adjust;
	
	this.mainframe.trigger("disc_update");
};

// -------------------------------------------------------------------------------------------------
// addSpellPopup - setups and displays the popup used to add a spell to a discipline.
// -------------------------------------------------------------------------------------------------
kantia.npcSVC.prototype.addSpellPopup = function(disc) {
	var popup = this.ui.addPopup();
	popup.addClass("popup");
	popup.setOverlayClass("fog");
	popup.show();
	popup.dat = {
		discipline: disc,
		spell: "",
		rank: 0
	};

	var p = popup.addPanel("Add Spell - " + disc);
	var cb = p.addComboBox("Spells",kantia.spellList[disc],new db.connector(popup.dat,"spell"));
	cb.updateData();
	cb.focus();
	p.addTextField("Rank",new db.connector(popup.dat,"rank"));
	p.addButton("Ok",new db.link(this,this.addSpell,[popup]));
	p.addButton("Cancel",new db.link(this,this.hidePopup,[popup]));
};

// -------------------------------------------------------------------------------------------------
// addSpell - this funciton adds a spell to a discipline.
// -------------------------------------------------------------------------------------------------
kantia.npcSVC.prototype.addSpell = function(popup) {
	var name = popup.dat.spell;
	var rank = popup.dat.rank;
	var discipline = popup.dat.discipline;
	this.hidePopup(popup);
	
	var drank = this.dat.magic.disciplines[discipline].rank;
	var spell = new kantia.template.spell(name,rank);
	spell.power = rank + drank;
	this.dat.magic.disciplines[discipline].spells[name] = spell;

	this.refreshDisciplines();
};

// -------------------------------------------------------------------------------------------------
// refreshSpells - this function refreshes the spell listing for the specified discipline.
// -------------------------------------------------------------------------------------------------
kantia.npcSVC.prototype.refreshSpells = function(disc,panel) {
	var discipline = this.dat.magic.disciplines[disc];

	panel.removeChildren();
	var t = panel.addTable();
	t.addClass("attr_table");
	t.addRow(["Name","Rank","Power"]);
	for(var s in discipline.spells) {
		var spell = discipline.spells[s];
		t.addRow([spell.name,spell.rank,spell.power]);
	}
};

// -------------------------------------------------------------------------------------------------
// refreshEffects
// -------------------------------------------------------------------------------------------------
kantia.npcSVC.prototype.refreshEffects = function() {
	this.panels.effects.removeChildren();
	
	for(var e in this.dat.effects) {
		var name = e;
		var value = this.dat.effects[e];
		this.panels.effects.addButton(name + " - " + value);
	}
};

// -------------------------------------------------------------------------------------------------
// updateEffect
// -------------------------------------------------------------------------------------------------
kantia.npcSVC.prototype.updateEffect = function(cat) {
	if(cat == "defense") {
		this.dat.effects.defense =  0;
	}
	else if(cat == "stun") {
		this.dat.effects.stun = this.dat.effects.stun > 0 ? this.dat.effects.stun - 1 : 0;
	}
};

kantia.npcSVC.prototype.clearEffect = function(e) {
	delete this.dat.effects[e];
};

// -------------------------------------------------------------------------------------------------
// resetEffects
// -------------------------------------------------------------------------------------------------
kantia.npcSVC.prototype.resetEffects = function() {
	this.dat.effects = {};
};

// -------------------------------------------------------------------------------------------------
// defensiveAction
// -------------------------------------------------------------------------------------------------
kantia.npcSVC.prototype.defensiveAction = function() {
	if(!this.dat.effects.defense)
		this.dat.effects.defense = 0;

	this.dat.effects.defense += 1;

	this.mainframe.trigger("defense_action");
};

// -------------------------------------------------------------------------------------------------
// offensiveAction
// -------------------------------------------------------------------------------------------------
kantia.npcSVC.prototype.offensiveAction = function() {
};

// -------------------------------------------------------------------------------------------------
// newCombatRound
// -------------------------------------------------------------------------------------------------
kantia.npcSVC.prototype.newCombatRound = function() {
	this.updateEffect("defense");
	this.updateEffect("stun");
	this.mainframe.trigger("new_round");
};

// -------------------------------------------------------------------------------------------------
// addEffect
// -------------------------------------------------------------------------------------------------
kantia.npcSVC.prototype.addEffect = function(cat,value) {
	this.dat.effects[cat] = value;
	this.mainframe.trigger("add_effect");
};


// -------------------------------------------------------------------------------------------------
// combatSkillPenalties
// -------------------------------------------------------------------------------------------------
kantia.npcSVC.prototype.combatSkillPenalties = function(hand,weapon) {
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
kantia.npcSVC.prototype.checkTrait = function(trait) {
	return this.dat.traits[trait] ? true : false;
};

// -------------------------------------------------------------------------------------------------
// checkHC
// -------------------------------------------------------------------------------------------------
kantia.npcSVC.prototype.checkHC = function(hc) {
	return this.dat.mastery[hc] ? true : false;
};

// -------------------------------------------------------------------------------------------------
// getHC
// -------------------------------------------------------------------------------------------------
kantia.npcSVC.prototype.getHC = function(hc) {
	return this.dat.mastery[hc].effect;
};

// -------------------------------------------------------------------------------------------------
// addTraitPopup
// -------------------------------------------------------------------------------------------------
kantia.npcSVC.prototype.addTraitPopup = function() {
	var popup = this.ui.addPopup();
	popup.addClass("popup");
	popup.setOverlayClass("fog");
	popup.show();
	popup.dat = {
		index: 0
	};
	var p = popup.addPanel("Add Trait");
	var cb = p.addComboBox("Trait",this.dat.lists.traits,new db.connector(popup.dat,"index"));
	cb.focus();
	p.addButton("Ok",new db.link(this,this.addTrait,[popup]));
	p.addButton("Cancel",new db.link(this,this.hidePopup,[popup]));
};

// -------------------------------------------------------------------------------------------------
//
// -------------------------------------------------------------------------------------------------
kantia.npcSVC.prototype.addTrait = function(popup) {
	var index = popup.dat.index;
	var name = this.dat.lists.traits[index];
	this.dat.traits[name] = name;
	this.refreshTraits();
	this.hidePopup(popup);
	this.mainframe.trigger("trait_update");
};

// -------------------------------------------------------------------------------------------------
//
// -------------------------------------------------------------------------------------------------
kantia.npcSVC.prototype.refreshTraits = function() {
	var l = this.panels.traits;
	l.removeRows();
	for(var t in this.dat.traits) {
		l.addCustomRow([
			new ui.text(t),
			new ui.button("X",new db.link(this,this.removeTrait,[t]))
		]);
	}
};

// -------------------------------------------------------------------------------------------------
//
// -------------------------------------------------------------------------------------------------
kantia.npcSVC.prototype.removeTrait = function(name) {
	delete this.dat.traits[name];
	this.refreshTraits();
	this.mainframe.trigger("trait_update");
};

// -------------------------------------------------------------------------------------------------
//
// -------------------------------------------------------------------------------------------------
kantia.npcSVC.prototype.addArmorPopup = function(slot) {
	var popup = this.ui.addPopup();
	popup.dat = {
		index: 0,
		slot: slot
	};
	popup.addClass("popup");
	popup.setOverlayClass("fog");
	popup.show();
	var p = popup.addPanel("Add Armor");
	var cb = p.addComboBox("Armor",kantia.lists.armor[slot],new db.connector(popup.dat,"index"));
	cb.updateData();
	cb.focus();
	p.addButton("Ok",new db.link(this,this.addArmor,[popup]));
	p.addButton("Cancel",new db.link(this,this.hidePopup,[popup]));
};

// -------------------------------------------------------------------------------------------------
//
// -------------------------------------------------------------------------------------------------
kantia.npcSVC.prototype.addArmor = function(popup) {
	var index = popup.dat.index;
	var slot = popup.dat.slot;
	var name = kantia.lists.armor[slot][index];
	var armor = kantia.armor[name];

	for(var a in armor) {
		this.dat.armor[slot][a] = armor[a];
	}

	this.hidePopup(popup);
	this.mainframe.trigger("armor_update");
};

// -------------------------------------------------------------------------------------------------
//
// -------------------------------------------------------------------------------------------------
kantia.npcSVC.prototype.updateDefense = function() {
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

	this.mainframe.trigger("defense_update");
};

// -------------------------------------------------------------------------------------------------
//
// -------------------------------------------------------------------------------------------------
kantia.npcSVC.prototype.removeArmor = function(slot) {
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

	this.mainframe.trigger("armor_update");
};

// -------------------------------------------------------------------------------------------------
//
// -------------------------------------------------------------------------------------------------
kantia.npcSVC.prototype.addHCPopup = function() {
	var hc_dat = {
		index: 0,
		rank: 0
	};
	var popup = this.ui.addPopup();
	popup.addClass("popup");
	popup.setOverlayClass("fog");
	popup.show();
	
	var p = popup.addPanel("Add Heroic Characteristic");
	var cb = p.addComboBox("HC",this.dat.lists.hc,new db.connector(hc_dat,"index"));
	cb.focus();
	var tf = p.addTextField("Rank",new db.connector(hc_dat,"rank"));
	
	var seq = new db.sequence();
	seq.addAction("addhc",new db.sequence.action(this,this.addHC,[hc_dat]));
	seq.addAction("hide",new db.sequence.action(this,this.hidePopup,[popup]));
	p.addButton("Ok",seq);
	p.addButton("Cancel",new db.link(this,this.hidePopup,[popup]));
};

// -------------------------------------------------------------------------------------------------
//
// -------------------------------------------------------------------------------------------------
kantia.npcSVC.prototype.addHC = function(dat) {
	var name = this.dat.lists.hc[dat.index];
	var rank = dat.rank;

	this.dat.hc[name] = rank;
	this.refreshHC();
	this.mainframe.trigger("update_hc");
};

// -------------------------------------------------------------------------------------------------
//
// -------------------------------------------------------------------------------------------------
kantia.npcSVC.prototype.refreshHC = function() {
	this.panels.hc.removeRows();
	for(var h in this.dat.hc) {
		this.panels.hc.addCustomRow([
			new ui.text(h + " - " + this.dat.hc[h]),
			new ui.button("X",new db.link(this,this.removeHC,[h]))
		]);
	}
};

// -------------------------------------------------------------------------------------------------
//
// -------------------------------------------------------------------------------------------------
kantia.npcSVC.prototype.removeHC = function(name) {
	delete this.dat.hc[name];
	this.refreshHC();
	this.mainframe.trigger("update_hc");
};

// -------------------------------------------------------------------------------------------------
//
// -------------------------------------------------------------------------------------------------
kantia.npcSVC.prototype.addMasteryPopup = function() {
	var mastery_dat = {
		index: 0,
		rank: 1
	};
	var popup = this.ui.addPopup();
	popup.addClass("popup");
	popup.setOverlayClass("fog");
	popup.show();
	
	var p = popup.addPanel("Add Mastery");
	var cb = p.addComboBox("Mastery",this.dat.lists.mastery,new db.connector(mastery_dat,"index"));
	cb.focus();
	var tf = p.addTextField("Rank",new db.connector(mastery_dat,"rank"));

	var seq = new db.sequence();
	seq.addAction("add_mastery",new db.sequence.action(this,this.addMastery,[mastery_dat]));
	seq.addAction("hide",new db.sequence.action(this,this.hidePopup,[popup]));
	p.addButton("Ok",seq);
	p.addButton("Cancel",new db.link(this,this.hidePopup,[popup]));
};

// -------------------------------------------------------------------------------------------------
//
// -------------------------------------------------------------------------------------------------
kantia.npcSVC.prototype.addMastery = function(dat) {
	var name = this.dat.lists.mastery[dat.index];
	var r = dat.rank;

	this.dat.mastery[name] = {rank: r,effect: kantia.mastery[name][r]};
	this.refreshMastery();
	this.mainframe.trigger("mastery_update");
};

// -------------------------------------------------------------------------------------------------
//
// -------------------------------------------------------------------------------------------------
kantia.npcSVC.prototype.refreshMastery = function() {
	this.panels.mastery.removeRows();
	this.panels.mastery.addRow(["Mastery","Rank"]);
	for(var m in this.dat.mastery) {
		this.panels.mastery.addCustomRow([
			new ui.text(m),
			new ui.text(this.dat.mastery[m].rank),
			new ui.button("X",new db.link(this,this.removeMastery,[m]))
		]);
	}
};

// -------------------------------------------------------------------------------------------------
//
// -------------------------------------------------------------------------------------------------
kantia.npcSVC.prototype.removeMastery = function(name) {
	this.dat.mastery[name] = {};
	delete this.dat.mastery[name];
	this.refreshMastery();
	this.mainframe.trigger("mastery_update");
};