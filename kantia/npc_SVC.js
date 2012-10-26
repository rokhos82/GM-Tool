kantia.npcSVC = function(dat,parent) {
	this.dat = dat;
	this.name = dat.name;
	this.tag = this.name.replace(/ /g,'').toLowerCase();
	this.parent = parent;
	this.mainframe = new lib.mainframe(parent.mainframe);
	this.children = new Array();
	
	this.ui = new ui.panel(dat.name + " - " + dat.template);
	this.panels = {};
	
	this.ui.addButton("Defend");
	this.ui.addButton("Stun");
	this.ui.addButton("Grapple");
	this.ui.addButton("Prone");
	this.ui.addButton("K.O.");
	this.ui.addButton("Bound/Helpless");
	this.ui.addButton("Fight Defensively");
	this.ui.addButton("Throwing Caution");
	this.ui.addButton("Delay");
	this.ui.addButton("Rush");
	this.ui.addButton("Remove",new db.link(this.parent,this.parent.removeNPC,[this.dat.name]));
	
	var stats = this.dat.stats;
	var p = this.ui.addPanel("Effects");

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
	t.addRow(["Stamina",stats.stamina.max]);
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
	var t = traits.addTable();
	for(var a in this.dat.traits) {
		t.addRow([a]);
	}
	
	// Build the combat section -----------------------
	var combat = this.ui.addPanel("Combat");
	
	var defense = combat.addPanel("Defense");
	this.panels.defense = defense;
	defense.addClass("small");
	var t = defense.addTable();
	t.addRow(["Normal DR",stats.defense.dr]);
	t.addRow(["No Agility DR",stats.defense.noagldr]);
	t.addRow(["Touch DR",stats.defense.touchdr]);
	t.addRow(["Staging",stats.defense.staging]);
	t.addRow(["Absorb",stats.defense.absorb]);
		
	var main = combat.addPanel("Main Hand Weapon");
	this.panels.mainhand = main;
	main.addClass("small");
	main.addButton("Equip",new db.link(this,this.selectWeaponPopup,["melee","main"]));
	main.addButton("Remove");
	var t = main.addTable();
	this.mainframe.addHandler("weapon_update","main_table",t.refreshView,t,[]);
	t.addRow(["Weapon",new db.connector(this.dat.weapons.main,"name")]);
	t.addRow(["AV",new db.connector(this.dat.weapons.main,"av")]);
	t.addRow(["Staging",new db.connector(this.dat.weapons.main,"staging")]);
	t.addRow(["Attacks",new db.connector(this.dat.weapons.main,"attacks")]);
	t.addRow(["Damage",new db.connector(this.dat.weapons.main,"damage")]);

	var off = combat.addPanel("Off Hand Weapon");
	this.panels.offhand = off;
	off.addClass("small");
	off.addButton("Equip",new db.link(this,this.selectWeaponPopup,["melee","off"]));
	off.addButton("Remove");
	var t = off.addTable();
	this.mainframe.addHandler("weapon_update","off_table",t.refreshView,t,[]);
	t.addRow(["Weapon",new db.connector(this.dat.weapons.off,"name")]);
	t.addRow(["AV",new db.connector(this.dat.weapons.off,"av")]);
	t.addRow(["Staging",new db.connector(this.dat.weapons.off,"staging")]);
	t.addRow(["Attacks",new db.connector(this.dat.weapons.off,"attacks")]);
	t.addRow(["Damage",new db.connector(this.dat.weapons.off,"damage")]);

	
	var ranged = combat.addPanel("Ranged Weapon");
	this.panels.ranged = ranged;
	ranged.addClass("small");
	ranged.addButton("Equip",new db.link(this,this.selectWeaponPopup,["ranged","ranged"]));
	ranged.addButton("Remove");
	var t = ranged.addTable();
	this.mainframe.addHandler("weapon_update","range_table",t.refreshView,t,[]);
	t.addRow(["Weapon",new db.connector(this.dat.weapons.ranged,"name")]);
	t.addRow(["AV",new db.connector(this.dat.weapons.ranged,"av")]);
	t.addRow(["Staging",new db.connector(this.dat.weapons.ranged,"staging")]);
	t.addRow(["Attacks",new db.connector(this.dat.weapons.ranged,"attacks")]);
	t.addRow(["Damage",new db.connector(this.dat.weapons.ranged,"damage")]);
	
	// Build the skills section ------------------------
	var skills = this.ui.addPanel("Skills");
	this.panels.skills = skills;
	var t = skills.addTable();
	t.addClass("attr_table");
	t.addRow(["Skill","Rank","AV"]);
	this.mainframe.addHandler("skill_update","skill_table",t.refreshView,t,[]);
	this.mainframe.addHandler("skill_update","weapon_table",this.updateWeapons,this,[]);
	for(var s in this.dat.skills) {
		var skill = this.dat.skills[s];
		var r = t.addRow([skill.name,new db.connector(skill,"rank"),new db.connector(skill,"total")]);
		r.cells[0].setUpdate(this,this.updateSkill,[s,r.cells[0]]);
	}
	
	// Build the armor section
	var armor = this.ui.addPanel("Armor");
	var t = armor.addTable();
	t.addClass("attr_table");
	t.addRow(["Armor","DR","Called Shot","Staging","Absorb","Bypass"]);
	for(var a in this.dat.armor) {
		var armor = this.dat.armor[a];
		t.addRow([armor.name,armor.deflect,armor.calledshot,armor.staging,armor.absorb,armor.bypass]);
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
	var adj = this.dat.skills[s].attribute.adjust;
	this.dat.skills[s].adjust = adj;
	this.dat.skills[s].av = av;
	this.dat.skills[s].total = av + adj; 
	this.mainframe.trigger("skill_update");
};

// -------------------------------------------------------------------------------------------------
// selectWeaponPopup
// -------------------------------------------------------------------------------------------------
kantia.npcSVC.prototype.selectWeaponPopup = function(type,slot) {
	var popup = this.ui.addPopup();
	popup.show();
	popup.addClass("popup");
	popup.setOverlayClass("fog");
	popup.dat = {
		name: "",
		skill: "",
		type: type,
		slot: slot
	};

	var p = popup.addPanel("Select Weapon");
	var cb = p.addComboBox("Weapon",this.dat[type + "List"],new db.connector(popup.dat,"name"));
	cb.updateData();
	cb.focus();
	var cb = p.addComboBox("Skill",this.dat.skillList,new db.connector(popup.dat,"skill"));
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

	var name = this.dat[type + "List"][iname];
	var skill = this.dat.skillList[iskill];
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
	// Update equiped weapons.
	for(var w in this.dat.weapons) {
		var name = this.dat.weapons[w].name;
		var sname = this.dat.weapons[w].skill;
		
		if(name != "" && sname != "") {
			var dat = this.dat.weapons[w];
			var type = dat.type;
			var weapon = kantia.weapons[type][name];
			var skill = this.dat.skills[sname];
			
			dat.av = skill.total - parseInt(weapon.difficulty.base);
			var penalties = kantia.func.armorPenalties(this.dat.armor,["ar","r"]);
			if(type == "melee") {
				dat.av += penalties.ar;
			}
			else if(type == "ranged") {
				dat.av += penalties.r;
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
		var r = t.addRow(["Casting Rank",new db.connector(disc.casting,"rank"),new db.connector(disc.casting,"total")]);
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