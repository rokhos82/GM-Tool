// -------------------------------------------------------------------------------------------------
// characterSVC
// -------------------------------------------------------------------------------------------------
kantia.characterSVC = function(dat,mainframe) {
	this.dat = dat;
	this.mainframe = new lib.mainframe();
	this.mainframe.setParentFrame = mainframe;
};

// -------------------------------------------------------------------------------------------------
// initializeForm
// -------------------------------------------------------------------------------------------------
kantia.characterSVC.prototype.initializeForm = function(root) {
	var u = new ui.updater();
	this.popups = new Array();
	this.root = root;
	this.form = new ui.form("Character");
	this.form.setParent(root);
	//this.form.setUpdater(u);
	this.form.setMainframe(this.mainframe);
	root.appendChild(this.form.dom);
	
	// Build the tools button bar
	var f = this.form.addForm("Tools");
	var pta = this.addPopup("pta");
	f.addButton("PTA",new db.link(this,this.showPTA,pta));
	var p = this.addPopup("spell");
	f.addButton("Spells",new db.link(p,p.show,{}));
	
	// Build the Press the Attack calculator
	var f = pta.addForm("Press the Attack");
	f.setMainframe(this.mainframe);
	var s = f.addForm();
	var cmb = s.addComboBox("Weapon Skill:",kantia.func.skillArray(this.dat.skills),new db.connector(pta.dat,"skill"));
	cmb.setUpdate(this,this.updatePTASkill,pta.dat);
	cmb.updateData();
	var t = s.addTable();
	t.addRow(["","Adjust","Base","Final","Cost"]);
	
	var r = new Array();
	r.push(new ui.label("Staging"));
	pta.dat.staging = 0;
	var a = new ui.textField(null,new db.connector(pta.dat,"staging"),false);
	a.setUpdate(this,this.updatePressingTheAttack,pta.dat);
	this.mainframe.addHandler("ptaUpdate","staging",a.refreshView,a);
	r.push(a);
	var b = new ui.textField(null,new db.connector(this.dat.stats.offense,"staging"),true);
	this.mainframe.addHandler("offenseUpdate","pta_staging",b.refreshView,b);
	r.push(b);
	var sources = new Array(new db.accumulator.sources.ui(a),new db.accumulator.sources.ui(b));
	var c = new ui.textField(null,new db.accumulator(db.accumulator.ops["+"],sources),true);
	this.mainframe.addHandler("offenseUpdate","staging_total",c.refreshView,c);
	this.mainframe.addHandler("ptaUpdate","staging_total",c.refreshView,c);
	r.push(c);
	r.push(new ui.label("1 STAM/staging"));
	t.addCustomRow(r);
	
	var r = new Array();
	r.push(new ui.label("Damage"));
	pta.dat.damage = 0;
	var a = new ui.textField(null,new db.connector(pta.dat,"damage"),false);
	a.setUpdate(this,this.updatePressingTheAttack,pta.dat);
	this.mainframe.addHandler("ptaUpdate","damage",a.refreshView,a);
	r.push(a);
	var b = new ui.textField(null,new db.connector(this.dat.stats.offense,"damage"),true);
	r.push(b);
	var sources = new Array(new db.accumulator.sources.ui(a),new db.accumulator.sources.ui(b));
	var c = new ui.textField(null,new db.accumulator(db.accumulator.ops["+"],sources),true);
	this.mainframe.addHandler("ptaUpdate","damage_total",c.refreshView,c);
	r.push(c);
	r.push(new ui.label("4 STAM/damage"));
	t.addCustomRow(r);
	
	var r = new Array();
	r.push(new ui.label("Hit AV"));
	pta.dat.av = 0;
	var a = new ui.textField(null,new db.connector(pta.dat,"av"),false);
	a.setUpdate(this,this.updatePressingTheAttack,pta.dat);
	this.mainframe.addHandler("ptaUpdate","av",a.refreshView,a);
	r.push(a);
	var b = new ui.textField(null,new db.connector(pta.dat,"skillav"),true);
	this.mainframe.addHandler("ptaUpdate","skillav",b.refreshView,b);
	r.push(b);
	var sources = new Array(new db.accumulator.sources.ui(a),new db.accumulator.sources.ui(b));
	var c = new ui.textField(null,new db.accumulator(db.accumulator.ops["+"],sources),true);
	this.mainframe.addHandler("ptaUpdate","av_total",c.refreshView,c);
	r.push(c);
	r.push(new ui.label("6 STAM/5 AV"));
	t.addCustomRow(r);
	
	s.addTextField("Current Wind:",new db.connector(this.dat.stats.wind,"current"),true);
	s.addTextField("Current Stamina:",new db.connector(this.dat.stats.stamina,"current"),true);
	pta.dat.total = 0;
	var c = s.addTextField("Total Cost:",new db.connector(pta.dat,"total"),true);
	this.mainframe.addHandler("ptaUpdate","total_cost",c.refreshView,c);
	s.addButton("Close",new db.link(pta,pta.hide,{}));
	
	
	// Build the main character sheet.
	var tf = this.form.addTextField("Name",new db.connector(this.dat,"name"));
	tf.setTabIndex(1);
	var cb = this.form.addComboBox("Race",kantia.races,new db.connector(this.dat,"race"));
	cb.setUpdate(this,this.updateRace);
	cb.setTabIndex(2);
	
	// Build the attributes table.
	var t = this.form.addTable();
	t.addRow(["Attribute","Base","Modifier","Rank","AV","Adjust"]);
	var r = new Array();
	
	// Build the strength row.
	r.push(new ui.label("Strength"));
	var c = new ui.textField(null,new db.connector(this.dat.attributes.strength,"base"),false);
	c.setUpdate(this,kantia.characterSVC.prototype.updateAttribute,"strength");
	c.setTabIndex(3);
	r.push(c);
	c = new ui.textField(null,new db.connector(this.dat.attributes.strength,"modifier"),true);
	this.mainframe.addHandler("raceUpdate","str_mod",c.refreshView,c);
	r.push(c);
	c = new ui.textField(null,new db.connector(this.dat.attributes.strength,"score"),true);
	this.mainframe.addHandler("strengthUpdate","str_ttl",c.refreshView,c);
	this.mainframe.addHandler("raceUpdate","str_ttl",c.refreshView,c);
	r.push(c);
	c = new ui.textField(null,new db.connector(this.dat.attributes.strength,"av"),true);
	this.mainframe.addHandler("strengthUpdate","str_av",c.refreshView,c);
	r.push(c);
	c = new ui.textField(null,new db.connector(this.dat.attributes.strength,"adjust"),true);
	this.mainframe.addHandler("strengthUpdate","str_adj",c.refreshView,c);
	r.push(c);
	t.addCustomRow(r);
	
	// Build the size row.
	r = new Array();
	r.push(new ui.label("Size"));
	c = new ui.textField(null,new db.connector(this.dat.attributes.size,"base"),false);
	c.setUpdate(this,kantia.characterSVC.prototype.updateAttribute,"size");
	c.setTabIndex(4);
	r.push(c);
	c = new ui.textField(null,new db.connector(this.dat.attributes.size,"modifier"),true);
	this.mainframe.addHandler("raceUpdate","siz_mod",c.refreshView,c);
	r.push(c);
	c = new ui.textField(null,new db.connector(this.dat.attributes.size,"score"),true);
	this.mainframe.addHandler("sizeUpdate","siz_ttl",c.refreshView,c);
	this.mainframe.addHandler("raceUpdate","siz_ttl",c.refreshView,c);
	r.push(c);
	c = new ui.textField(null,new db.connector(this.dat.attributes.size,"av"),true);
	this.mainframe.addHandler("sizeUpdate","siz_av",c.refreshView,c);
	r.push(c);
	c = new ui.textField(null,new db.connector(this.dat.attributes.size,"adjust"),true);
	this.mainframe.addHandler("sizeUpdate","siz_adj",c.refreshView,c);
	r.push(c);
	t.addCustomRow(r);
	
	// Build the agility row.
	r = new Array();
	r.push(new ui.label("Agility"));
	c = new ui.textField(null,new db.connector(this.dat.attributes.agility,"base"),false);
	c.setUpdate(this,this.updateAttribute,"agility");
	c.setTabIndex(5);
	r.push(c);
	c = new ui.textField(null,new db.connector(this.dat.attributes.agility,"modifier"),true);
	this.mainframe.addHandler("raceUpdate","agl_mod",c.refreshView,c);
	r.push(c);
	c = new ui.textField(null,new db.connector(this.dat.attributes.agility,"score"),true);
	this.mainframe.addHandler("agilityUpdate","agl_ttl",c.refreshView,c);
	this.mainframe.addHandler("raceUpdate","agl_ttl",c.refreshView,c);
	r.push(c);
	c = new ui.textField(null,new db.connector(this.dat.attributes.agility,"av"),true);
	this.mainframe.addHandler("agilityUpdate","agl_av",c.refreshView,c);
	r.push(c);
	c = new ui.textField(null,new db.connector(this.dat.attributes.agility,"adjust"),true);
	this.mainframe.addHandler("agilityUpdate","agl_adj",c.refreshView,c);
	r.push(c);
	t.addCustomRow(r);
	
	// Build the reflexes row.
	r = new Array();
	r.push(new ui.label("Relfexes"));
	c = new ui.textField(null,new db.connector(this.dat.attributes.reflexes,"base"),false);
	c.setUpdate(this,this.updateAttribute,"reflexes");
	c.setTabIndex(6);
	r.push(c);
	c = new ui.textField(null,new db.connector(this.dat.attributes.reflexes,"modifier"),false);
	this.mainframe.addHandler("raceUpdate","ref_mod",c.refreshView,c);
	r.push(c);
	c = new ui.textField(null,new db.connector(this.dat.attributes.reflexes,"score"),false);
	this.mainframe.addHandler("reflexesUpdate","ref_ttl",c.refreshView,c);
	this.mainframe.addHandler("raceUpdate","ref_ttl",c.refreshView,c);
	r.push(c);
	c = new ui.textField(null,new db.connector(this.dat.attributes.reflexes,"av"),true);
	this.mainframe.addHandler("reflexesUpdate","ref_av",c.refreshView,c);
	r.push(c);
	c = new ui.textField(null,new db.connector(this.dat.attributes.reflexes,"adjust"),true);
	this.mainframe.addHandler("reflexesUpdate","ref_adj",c.refreshView,c);
	r.push(c);
	t.addCustomRow(r);
	
	// Build the constitution row.
	r = new Array();
	r.push(new ui.label("Constitution"));
	c = new ui.textField(null,new db.connector(this.dat.attributes.constitution,"base"),false);
	c.setUpdate(this,this.updateAttribute,"constitution");
	c.setTabIndex(7);
	r.push(c);
	c = new ui.textField(null,new db.connector(this.dat.attributes.constitution,"modifier"),false);
	this.mainframe.addHandler("raceUpdate","con_mod",c.refreshView,c);
	r.push(c);
	c = new ui.textField(null,new db.connector(this.dat.attributes.constitution,"score"),false);
	this.mainframe.addHandler("constitutionUpdate","con_ttl",c.refreshView,c);
	this.mainframe.addHandler("raceUpdate","con_ttl",c.refreshView,c);
	r.push(c);
	c = new ui.textField(null,new db.connector(this.dat.attributes.constitution,"av"),true);
	this.mainframe.addHandler("constitutionUpdate","con_av",c.refreshView,c);
	r.push(c);
	c = new ui.textField(null,new db.connector(this.dat.attributes.constitution,"adjust"),true);
	this.mainframe.addHandler("constitutionUpdate","con_adj",c.refreshView,c);
	r.push(c);
	t.addCustomRow(r);
	
	// Build the fortitude row.
	r = new Array();
	r.push(new ui.label("Fortitude"));
	c = new ui.textField(null,new db.connector(this.dat.attributes.fortitude,"base"),false);
	c.setUpdate(this,this.updateAttribute,"fortitude");
	c.setTabIndex(8);
	r.push(c);
	c = new ui.textField(null,new db.connector(this.dat.attributes.fortitude,"modifier"),false);
	this.mainframe.addHandler("raceUpdate","for_mod",c.refreshView,c);
	r.push(c);
	c = new ui.textField(null,new db.connector(this.dat.attributes.fortitude,"score"),false);
	this.mainframe.addHandler("fortitudeUpdate","for_ttl",c.refreshView,c);
	this.mainframe.addHandler("raceUpdate","for_ttl",c.refreshView,c);
	r.push(c);
	c = new ui.textField(null,new db.connector(this.dat.attributes.fortitude,"av"),true);
	this.mainframe.addHandler("fortitudeUpdate","for_av",c.refreshView,c);
	r.push(c);
	c = new ui.textField(null,new db.connector(this.dat.attributes.fortitude,"adjust"),true);
	this.mainframe.addHandler("fortitudeUpdate","for_adj",c.refreshView,c);
	r.push(c);
	t.addCustomRow(r);
	
	// Build the reasoning row.
	r = new Array();
	r.push(new ui.label("Reasoning"));
	c = new ui.textField(null,new db.connector(this.dat.attributes.reasoning,"base"),false);
	c.setUpdate(this,this.updateAttribute,"reasoning");
	c.setTabIndex(9);
	r.push(c);
	c = new ui.textField(null,new db.connector(this.dat.attributes.reasoning,"modifier"),false);
	this.mainframe.addHandler("raceUpdate","rea_mod",c.refreshView,c);
	r.push(c);
	c = new ui.textField(null,new db.connector(this.dat.attributes.reasoning,"score"),false);
	this.mainframe.addHandler("reasoningUpdate","rea_ttl",c.refreshView,c);
	this.mainframe.addHandler("raceUpdate","rea_ttl",c.refreshView,c);
	r.push(c);
	c = new ui.textField(null,new db.connector(this.dat.attributes.reasoning,"av"),true);
	this.mainframe.addHandler("reasoningUpdate","rea_av",c.refreshView,c);
	r.push(c);
	c = new ui.textField(null,new db.connector(this.dat.attributes.reasoning,"adjust"),true);
	this.mainframe.addHandler("reasoningUpdate","rea_adj",c.refreshView,c);
	r.push(c);
	t.addCustomRow(r);
	
	// Build the willpower row.
	r = new Array();
	r.push(new ui.label("Willpower"));
	c = new ui.textField(null,new db.connector(this.dat.attributes.willpower,"base"),false);
	c.setUpdate(this,this.updateAttribute,"willpower");
	c.setTabIndex(10);
	r.push(c);
	c = new ui.textField(null,new db.connector(this.dat.attributes.willpower,"modifier"),false);
	this.mainframe.addHandler("raceUpdate","wil_mod",c.refreshView,c);
	r.push(c);
	c = new ui.textField(null,new db.connector(this.dat.attributes.willpower,"score"),false);
	this.mainframe.addHandler("willpowerUpdate","wil_ttl",c.refreshView,c);
	this.mainframe.addHandler("raceUpdate","wil_ttl",c.refreshView,c);
	r.push(c);
	c = new ui.textField(null,new db.connector(this.dat.attributes.willpower,"av"),true);
	this.mainframe.addHandler("willpowerUpdate","wil_av",c.refreshView,c);
	r.push(c);
	c = new ui.textField(null,new db.connector(this.dat.attributes.willpower,"adjust"),true);
	this.mainframe.addHandler("willpowerUpdate","wil_adj",c.refreshView,c);
	r.push(c);
	t.addCustomRow(r);
	
	// Build the spirit row.
	r = new Array();
	r.push(new ui.label("Spirit"));
	c = new ui.textField(null,new db.connector(this.dat.attributes.spirit,"base"),false);
	c.setUpdate(this,this.updateAttribute,"spirit");
	c.setTabIndex(11);
	r.push(c);
	c = new ui.textField(null,new db.connector(this.dat.attributes.spirit,"modifier"),false);
	this.mainframe.addHandler("raceUpdate","spr_mod",c.refreshView,c);
	r.push(c);
	c = new ui.textField(null,new db.connector(this.dat.attributes.spirit,"score"),false);
	this.mainframe.addHandler("spiritUpdate","spr_ttl",c.refreshView,c);
	this.mainframe.addHandler("raceUpdate","spr_ttl",c.refreshView,c);
	r.push(c);
	c = new ui.textField(null,new db.connector(this.dat.attributes.spirit,"av"),true);
	this.mainframe.addHandler("spiritUpdate","spr_av",c.refreshView,c);
	r.push(c);
	c = new ui.textField(null,new db.connector(this.dat.attributes.spirit,"adjust"),true);
	this.mainframe.addHandler("spiritUpdate","spr_adj",c.refreshView,c);
	r.push(c);
	t.addCustomRow(r);
	
	// Build the preception row.
	r = new Array();
	r.push(new ui.label("Perception"));
	c = new ui.textField(null,new db.connector(this.dat.attributes.perception,"base"),false);
	c.setUpdate(this,this.updateAttribute,"perception");
	c.setTabIndex(12);
	r.push(c);
	c = new ui.textField(null,new db.connector(this.dat.attributes.perception,"modifier"),false);
	this.mainframe.addHandler("raceUpdate","per_mod",c.refreshView,c);
	r.push(c);
	c = new ui.textField(null,new db.connector(this.dat.attributes.perception,"score"),false);
	this.mainframe.addHandler("perceptionUpdate","per_ttl",c.refreshView,c);
	this.mainframe.addHandler("raceUpdate","per_ttl",c.refreshView,c);
	r.push(c);
	c = new ui.textField(null,new db.connector(this.dat.attributes.perception,"av"),true);
	this.mainframe.addHandler("perceptionUpdate","per_av",c.refreshView,c);
	r.push(c);
	c = new ui.textField(null,new db.connector(this.dat.attributes.perception,"adjust"),true);
	this.mainframe.addHandler("perceptionUpdate","per_adj",c.refreshView,c);
	r.push(c);
	t.addCustomRow(r);
	
	// Build stats subform
	var f = this.form.addForm("Stats");
	f.addClass("stats");
	var t = f.addTable();
	t.addRow(["Health","Max","Remaining"]);
	r = new Array();
	r.push(new ui.label("Wound Points"));
	c = new ui.textField(null,new db.connector(this.dat.stats.health.hitpoints,"wound"),true);
	this.mainframe.addHandler("raceUpdate","wound_points",c.refreshView,c);
	this.mainframe.addHandler("sizeUpdate","wound_points",c.refreshView,c);
	this.mainframe.addHandler("fortitudeUpdate","wound_points",c.refreshView,c);
	this.mainframe.addHandler("constitutionUpdate","wound_points",c.refreshView,c);
	this.mainframe.addHandler("willpowerUpdate","wound_points",c.refreshView,c);
	r.push(c);
	t.addCustomRow(r);
	r = new Array();
	r.push(new ui.label("Bludgeon Points"));
	c = new ui.textField(null,new db.connector(this.dat.stats.health.hitpoints,"bludgeon"),true);
	this.mainframe.addHandler("raceUpdate","bludgeon_points",c.refreshView,c);
	this.mainframe.addHandler("sizeUpdate","bludgeon_points",c.refreshView,c);
	this.mainframe.addHandler("fortitudeUpdate","bludgeon_points",c.refreshView,c);
	this.mainframe.addHandler("constitutionUpdate","bludgeon_points",c.refreshView,c);
	this.mainframe.addHandler("willpowerUpdate","bludgeon_points",c.refreshView,c);
	r.push(c);
	t.addCustomRow(r);
	r = new Array();
	r.push(new ui.label("Stun/Pain Threshold"));
	c = new ui.textField(null,new db.connector(this.dat.stats.health.stunpain,"threshold"),true);
	this.mainframe.addHandler("raceUpdate","sp_threshold",c.refreshView,c);
	this.mainframe.addHandler("sizeUpdate","sp_threshold",c.refreshView,c);
	this.mainframe.addHandler("fortitudeUpdate","sp_threshold",c.refreshView,c);
	r.push(c);
	t.addCustomRow(r);
	
	t = f.addTable();
	t.addRow(["Damage Type","Amount"]);
	t.addRow(["LB","0"]);
	t.addRow(["MB","0"]);
	t.addRow(["SB","0"]);
	t.addRow(["LW","0"]);
	t.addRow(["MD","0"]);
	t.addRow(["SW","0"]);
	
	t = f.addTable();
	t.addRow(["Stamina"]);
	r = new Array();
	r.push(new ui.label("Maximum"));
	c = new ui.textField(null,new db.connector(this.dat.stats.stamina,"max"),true);
	this.mainframe.addHandler("willpowerUpdate","stam_max",c.refreshView,c);
	this.mainframe.addHandler("spiritUpdate","stam_max",c.refreshView,c);
	this.mainframe.addHandler("constitutionUpdate","stam_max",c.refreshView,c);
	this.mainframe.addHandler("fortitudeUpdate","stam_max",c.refreshView,c);
	r.push(c);
	t.addCustomRow(r);
	r = new Array();
	r.push(new ui.label("Current"));
	c = new ui.textField(null,new db.connector(this.dat.stats.stamina,"current"),false);
	r.push(c);
	t.addCustomRow(r);
	r = new Array();
	r.push(new ui.label("Recovery Rate"));
	c = new ui.textField(null,new db.connector(this.dat.stats.stamina,"recovery"),true);
	this.mainframe.addHandler("constitutionUpdate","stam_rate",c.refreshView,c);
	r.push(c);
	t.addCustomRow(r);
	r = new Array();
	r.push(new ui.label("Wind"));
	c = new ui.textField(null,new db.connector(this.dat.stats.wind,"max"),true);
	this.mainframe.addHandler("windUpdate","wind",c.refreshView,c);
	this.mainframe.addHandler("skillRankUpdate","wind",this.updateWind,this);
	r.push(c);
	t.addCustomRow(r);
	
	t = f.addTable();
	t.addRow(["Movement"]);
	r = new Array();
	r.push(new ui.label("Free"));
	c = new ui.textField(null,new db.connector(this.dat.stats.movement,"free"),true);
	this.mainframe.addHandler("sizeUpdate","move_free",c.refreshView,c);
	this.mainframe.addHandler("strengthUpdate","move_free",c.refreshView,c);
	r.push(c);
	t.addCustomRow(r);
	r = new Array();
	r.push(new ui.label("Major"));
	c = new ui.textField(null,new db.connector(this.dat.stats.movement,"major"),true);
	this.mainframe.addHandler("sizeUpdate","move_major",c.refreshView,c);
	this.mainframe.addHandler("strengthUpdate","move_major",c.refreshView,c);
	r.push(c);
	t.addCustomRow(r);
	r = new Array();
	r.push(new ui.label("Sprint"));
	c = new ui.textField(null,new db.connector(this.dat.stats.movement,"sprint"),true);
	this.mainframe.addHandler("sizeUpdate","move_sprint",c.refreshView,c);
	this.mainframe.addHandler("strengthUpdate","move_sprint",c.refreshView,c);
	r.push(c);
	t.addCustomRow(r);
	
	t = f.addTable();
	t.addRow(["Defense"]);
	r = new Array();
	r.push(new ui.label("Normal DR"));
	c = new ui.textField(null,new db.connector(this.dat.stats.defense,"dr"),true);
	this.mainframe.addHandler("sizeUpdate","defense_dr",c.refreshView,c);
	this.mainframe.addHandler("agilityUpdate","defense_dr",c.refreshView,c);
	r.push(c);
	t.addCustomRow(r);
	r = new Array();
	r.push(new ui.label("No Agility DR"));
	c = new ui.textField(null,new db.connector(this.dat.stats.defense,"noagldr"),true);
	this.mainframe.addHandler("sizeUpdate","defense_noagldr",c.refreshView,c);
	this.mainframe.addHandler("agilityUpdate","defense_noagldr",c.refreshView,c);
	r.push(c);
	t.addCustomRow(r);
	r = new Array();
	r.push(new ui.label("Touch DR"));
	c = new ui.textField(null,new db.connector(this.dat.stats.defense,"touchdr"),true);
	this.mainframe.addHandler("sizeUpdate","defense_touchdr",c.refreshView,c);
	this.mainframe.addHandler("agilityUpdate","defense_touchdr",c.refreshView,c);
	r.push(c);
	t.addCustomRow(r);
	r = new Array();
	r.push(new ui.label("Absorb"));
	c = new ui.textField(null,new db.connector(this.dat.stats.defense,"absorb"),true);
	this.mainframe.addHandler("raceUpdate","defense_absorb",c.refreshView,c);
	r.push(c);
	t.addCustomRow(r);
	r = new Array();
	r.push(new ui.label("Staging"));
	c = new ui.textField(null,new db.connector(this.dat.stats.defense,"staging"),true);
	this.mainframe.addHandler("fortitudeUpdate","defense_staging",c.refreshView,c);
	r.push(c);
	t.addCustomRow(r);
	
	
	// Build the Trait subform
	var f = this.form.addForm("Traits");
	f.setMainframe(this.mainframe);
	var c = f.addComboBox("Trait",kantia.traits);
	f.addButton("Add Trait",new db.link(this,this.addTrait,c));
	var t = f.addTable();
	this.traitTable = t;
	t.addRow(["Trait","Effect"]);
	for(var t in this.dat.traits) {
		this.addTraittoTable(this.dat.traits[t]);
	}
	
	// Build the Skill subform
	var f = this.form.addForm("Skills");
	f.setMainframe(this.mainframe);
	var c = f.addComboBox("Skill",kantia.skills);
	f.addButton("Add Skill",new db.link(this,this.addSkill,c));
	t = f.addTable();
	this.skillTable = t;
	t.addRow(["Skill","Attribute","Rank","Adjust","AV"]);
	for(var s in this.dat.skills) {
		this.addSkilltoTable(this.dat.skills[s]);
	}
	
	// Build the Mastery subform
	var f = this.form.addForm("Masteries");
	f.setMainframe(this.mainframe);
	var c = f.addComboBox("Mastery",kantia.masteries);
	f.addButton("Add Mastery",new db.link(this,this.addMastery,c));
	t = f.addTable();
	this.masteryTable = t;
	t.addRow(["Mastery","Weapon","Rank","Effect"]);
	for(var m in this.dat.masteries) {
		this.addMasterytoTable(this.dat.masteries[m]);
	}
	
	// Build Weapon subform
	var f = this.form.addForm("Weapons");
	f.setMainframe(this.mainframe);
	var c = f.addComboBox("Weapon",kantia.weapon.groups["All"]);
	f.addButton("Add Weapon",new db.link(this,this.addWeapon,c));
	t = f.addTable();
	this.weaponTable = t;
	t.addRow(["Weapon","Type"]);
	for(var w in this.dat.weapons) {
		this.addWeapontoTable(this.dat.weapons[w]);
	}
	
	this.mainframe.addHandler("strengthUpdate","offense",this.updateOffense,this);
};

// -------------------------------------------------------------------------------------------------
// clearForm
// -------------------------------------------------------------------------------------------------
kantia.characterSVC.prototype.clearForm = function() {
	this.form.destroy();
	delete this.form;
	this.mainframe.reset();
};

// -------------------------------------------------------------------------------------------------
// refreshView
// -------------------------------------------------------------------------------------------------
kantia.characterSVC.prototype.refreshView = function() {
	this.form.refreshView();
};

// -------------------------------------------------------------------------------------------------
// setData - gives the service a new data object.  Returns the old data object.
// -------------------------------------------------------------------------------------------------
kantia.characterSVC.prototype.setData = function(newDat) {
	var oldDat = this.dat;
	this.dat = newDat;
	return oldDat;
};

// -------------------------------------------------------------------------------------------------
// addPopup
// -------------------------------------------------------------------------------------------------
kantia.characterSVC.prototype.addPopup = function(key) {
	if(this.popups[key])
		return this.popups[k];
	
	var p = new ui.popup();
	p.setParent(this.root);
	p.addClass("popup");
	this.root.appendChild(p.dom);
	this.popups[key] = p;
	return p;
};

// -------------------------------------------------------------------------------------------------
// showPopup - shows the popup and the blurring overlay.
// -------------------------------------------------------------------------------------------------
kantia.characterSVC.prototype.showPopup = function(p) {
	p.show();
};

// -------------------------------------------------------------------------------------------------
// showPTA - shows the Pressing the Attack pop and clears the data.
// -------------------------------------------------------------------------------------------------
kantia.characterSVC.prototype.showPTA = function(p) {
	p.dat.staging = 0;
	p.dat.damage = 0;
	p.dat.av = 0;
	p.dat.skillav = 0;
	this.updatePTASkill(p.dat);
	this.updatePressingTheAttack(p.dat);
	p.show();
};

// -------------------------------------------------------------------------------------------------
// addPopup
// -------------------------------------------------------------------------------------------------
kantia.characterSVC.prototype.addPopup = function(key) {
	if(this.popups[key])
		return this.popups[k];
	
	var p = new ui.popup();
	p.setParent(this.root);
	p.addClass("popup");
	this.root.appendChild(p.dom);
	this.popups[key] = p;
	return p;
};

// -------------------------------------------------------------------------------------------------
// showPopup - shows the popup and the blurring overlay.
// -------------------------------------------------------------------------------------------------
kantia.characterSVC.prototype.showPopup = function(p) {
	p.show();
}

// -------------------------------------------------------------------------------------------------
// showPTA - shows the Pressing the Attack pop and clears the data.
// -------------------------------------------------------------------------------------------------
kantia.characterSVC.prototype.showPTA = function(p) {
	p.dat.staging = 0;
	p.dat.damage = 0;
	p.dat.av = 0;
	p.dat.skillav = 0;
	this.updatePTASkill(p.dat);
	this.updatePressingTheAttack(p.dat);
	p.show();
};

// -------------------------------------------------------------------------------------------------
// addSkilltoTable - This function
// -------------------------------------------------------------------------------------------------
kantia.characterSVC.prototype.addSkilltoTable = function(skill) {
	var r = new Array();
	r.push(new ui.label(skill.name));
	r.push(new ui.label(skill.attribute));
	var c = new ui.textField(null,new db.connector(skill,"rank"),false);
	c.setUpdate(this,this.updateSkill,skill.name);
	r.push(c);
	c = new ui.textField(null,new db.connector(skill,"adjust"),true);
	this.mainframe.addHandler(skill.attribute + "Update",skill.name + "_adj",this.updateSkill,this,skill.name);
	this.mainframe.addHandler(skill.name + "Update",skill.name + "_adj",c.refreshView,c);
	r.push(c);
	c = new ui.textField(null,new db.connector(skill,"av"),true);
	this.mainframe.addHandler(skill.name + "Update",skill.name + "_av",c.refreshView,c);
	r.push(c);
	c = new ui.button("Remove");
	c.setCallback(new db.link(this,this.removeSkill,skill.name));
	r.push(c);
	this.skillTable.addCustomRow(r);
};

// -------------------------------------------------------------------------------------------------
// addSkill - This funciton adds a skill to the character sheet.
// -------------------------------------------------------------------------------------------------
kantia.characterSVC.prototype.addSkill = function(ui) {
	var i = ui.select.selectedIndex;
	var s = ui.select.options[i].value;
	if(this.dat.skills[s])
		alert("Skill already known!");
	else {
		var sk = new kantia.skillDAT(kantia.skills[s]);
		sk.adjust = parseInt(this.dat.attributes[sk.attribute].adjust);
		if(kantia.race[this.dat.race].skills[s])
			sk.adjust += kantia.race[this.dat.race].skills[s];
		sk.av = sk.rank * 5 + sk.adjust;
		this.dat.skills[s] = sk
		this.addSkilltoTable(this.dat.skills[s]);
	}
};

// -------------------------------------------------------------------------------------------------
// updateAttribute - 
// -------------------------------------------------------------------------------------------------
kantia.characterSVC.prototype.updateAttribute = function(attr) {
	var base = parseInt(this.dat.attributes[attr].base);
	this.dat.attributes[attr].base = base;
	var score = base + this.dat.attributes[attr].modifier;
	this.dat.attributes[attr].score = score;
	this.dat.attributes[attr].av = score * 5;
	if(score >= 10)
		this.dat.attributes[attr].adjust = (score - 10) * 2;
	else
		this.dat.attributes[attr].adjust = kantia.attributes.adjust[score];
		
	this.updateHealth();
	this.updateStamina();
	this.updateMovement();
	this.updateDefense();
		
	this.mainframe.trigger(attr + "Update");
};

// -------------------------------------------------------------------------------------------------
// updateRace - 
// -------------------------------------------------------------------------------------------------
kantia.characterSVC.prototype.updateRace = function() {
	this.updateHealth();
	var r = this.dat.race;
	for(var a in kantia.race[r].attributes) {
		this.dat.attributes[a].modifier = kantia.race[r].attributes[a];
		this.updateAttribute(a);
	}
	this.mainframe.trigger("raceUpdate");
};

// -------------------------------------------------------------------------------------------------
// updateHealth - 
// -------------------------------------------------------------------------------------------------
kantia.characterSVC.prototype.updateHealth = function() {
	var hp = (this.dat.attributes.size.score * 2) + this.dat.attributes.fortitude.score +
		this.dat.attributes.constitution.score + this.dat.attributes.willpower.score - 10;
		
	var w = Math.round(hp/2);
	var b = hp - w;
	
	var r = this.dat.race;
	if(kantia.race[r].hitpoints) {
		w += kantia.race[r].hitpoints.wound;
		b += kantia.race[r].hitpoints.bludgeon;
	}
	
	this.dat.stats.health.hitpoints.wound = w;
	this.dat.stats.health.hitpoints.bludgeon = b;
	
	var sp = Math.ceil((this.dat.attributes.size.score + this.dat.attributes.fortitude.score - 20) / 2) * 5;
	if(sp < 0)
		this.dat.stats.health.stunpain.threshold = 0;
	else
		this.dat.stats.health.stunpain.threshold = sp;
};

// -------------------------------------------------------------------------------------------------
// updateStamina - 
// -------------------------------------------------------------------------------------------------
kantia.characterSVC.prototype.updateStamina = function() {
	this.dat.stats.stamina.max = this.dat.attributes.fortitude.score + this.dat.attributes.constitution.score +
		this.dat.attributes.spirit.score + this.dat.attributes.willpower.score;
	this.dat.stats.stamina.recovery = Math.ceil(this.dat.attributes.constitution.score / 3);
};

// -------------------------------------------------------------------------------------------------
// updateMovement - 
// -------------------------------------------------------------------------------------------------
kantia.characterSVC.prototype.updateMovement = function() {
	var move = 10;
	var size = this.dat.attributes.size.score;
	var str = this.dat.attributes.strength.score;
	var strsiz = str - size;
	
	if(strsiz > 3)
		strsiz = 3;
		
	move += strsiz;
	
	// Short stride
	if(size <= 9)
		move -= 1;
	if(size <= 6)
		move -= 1;
	if(size <= 4)
		move -= 1;
	if(size <= 1)
		move -= 1;
	
	// Long stride
	if(size >= 14)
		move += 1;
	if(size >= 19)
		move += 1;
	if(size >= 24)
		move += 1;
	if(size >= 30)
		move += 1;
	
	
	this.dat.stats.movement.major = move;
	this.dat.stats.movement.free = Math.round(move/3);
	this.dat.stats.movement.sprint = move * 8;
};

// -------------------------------------------------------------------------------------------------
// updateDefense - 
// -------------------------------------------------------------------------------------------------
kantia.characterSVC.prototype.updateDefense = function() {
	var dr = 50 + (this.dat.attributes.agility.adjust - this.dat.attributes.size.adjust);
	
	this.dat.stats.defense.dr = dr;
	this.dat.stats.defense.noagldr = dr - this.dat.attributes.agility.adjust;
	this.dat.stats.defense.touchdr = dr;
	
	this.dat.stats.defense.staging = this.dat.attributes.fortitude.score;
};

// -------------------------------------------------------------------------------------------------
// updateSkill - 
// -------------------------------------------------------------------------------------------------
kantia.characterSVC.prototype.updateSkill = function(skill) {
	var s = skill.toLowerCase();
	var r = this.dat.skills[s].rank;
	var a = this.dat.skills[s].attribute;
	this.dat.skills[s].adjust = this.dat.attributes[a].adjust;
	if(kantia.race[this.dat.race].skills[s])
			this.dat.skills[s].adjust += kantia.race[this.dat.race].skills[s];
	this.dat.skills[s].av = (parseInt(r) * 5) + parseInt(this.dat.skills[s].adjust);
	
	this.mainframe.trigger(skill + "Update");
	this.mainframe.trigger("skillRankUpdate");
};

// -------------------------------------------------------------------------------------------------
// removeSkill - 
// -------------------------------------------------------------------------------------------------
kantia.characterSVC.prototype.removeSkill = function(skill) {
	if(confirm("Are you sure that you want to remove: " + skill + "?")) {
		var s = skill.toLowerCase();
		var row = undefined;
		for(var r in this.skillTable.rows) {
			if(this.skillTable.rows[r].cells.length > 0 && this.skillTable.rows[r].cells[0].text == skill) {
				row = this.skillTable.rows[r];
				this.skillTable.removeRow(row);
			}
		}
		delete this.dat.skills[s];
	}
};

// -------------------------------------------------------------------------------------------------
// addMastery - 
// -------------------------------------------------------------------------------------------------
kantia.characterSVC.prototype.addMastery = function(ui) {
	var i = ui.select.selectedIndex;
	var m = ui.select.options[i].value;
	var w = prompt("What weapon does the mastery use:","");
	
	if(this.dat.masteries[m + w])
		alert("Mastery already known!");
	else {
		var ms = new kantia.masteryDAT(kantia.masteries[m],w);
		this.dat.masteries[m + w] = ms;
		this.addMasterytoTable(ms);
	}
};

// -------------------------------------------------------------------------------------------------
// addMasterytoTable - 
// -------------------------------------------------------------------------------------------------
kantia.characterSVC.prototype.addMasterytoTable = function(mastery) {
	var r = new Array();
	r.push(new ui.label(mastery.name));
	r.push(new ui.label(mastery.weapon));
	var c = new ui.textField(null,new db.connector(mastery,"rank"),false);
	c.setUpdate(this,this.updateMastery,mastery.name + mastery.weapon);
	r.push(c);
	c = new ui.textField(null,new db.connector(mastery,"effects"),true);
	this.mainframe.addHandler(mastery.name + mastery.weapon + "Update",mastery.name + mastery.weapon + "_effects",c.refreshView,c);
	r.push(c);
	c = new ui.button("Remove");
	c.setCallback(new db.link(this,this.removeMastery,mastery.name + mastery.weapon));
	r.push(c);
	this.masteryTable.addCustomRow(r);
};

// -------------------------------------------------------------------------------------------------
// updateMastery -
// -------------------------------------------------------------------------------------------------
kantia.characterSVC.prototype.updateMastery = function(mastery) {
	var r = this.dat.masteries[mastery].rank;
	var n = this.dat.masteries[mastery].name;
	this.dat.masteries[mastery].effects = kantia.mastery.effects[n][r];
	this.mainframe.trigger(mastery + "Update");
};

// -------------------------------------------------------------------------------------------------
// removeMastery -
// -------------------------------------------------------------------------------------------------
kantia.characterSVC.prototype.removeMastery = function(mastery) {
	if(confirm("Are you sure that you want to remove: " + mastery + "?")) {
		var row = undefined;
		var n = this.dat.masteries[mastery].name;
		var w = this.dat.masteries[mastery].weapon;
		for(var r in this.masteryTable.rows) {
			if(this.masteryTable.rows[r].cells.length > 0 && this.masteryTable.rows[r].cells[0].text == n
				&& this.masteryTable.rows[r].cells[1].text == w) {
				row = this.masteryTable.rows[r];
				this.masteryTable.removeRow(row);
				delete this.dat.masteries[mastery];
			}
		}
	}
};

// -------------------------------------------------------------------------------------------------
// addWeapon - adds a weapon to the character and the character sheet.
// -------------------------------------------------------------------------------------------------
kantia.characterSVC.prototype.addWeapon = function(ui) {
	var i = ui.select.selectedIndex;
	var w = ui.select.options[i].value;
	var n = prompt("Name this weapon:","");
	
	if(!this.dat.weapons)
		this.dat.weapons = {};
		
	this.dat.weapons[n] = new kantia.weaponDAT(w,n);
	this.addWeapontoTable(this.dat.weapons[n]);
};

// -------------------------------------------------------------------------------------------------
// addWeapontoTable - adds the weapon info to the weapon table.
// -------------------------------------------------------------------------------------------------
kantia.characterSVC.prototype.addWeapontoTable = function(weapon) {
	var r = new Array();
	r.push(new ui.label(weapon.name));
	r.push(new ui.label(weapon.type));
	var b = new ui.button("Remove");
	b.setCallback(new db.link(this,this.removeWeapon,weapon));
	r.push(b);
	this.weaponTable.addCustomRow(r);
};

// -------------------------------------------------------------------------------------------------
// removeWeapon - remove a weapon from the table and the character sheet.
// -------------------------------------------------------------------------------------------------
kantia.characterSVC.prototype.removeWeapon = function(weapon) {
	var name = weapon.name;
	
	if(confirm("Are you sure you want to remove: " + weapon.name + "?")) {
		var row = undefined;
		for(var r in this.weaponTable.rows) {
			if(this.weaponTable.rows[r].cells.length > 0 && this.weaponTable.rows[r].cells[0].text == weapon.name)
				row = this.weaponTable.rows[r];
			this.weaponTable.removeRow(row);
			delete this.dat.weapons[name];
		}
	}
};

// -------------------------------------------------------------------------------------------------
// addTrait - adds the specified trait to the character.
// -------------------------------------------------------------------------------------------------
kantia.characterSVC.prototype.addTrait = function(ui) {
	var i = ui.select.selectedIndex;
	var t = ui.select.options[i].value;
	
	if(this.dat.traits[t])
		alert("Trait already acquired!");
	else {
		this.dat.traits[t] = kantia.trait.effects[t];
		this.addTraittoTable(t);
	}
};

// -------------------------------------------------------------------------------------------------
// addTraittoTable - adds the trait to the Traits table.
// -------------------------------------------------------------------------------------------------
kantia.characterSVC.prototype.addTraittoTable = function(trait) {
	var r = new Array();
	r.push(new ui.label(trait));
	r.push(new ui.label(kantia.trait.effects[trait]));
	var b = new ui.button("Remove");
	b.setCallback(new db.link(this,this.removeTrait,trait));
	r.push(b);
	this.traitTable.addCustomRow(r);
};

// -------------------------------------------------------------------------------------------------
// removeTrait - remove the trait from the table and the character sheet.
// -------------------------------------------------------------------------------------------------
kantia.characterSVC.prototype.removeTrait = function(trait) {
	if(confirm("Are you sure that you want to remove: " + trait + "?")) {
		var row = undefined;
		for(var r in this.traitTable.rows) {
			if(this.traitTable.rows[r].cells.length > 0 && this.traitTable.rows[r].cells[0].text == trait)
				row = this.traitTable.rows[r];
			this.traitTable.removeRow(row);
			delete this.dat.traits[trait];
		}
	}
};

// -------------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------
kantia.characterSVC.prototype.updateWind = function() {
	var rank = 0;
	for(s in this.dat.skills) {
		var r = this.dat.skills[s].rank;
		if(r > rank)
			rank = r;
	}
	var adj = Math.round(rank/4);
	this.dat.stats.wind.max = 4 + adj;
	this.dat.stats.wind.current = this.dat.stats.wind.max;
	this.mainframe.trigger("windUpdate");
};

// -------------------------------------------------------------------------------------------------
// updatePressingTheAttack - calculates the stamina cost for the specified pressing the attack
// parameters.
// Defaults:
// 		+1 staging	1 STAM
//		+1 damage	4 STAM
//		+5 AV		6 STAM
// -------------------------------------------------------------------------------------------------
kantia.characterSVC.prototype.updatePressingTheAttack = function(dat) {
	var t = 0;
	t += parseInt(dat.staging);
	t += parseInt(dat.damage*4);
	t += parseInt(dat.av/5*6);
	dat.total = t;
	this.mainframe.trigger("ptaUpdate");
};

// -------------------------------------------------------------------------------------------------
// updatePTASkill - updates the AV data object to reflect the skill being used.
// -------------------------------------------------------------------------------------------------
kantia.characterSVC.prototype.updatePTASkill = function(dat) {
	var s = dat.skill;
	if(this.dat.skills[s])
		dat.skillav = parseInt(this.dat.skills[s].av) + parseInt(this.dat.skills[s].adjust);
	else
		dat.skillav = 0;
	this.mainframe.trigger("ptaUpdate");
};

// -------------------------------------------------------------------------------------------------
// updateOffense - updates the offense stat object when updates are done to attributes, skills,
// etc.
// -------------------------------------------------------------------------------------------------
kantia.characterSVC.prototype.updateOffense = function() {
	this.dat.stats.offense.staging = parseInt(this.dat.attributes.strength.score);
	this.mainframe.trigger("offenseUpdate");
};