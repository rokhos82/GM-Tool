GM.npcINT = function(parent,svc) {
	this.svc = svc;
	this.parent = parent;

	this.name = this.svc.getName();
	this.klass = this.svc.getTemplate();
	this.tag = this.name.replace(/ /g,'').toLowerCase();

	this.ui = new ui.panel(this.name + " - " + this.klass);
	this.panels = {};

	this.ui.addButton("Remove");
	this.ui.addButton("Clone");

	var stats = this.svc.getStats();

	var p = this.ui.addPanel("Notes");
	var desc = this.svc.getDescription();
	var ta = p.addTextArea(new db.connector(desc,"text"));
	ta.addClass("desc_box");
	ta.dom.setAttribute("rows",4);

	var p = this.ui.addPanel("Attributes");
	var attributes = this.svc.getAttributes();
	this.panels.attributes = p;
	p.addClass("small");
	var t = p.addTable();
	t.addClass("attr_table");
	for(var a in attributes) {
		var attr = attributes[a];
		t.addRow([
			attr.name,
			new db.connector(attr,"score");
			new db.view(attr,"adjust");
		]);
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
	t.addRow(["Recovery",stats.stamina.recovery]);
	t.addRow(["Wind",stats.wind.max]);

	var other = this.ui.addPanel("Other");
	this.panels.other = other;
	other.addClass("small");
	var p = other.addPanel("Movement");
	var t = p.addTable();
	t.addRow(["Free",stats.movement.free]);
	t.addRow(["Major",stats.movement.major]);
	t.addRow(["Sprint",stats.movement.sprint]);
};

GM.npcINT.prototype.initialize = function() {
};