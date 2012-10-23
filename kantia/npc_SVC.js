kantia.npcSVC = function(dat,parent) {
	this.dat = dat;
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
	
	// Build the offense section -----------------------
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
		
	var melee = combat.addPanel("Main Hand Weapon");
	this.panels.mainhand = melee;
	melee.addClass("small");
	melee.addButton("Equip",new db.link(this,this.selectWeaponPopup,["melee"]));
	melee.addButton("Remove");
	var t = melee.addTable();
	this.mainframe.addHandler("weapon_update","melee_table",t.refreshView,t,[]);
	t.addRow(["Weapon",new db.connector(this.dat.weapons.melee,"name")]);
	t.addRow(["AV",new db.connector(this.dat.weapons.melee,"av")]);
	t.addRow(["Staging",new db.connector(this.dat.weapons.melee,"staging")]);
	t.addRow(["Attacks",new db.connector(this.dat.weapons.melee,"attacks")]);
	t.addRow(["Damage",new db.connector(this.dat.weapons.melee,"damage")]);
	
	var ranged = combat.addPanel("Ranged Weapon");
	this.panels.ranged = ranged;
	ranged.addClass("small");
	ranged.addButton("Equip",new db.link(this,this.selectWeaponPopup,["ranged"]));
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
		var av = skill.rank * 5;
		var a = skill.attribute;
		var adj = 0;
		if(a != "special")
			adj = this.dat.attributes[a].adjust;
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
	var b = spell.addButton("Add Discipline");
	var disc = spell.addPanel("Discplines");
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
	var attr = this.dat.skills[s].attribute;
	if(attr != "special")
		adj = this.dat.attributes[attr].adjust;
	this.dat.skills[s].adjust = adj;
	this.dat.skills[s].av = av;
	this.dat.skills[s].total = av + adj; 
	this.mainframe.trigger("skill_update");
};

// -------------------------------------------------------------------------------------------------
//
// -------------------------------------------------------------------------------------------------
kantia.npcSVC.prototype.selectWeaponPopup = function(type) {
	var popup = this.ui.addPopup();
	popup.addClass("popup");
	popup.dat = {
		name: "",
		skill: "",
		type: type
	};
	var p = popup.addPanel("Select Weapon");
	var cb = p.addComboBox("Weapon",this.dat.weapons[type].list,new db.connector(popup.dat,"name"));
	cb.updateData();
	var cb = p.addComboBox("Skill",this.dat.skillList,new db.connector(popup.dat,"skill"));
	cb.updateData();
	var b = p.addButton("Ok",new db.link(this,this.selectWeapon,[popup]));
	var b = p.addButton("Cancel",new db.link(this,this.hidePopup,[popup]));
	popup.show();
};

// -------------------------------------------------------------------------------------------------
//
// -------------------------------------------------------------------------------------------------
kantia.npcSVC.prototype.selectWeapon = function(popup) {
	var type = popup.dat.type;
	var name = this.dat.weapons[type].list[popup.dat.name];
	var skill = this.dat.skillList[popup.dat.skill];
	var weapon = kantia.weapons[type][name];
	this.dat.weapons[type].type = type;
	this.dat.weapons[type].name = name;
	this.dat.weapons[type].skill = skill;
	
	this.updateWeapons();
	
	this.hidePopup(popup);
};

// -------------------------------------------------------------------------------------------------
//
// -------------------------------------------------------------------------------------------------
kantia.npcSVC.prototype.hidePopup = function(popup) {
	popup.hide();
	this.ui.removeChild(popup);
};

// -------------------------------------------------------------------------------------------------
//
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
			
			dat.av = skill.total - weapon.difficulty.base;
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
			dat.attacks = Math.round(skill.rank / 3);
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
	popup.dat = {
		name: "",
		rank: 0
	};
	var p = popup.addPanel("Add Discipline");
	p.addTextField("Discpline",new db.connector(popup.dat,"name"));
	p.addTextField("Rank",new db.connector(popup.dat,"rank"));
	p.addButton("Ok",new db.link(this,this.addDiscipline,[popup]));
	p.addButton("Cancel",new db.link(this,this.hidePopup,[popup]));
	
	p.show();
};

// -------------------------------------------------------------------------------------------------
//
// -------------------------------------------------------------------------------------------------
kantia.npcSVC.prototype.addDiscipline = function(popup) {
};