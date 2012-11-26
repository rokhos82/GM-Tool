GM.npcINT = function(parent,svc) {
	this.svc = svc;
	this.parent = parent;
	this.mainframe = this.svc.mainframe;

	this.name = this.svc.getName();
	this.klass = this.svc.getTemplate();
	this.tag = this.svc.getTag();

	this.ui = new ui.panel(this.name + " - " + this.klass);
	this.panels = {};

	this.ui.addButton("Remove",new db.link(this.svc,this.svc.remove,[]));
	this.ui.addButton("Clone");

	this.anchor = this.ui.addAnchor(null,this.tag,null);

	var stats = this.svc.getData("stats");

	// Populate the notes section ----------------------
	var p = this.ui.addPanel("Notes");
	var ta = p.addTextArea(this.svc.getDataObject("description"));
	ta.addClass("desc_box");
	ta.dom.setAttribute("rows",4);

	// Build the attributes section --------------------
	var p = this.ui.addPanel("Attributes");
	var attributes = this.svc.getData("attributes");
	this.panels.attributes = p;
	p.addClass("small");
	var t = p.addTable();
	t.addClass("attr_table");
	for(var a in attributes) {
		var attr = attributes[a];
		var row = t.addRow([
			attr.name,
			new db.connector(attr,"score"),
			new db.view(attr,"adjust")
		]);
		row.cells[1].children[0].setUpdate(this.svc,this.svc.updateAttribute,[a]);
		this.mainframe.addHandler(a + "Update","attributeAdjust",row.cells[2].children[0].refreshView,row.cells[2].children[0],[]);
	}

	// Build the health section ------------------------
	var hlth = this.ui.addPanel("Health");
	this.panels.health = hlth;
	hlth.addClass("small");
	var p = hlth.addPanel("Hitpoints");
	var t = p.addTable();
	var row = t.addRow(["Bludgeon",new db.view(stats.health.hitpoints,"bludgeon")]);
	this.mainframe.addHandler("updateHitpoints","bludgeonPoints",row.cells[1].children[0].refreshView,row.cells[1].children[0],[]);
	var row = t.addRow(["Wound",new db.view(stats.health.hitpoints,"wound")]);
	this.mainframe.addHandler("updateHitpoints","woundPoints",row.cells[1].children[0].refreshView,row.cells[1].children[0],[]);

	var p = hlth.addPanel("Stamina");
	var t = p.addTable();
	this.mainframe.addHandler("updateStamina","staminaTable",t.refreshView,t,[]);
	var row = t.addRow(["Max",new db.view(stats.stamina,"max")]);
	var row = t.addRow(["Recovery",new db.view(stats.stamina,"recovery")]);
	var row = t.addRow(["Wind",new db.view(stats.wind,"max")]);

	// Build the other section -------------------------
	var other = this.ui.addPanel("Other");
	this.panels.other = other;
	other.addClass("small");
	var p = other.addPanel("Movement");
	var t = p.addTable();
	this.mainframe.addHandler("updateMovement","moveTable",t.refreshView,t,[]);
	t.addRow(["Free",new db.view(stats.movement,"free")]);
	t.addRow(["Major",new db.view(stats.movement,"major")]);
	t.addRow(["Sprint",new db.view(stats.movement,"sprint")]);

	var traits = other.addPanel("Traits");
	traits.addClass("small");
	var l = traits.addTable();
	this.panels.traits = l;
	this.refreshTraits();
	this.mainframe.addHandler("traitUpdate","traitTable",this.refreshTraits,this,[]);
	traits.addButton("+",new db.link(this,this.addTraitPopup,[]));

	// Build the HC section ---------------------------
	var hc = this.ui.addPanel("HC");
	hc.addClass("small");
	var t = hc.addTable();
	this.panels.hc = t;
	this.refreshHC();
	this.mainframe.addHandler("HCUpdate","HCTable",this.refreshHC,this,[])
	var b = hc.addButton("+",new db.link(this,this.addHCPopup,[]));
	
	// Build the combat section -----------------------
	var combat = this.ui.addPanel("Combat");
	
	var defense = combat.addPanel("Defense");
	this.panels.defense = defense;
	defense.addClass("small");
	var t = defense.addTable();
	this.mainframe.addHandler("updateDefense","def_table",t.refreshView,t,[]);
	t.addCustomRow([new ui.text("Normal DR"),new ui.text(new db.view(stats.defense,"dr"))]);
	t.addCustomRow([new ui.text("No Agility DR"),new ui.text(new db.view(stats.defense,"noagldr"))]);
	t.addCustomRow([new ui.text("Touch DR"),new ui.text(new db.view(stats.defense,"touchdr"))]);
	t.addCustomRow([new ui.text("Staging"),new ui.text(new db.view(stats.defense,"staging"))]);
	t.addCustomRow([new ui.text("Absorb"),new ui.text(new db.view(stats.defense,"absorb"))]);

	// Build the armor section
	var armor = combat.addPanel("Armor");
	armor.addClass("small");
	var t = armor.addTable();
	this.mainframe.addHandler("updateArmor","armorTable",t.refreshView,t,[]);
	t.addClass("attr_table");
	t.addRow(["Slot","Armor","DR","Called Shot","Staging","Absorb","Bypass"]);
	var armorObj = this.svc.getData("armor");
	for(var a in armorObj) {
		var armor = armorObj[a];
		var r = [];
		r.push(new ui.text(a));
		r.push(new ui.text(new db.view(armor,"name")));
		r.push(new ui.text(new db.view(armor,"deflect")));
		r.push(new ui.text(new db.view(armor,"calledshot")));
		r.push(new ui.text(new db.view(armor,"staging")));
		r.push(new ui.text(new db.view(armor,"absorb")));
		r.push(new ui.text(new db.view(armor,"bypass")));
		r.push(new ui.button("+",new db.link(this,this.addArmorPopup,[a])));
		r.push(new ui.button("X",new db.link(this.svc,this.svc.removeArmor,[a])));
		t.addCustomRow(r);
	}
	this.svc.updateDefense();

	// Build the combat av section
	var cav = this.ui.addPanel("Combat AVs");
	cav.addClass("small");
	var t = cav.addTable();
	t.addClass("attr_table");
	this.mainframe.addHandler("updateWeapon","weap_table",t.refreshView,t,[]);
	t.addRow(["Slot","Weapon/Skill","Actions","1st","2nd","3rd","4th","5th","Staging","Damage"]);
	var weapons = this.svc.getData("weapons");
	for(var w in weapons) {
		var weap = weapons[w];
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
			new ui.button("X",new db.link(this.svc,this.svc.removeWeapon,[w]))
		];
		t.addCustomRow(r);
	}

	var mastery = this.ui.addPanel("Mastery");
	mastery.addClass("small");
	var t = mastery.addTable();
	t.addClass("attr_table");
	this.panels.mastery = t;
	//this.refreshMastery();
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
	var skillsList = this.svc.getList("skills");
	var skills = this.svc.getData("skills");
	var l = skillsList.length;
	var shift = Math.ceil(l/2);
	for(var i = 0;i < shift;i++) {
		var name1 = skillsList[i];
		var skill1 = skills[name1];
		var r = t1.addRow([skill1.name,new db.connector(skill1,"rank"),new db.view(skill1,"total")]);
		var c = r.cells[1].children[0];
		c.setUpdate(this,this.svc.updateSkill,[name1,c]);

		if(i + shift < l) {
			var name2 = skillsList[i + shift];
			var skill2 = skills[name2];
			var r = t2.addRow([
				skill2.name,
				new db.connector(skill2,"rank"),
				new db.view(skill2,"total")
			]);
			var c = r.cells[1].children[0];
			c.setUpdate(this,this.svc.updateSkill,[name2,c]);
		}
	}
	
	// Build the spell section
	var spell = this.ui.addPanel("Magic");
	var t = spell.addText(this.svc.getData("magic").text);
	t.addClass("block");
	var b = spell.addButton("Add Discipline",new db.link(this,this.addDisciplinePopup,[]));
	var disc = spell.addPanel();
	this.panels.disciplines = disc;
	this.mainframe.addHandler("updateDisciplines","disc_table",disc.refreshView,disc,[]);
	this.mainframe.addHandler("updateDisciplines","refresh",this.refreshDisciplines,this,[]);
	this.refreshDisciplines();
};

// -------------------------------------------------------------------------------------------------
// initialize
// -------------------------------------------------------------------------------------------------
GM.npcINT.prototype.initialize = function() {
	this.parent.appendChild(this);
};

GM.npcINT.prototype.detach = function() {
	GM.debug.log("CALL: GM.npcINT.detach","Removing interface from parent",2);
	this.ui.parent.removeChild(this.ui);
};

// -------------------------------------------------------------------------------------------------
// selectWeaponPopup
// -------------------------------------------------------------------------------------------------
GM.npcINT.prototype.selectWeaponPopup = function(slot) {
	var popup = this.ui.addPopup("popup","fog");
	popup.show();
	var type = "melee";
	if(slot == "ranged")
		type = "ranged";
	
	var dat = {
		name: "",
		skill: "",
		type: type,
		slot: slot
	};

	var p = popup.addPanel("Select Weapon");
	var cb = p.addComboBox("Weapon",this.svc.getList(type),new db.connector(dat,"name"));
	cb.updateData();
	cb.focus();
	var cb = p.addComboBox("Skill",this.svc.getList("skills"),new db.connector(dat,"skill"));
	cb.updateData();
	var seq = new db.sequence();
	seq.addAction("select",new db.sequence.action(this.svc,this.svc.selectWeapon,[dat]));
	seq.addAction("close",new db.sequence.action(this,this.hidePopup,[popup]));
	var b = p.addButton("Ok",seq);
	var b = p.addButton("Cancel",new db.link(this,this.hidePopup,[popup]));
};

// -------------------------------------------------------------------------------------------------
// hidePopup
// -------------------------------------------------------------------------------------------------
GM.npcINT.prototype.hidePopup = function(popup) {
	popup.hide();
	this.ui.removeChild(popup);
};

// -------------------------------------------------------------------------------------------------
// addDisciplinePopup
// -------------------------------------------------------------------------------------------------
GM.npcINT.prototype.addDisciplinePopup = function() {
	var popup = this.ui.addPopup();
	popup.show();
	popup.addClass("popup");
	popup.setOverlayClass("fog");
	var dat = {
		name: "",
		rank: 0,
	};

	var p = popup.addPanel("Add Discipline");
	var cb = p.addComboBox("Discipline",null,new db.connector(dat,"name"));
	cb.setComplexOptions(kantia.disciplineList);
	cb.updateData();
	cb.focus();
	p.addTextField("Rank",new db.connector(dat,"rank"));
	var seq = new db.sequence();
	seq.addAction("add",new db.sequence.action(this.svc,this.svc.addDiscipline,[dat]));
	seq.addAction("close",new db.sequence.action(this,this.hidePopup,[popup]));
	p.addButton("Ok",seq);
	p.addButton("Cancel",new db.link(this,this.hidePopup,[popup]));
};

// -------------------------------------------------------------------------------------------------
// refreshDisciplines - rebuilds the UI elements for the disciplines.
// -------------------------------------------------------------------------------------------------
GM.npcINT.prototype.refreshDisciplines = function() {
	this.panels.disciplines.removeChildren();
	
	var disciplines = this.svc.getData("magic").disciplines;
	for(var d in disciplines) {
		var panel = this.panels.disciplines.addPanel(d);
		var disc = disciplines[d];
		panel.addButton("Remove");
		var t = panel.addTable();
		var r = t.addRow([
			"Disc Rank",
			new db.connector(disc,"rank")
		]);
		r.cells[1].children[0].setUpdate(this,this.updateSpells,[d]);
		var r = t.addRow([
			"Casting Rank",
			new db.connector(disc.casting,"rank"),
			new db.connector(disc.casting,"total")
		]);
		r.cells[1].children[0].setUpdate(this,this.updateDiscipline,[d,r.cells[1].children[0]]);
		panel.addButton("Add Spell",new db.link(this,this.addSpellPopup,[disc.discipline]));
		var p = panel.addPanel("Spells");
		this.refreshSpells(d,p);
	}
	
	this.mainframe.trigger("disc_update");
};

// -------------------------------------------------------------------------------------------------
// addSpellPopup - setups and displays the popup used to add a spell to a discipline.
// -------------------------------------------------------------------------------------------------
GM.npcINT.prototype.addSpellPopup = function(disc) {
	var popup = this.ui.addPopup();
	popup.addClass("popup");
	popup.setOverlayClass("fog");
	popup.show();
	var dat = {
		discipline: disc,
		spell: "",
		rank: 0
	};

	var p = popup.addPanel("Add Spell - " + disc);
	var cb = p.addComboBox("Spells",kantia.spellList[disc],new db.connector(dat,"spell"));
	cb.updateData();
	cb.focus();
	p.addTextField("Rank",new db.connector(dat,"rank"));
	var seq = new db.sequence();
	seq.addAction("add",new db.sequence.action(this.svc,this.svc.addSpell,[dat]));
	seq.addAction("close",new db.sequence.action(this,this.hidePopup,[popup]));
	p.addButton("Ok",seq);
	p.addButton("Cancel",new db.link(this,this.hidePopup,[popup]));
};

// -------------------------------------------------------------------------------------------------
// refreshSpells - this function refreshes the spell listing for the specified discipline.
// -------------------------------------------------------------------------------------------------
GM.npcINT.prototype.refreshSpells = function(disc,panel) {
	var discipline = this.svc.getData("magic").disciplines[disc];

	panel.removeChildren();
	var t = panel.addTable();
	t.addClass("attr_table");
	t.addRow(["Name","Rank","Power"]);
	for(var s in discipline.spells) {
		var spell = discipline.spells[s];
		var r = t.addRow([
			spell.name,
			new db.connector(spell,"rank"),
			new db.view(spell,"power")
		]);
		r.cells[1].children[0].setUpdate(this,this.updateSpellRank,[disc,spell,r.cells[1].children[0]]);
	}
	this.mainframe.addHandler(disc + "_spell_update",disc + "_spell_table",t.refreshView,t,[]);
};

// -------------------------------------------------------------------------------------------------
// addTraitPopup
// -------------------------------------------------------------------------------------------------
GM.npcINT.prototype.addTraitPopup = function() {
	GM.debug.log("CALL: GM.npcINT.addTraitPopup","Building add trait popup",2);
	var popup = this.ui.addPopup();
	popup.addClass("popup");
	popup.setOverlayClass("fog");
	popup.show();
	var dat = {
		index: 0
	};
	var p = popup.addPanel("Add Trait");
	var cb = p.addComboBox("Trait",this.svc.getList("traits"),new db.connector(dat,"index"));
	cb.focus();
	var seq = new db.sequence();
	seq.addAction("add",new db.sequence.action(this.svc,this.svc.addTrait,[dat]));
	seq.addAction("close",new db.sequence.action(this,this.hidePopup,[popup]));
	p.addButton("Ok",seq);
	p.addButton("Cancel",new db.link(this,this.hidePopup,[popup]));
};

// -------------------------------------------------------------------------------------------------
// refreshTraits
// -------------------------------------------------------------------------------------------------
GM.npcINT.prototype.refreshTraits = function() {
	GM.debug.log("CALL: GM.npcINT.refreshTraits","Rebuilding traits table",2);
	var l = this.panels.traits;
	l.removeRows();
	for(var t in this.svc.getData("traits")) {
		l.addCustomRow([
			new ui.text(t),
			new ui.button("X",new db.link(this.svc,this.svc.removeTrait,[t]))
		]);
	}
};

// -------------------------------------------------------------------------------------------------
//
// -------------------------------------------------------------------------------------------------
GM.npcINT.prototype.addArmorPopup = function(slot) {
	var popup = this.ui.addPopup("popup","fog");
	var dat = {
		index: 0,
		slot: slot
	};
	popup.show();
	var p = popup.addPanel("Add Armor");
	var cb = p.addComboBox("Armor",kantia.lists.armor[slot],new db.connector(dat,"index"));
	cb.updateData();
	cb.focus();
	var seq = new db.sequence();
	seq.addAction("add",new db.sequence.action(this.svc,this.svc.addArmor,[dat]));
	seq.addAction("close",new db.sequence.action(this,this.hidePopup,[popup]));
	p.addButton("Ok",seq);
	p.addButton("Cancel",new db.link(this,this.hidePopup,[popup]));
};

// -------------------------------------------------------------------------------------------------
//
// -------------------------------------------------------------------------------------------------
GM.npcINT.prototype.addHCPopup = function() {
	var hc_dat = {
		index: 0,
		rank: 0
	};
	var popup = this.ui.addPopup("popup","fog");
	popup.show();
	
	var p = popup.addPanel("Add Heroic Characteristic");
	var cb = p.addComboBox("HC",this.svc.getList("hc"),new db.connector(hc_dat,"index"));
	cb.focus();
	var tf = p.addTextField("Rank",new db.connector(hc_dat,"rank"));
	
	var seq = new db.sequence();
	seq.addAction("addhc",new db.sequence.action(this.svc,this.svc.addHC,[hc_dat]));
	seq.addAction("hide",new db.sequence.action(this,this.hidePopup,[popup]));
	p.addButton("Ok",seq);
	p.addButton("Cancel",new db.link(this,this.hidePopup,[popup]));
};

// -------------------------------------------------------------------------------------------------
//
// -------------------------------------------------------------------------------------------------
GM.npcINT.prototype.refreshHC = function() {
	this.panels.hc.removeRows();
	var hc_dat = this.svc.getData("hc");
	for(var h in hc_dat) {
		this.panels.hc.addCustomRow([
			new ui.text(h + " - " + hc_dat[h]),
			new ui.button("X",new db.link(this.svc,this.svc.removeHC,[h]))
		]);
	}
};

// -------------------------------------------------------------------------------------------------
//
// -------------------------------------------------------------------------------------------------
GM.npcINT.prototype.addMasteryPopup = function() {
	var mastery_dat = {
		index: 0,
		rank: 1
	};
	var popup = this.ui.addPopup();
	popup.addClass("popup");
	popup.setOverlayClass("fog");
	popup.show();
	
	var p = popup.addPanel("Add Mastery");
	var cb = p.addComboBox("Mastery",this.svc.getList("mastery"),new db.connector(mastery_dat,"index"));
	cb.focus();
	var tf = p.addTextField("Rank",new db.connector(mastery_dat,"rank"));

	var seq = new db.sequence();
	seq.addAction("add_mastery",new db.sequence.action(this.svc,this.svc.addMastery,[mastery_dat]));
	seq.addAction("hide",new db.sequence.action(this,this.hidePopup,[popup]));
	p.addButton("Ok",seq);
	p.addButton("Cancel",new db.link(this,this.hidePopup,[popup]));
};

// -------------------------------------------------------------------------------------------------
//
// -------------------------------------------------------------------------------------------------
GM.npcINT.prototype.refreshMastery = function() {
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