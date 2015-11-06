gm.npc = {};

gm.objects.npc = function(title,race,description,type) {
    this.title = title;
    this.race = race;
    this.description = description;
    this.type = type;
};

gm.types.npc = [
	new gm.objects.type("All",4,""),
	new gm.objects.type("Human",2,"human"),
	new gm.objects.type("Dwarf",1,"dwarf"),
	new gm.objects.type("Undead",1,"undead")
];

gm.npc.list = [
	new gm.objects.npc("Basic Human","Human","Your standard issue, vanilla, RPG human.","standard"),
	new gm.objects.npc("Human Fighter","Human","Slightly more dangerous than the Basic Human."),
	new gm.objects.npc("Basic Dwarf","Dwarf","Short and stout!","standard"),
	new gm.objects.npc("Ghoul","Undead","This is a template for a Ghoul to be applied to any race.","undead")
];