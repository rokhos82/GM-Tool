kantia.npcSVC = function(dat,parent) {
	this.dat = dat;
	this.parent = parent;
	this.children = new Array();
	
	this.ui = new ui.panel(dat.name + " - " + dat.template);
	
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
	this.ui.addButton("Remove");
	
	var stats = this.dat.stats;
	var p = this.ui.addPanel("Effects");
		
	var p = this.ui.addPanel("Attributes");
	p.addClass("small");
	var t = p.addTable();
	t.addClass("attr_table");
	for(var a in this.dat.attributes) {
		var attr = this.dat.attributes[a];
		t.addRow([attr.name,attr.score,attr.adjust]);
	}
	
	var hlth = this.ui.addPanel("Health");
	hlth.addClass("small");
	var p = hlth.addPanel("Hitpoints");
	var t = p.addTable();
	t.addRow(["Bludgeon",stats.health.hitpoints.bludgeon]);
	t.addRow(["Wound",stats.health.hitpoints.wound]);
	
	var p = hlth.addPanel("Stamina");
	var t = p.addTable();
	t.addRow(["Stamina",stats.stamina.max]);
	t.addRow(["Wind",stats.wind.max]);
	
	// Build the defense section
	var defense = this.ui.addPanel("Defense");
	defense.addClass("small");
	var t = defense.addTable();
	t.addRow(["Normal DR",stats.defense.dr]);
	t.addRow(["No Agility DR",stats.defense.noagldr]);
	t.addRow(["Touch DR",stats.defense.touchdr]);
	t.addRow(["Staging",stats.defense.staging]);
	t.addRow(["Absorb",stats.defense.absorb]);
	
	// Build the offense section
	var offense = this.ui.addPanel("Offense");
	offense.addClass("small");
	
	// Build the other section
	var other = this.ui.addPanel("Other");
	other.addClass("small");
	var p = other.addPanel("Movement");
	var t = p.addTable();
	t.addRow(["Free",stats.movement.free]);
	t.addRow(["Major",stats.movement.major]);
	t.addRow(["Sprint",stats.movement.sprint]);
	
	// Build the skills section
	var skills = this.ui.addPanel("Skills");
	var t = skills.addTable();
	t.addClass("attr_table");
	t.addRow(["Skill","AV","Adjust","Total"]);
	for(var s in this.dat.skills) {
		var skill = this.dat.skills[s];
		var av = skill.rank * 5;
		var a = skill.attribute;
		var adj = 0;
		if(a != "special")
			adj = this.dat.attributes[a].adjust;
		t.addRow([skill.name,av,adj,av + adj]);
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
};

kantia.npcSVC.prototype.initialize = function() {
	this.parent.appendNPC(this);
};