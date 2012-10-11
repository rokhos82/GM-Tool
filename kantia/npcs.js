kantia.template.npcs = {};

kantia.template.npcList = {
	"Common Races": {
		"Troll Brute": "Troll Brute"
	},
	"Kobald": {
		"Kobald, Common": "Kobald, Common",
		"Kobald, Warrior": "Kobald, Warrior",
	}
};

kantia.template.npc = function(name,race,attributes,skills,traits) {
	this.race = race;
	this.name = name;
	this.skills = skills;
	this.attributes = attributes;
	this.armor;
	this.weapons;
	this.traits = traits;
	this.hc;
	this.categories;
};

kantia.template.npcs["Kobald, Common"] = new kantia.template.npc(
	"Kobald, Common",
	"Kobald",
	{
		"Strength": new kantia.attributeDAT("Strength",4,7,6),
		"Size": new kantia.attributeDAT("Size",3,5,4),
		"Agility": new kantia.attributeDAT("Agility",11,15,13),
		"Reflexes": new kantia.attributeDAT("Relfexes",11,15,13),
		"Constitution": new kantia.attributeDAT("Constitution",8,12,10),
		"Fortitude": new kantia.attributeDAT("Fortitude",4,8,8),
		"Reasoning": new kantia.attributeDAT("Reasoning",8,12,10),
		"Willpower": new kantia.attributeDAT("Willpower",4,8,6),
		"Spirit": new kantia.attributeDAT("Spirit",8,12,10),
		"Perception": new kantia.attributeDAT("Perception",12,16,14)
	},
	{
		"Simple Weapons": new kantia.skillDAT("Simple Weapons","Agility",6),
		"Dodge": new kantia.skillDAT("Dodge","Reflexes",6),
		"Brawling": new kantia.skillDAT("Brawling","Agility",2),
		"Hide": new kantia.skillDAT("Hide","special",8),
		"Move Silently": new kantia.skillDAT("Move Silently","special",4),
		"Resist Fear": new kantia.skillDAT("Resist Fear","Spirit",2),
		"Resist Magic": new kantia.skillDAT("Resist Magic","Spirit",2),
		"Resist Mental": new kantia.skillDAT("Resist Mental","Willpower",2)
	},
	{
		"Psychic Void": "Psychic Void",
		"Photosensitive": "Photosensitive",
		"Darkvision": "Darkvision"
	}
);

kantia.template.npcs["Kobald, Warrior"] = new kantia.template.npc(
	"Kobald, Warrior",
	"Kobald",
	{
		"Stength": new kantia.attributeDAT("Strength",5,9,7),
		"Size": new kantia.attributeDAT("Size",4,7,5),
		"Agility": new kantia.attributeDAT("Agilithy",12,16,14),
		"Reflexes": new kantia.attributeDAT("Reflexes",13,17,15),
		"Constitution": new kantia.attributeDAT("Constitution",10,14,12),
		"Fortitude": new kantia.attributeDAT("Fortitude",5,9,7),
		"Reasoning": new kantia.attributeDAT("Reasoning",6,10,8),
		"Willpower": new kantia.attributeDAT("Willpower",4,8,6),
		"Spirit": new kantia.attributeDAT("Spirit",7,11,9),
		"Perception": new kantia.attributeDAT("Perception",12,16,14)
	},
	{
		"Simple Weapons": new kantia.skillDAT("Simple Weapons","Agility",7),
		"Dodge": new kantia.skillDAT("Dodge","Reflexes",7),
		"Crossbow": new kantia.skillDAT("Crossbow","Perception",6),
		"Brawling": new kantia.skillDAT("Brawling","Agility",5),
		"Throw": new kantia.skillDAT("Throw","Agility",9),
		"Resist Fear": new kantia.skillDAT("Resist Fear","Spirit",6),
		"Resist Magic": new kantia.skillDAT("Resist Magic","Spirit",2),
		"Resist Mental": new kantia.skillDAT("Resist Mental","Willpower",2),
		"Hide": new kantia.skillDAT("Hide","special",10),
		"Move Silently": new kantia.skillDAT("Move Silently","special",6)
	},
	{
		"Psychic Void": "Psychic Void",
		"Photosensitive": "Photosensitive",
		"Darkvision": "Darkvision"
	}
);