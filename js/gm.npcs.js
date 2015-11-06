gm.npc = {};

gm.objects.npc = function(title,race,description,type) {
    this.title = title;
    this.race = race;
    this.description = description;
    this.type = type;
};

var humans = [
	new gm.objects.npc("Basic Human","Human","Your standard issue, vanilla, RPG human.","standard"),
	new gm.objects.npc("Human Fighter","Human","Slightly more dangerous than the Basic Human.","standard")
];
var dwarves = [
	new gm.objects.npc("Basic Dwarf","Dwarf","Short and stout!","standard"),
	new gm.objects.npc("Dwarf Berserker","Dwarf","Don't get mad...never mind.","standard")
];
var undead = [
	new gm.objects.npc("Ghoul","Undead","This is a template for a Ghoul to be applied to any race.","undead"),
	new gm.objects.npc("Zombie","Undead","Thriller!!!!!!!!","undead"),
	new gm.objects.npc("Skeleton Warrior","Undead","Just a bag of bones.","undead skeleton"),
	new gm.objects.npc("Skeleton Archer","Undead","I hate these guys!","undead skeleton")
];

gm.npc.list = humans.concat(dwarves,undead);

gm.types.npc = [
	new gm.objects.type("All",gm.npc.list.length,""),
	new gm.objects.type("Human",humans.length,"human"),
	new gm.objects.type("Dwarf",dwarves.length,"dwarf"),
	new gm.objects.type("Undead",undead.length,"undead")
];