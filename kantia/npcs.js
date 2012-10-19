kantia.template.npcs = {};

kantia.template.npcList = {
	"Common Races": {
		"Troll Brute, Basic": "Troll Brute, Basic"
	},
	"Kobald": {
		"Kobald, Common": "Kobald, Common",
		"Kobald, Warrior": "Kobald, Warrior",
		"Kobald, Sorcerer": "Kobald, Sorcerer"
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

kantia.template.npcs["Troll Brute, Basic"] = new kantia.template.npc(
	"Troll Brute, Basic",
	"Troll",
	{
		"strength": new kantia.attributeDAT("Strength",15,20,18),
		"size": new kantia.attributeDAT("Size",15,20,18),
		"agility": new kantia.attributeDAT("Agility",10,14,12),
		"reflexes": new kantia.attributeDAT("Reflexes",10,14,12),
		"constitution": new kantia.attributeDAT("Constitution",20,30,24),
		"fortitude": new kantia.attributeDAT("Fortitude",13,16,14),
		"reasoning": new kantia.attributeDAT("Reasoning",3,10,4),
		"willpower": new kantia.attributeDAT("Willpower",5,12,6),
		"spirit": new kantia.attributeDAT("Spirit",5,12,6),
		"perception": new kantia.attributeDAT("Perception",10,18,14)
	},
	{
		"Brawling": new kantia.skillDAT("Brawling","agility",8),
		"Climbing": new kantia.skillDAT("Climbing","strength",4),
		"Determine Motivation": new kantia.skillDAT("Determine Motivation","reasoning",4)
	},
	{
	}
);

kantia.template.npcs["Kobald, Common"] = new kantia.template.npc(
	"Kobald, Common",
	"Kobald",
	{
		"strength": new kantia.attributeDAT("Strength",4,7,6),
		"size": new kantia.attributeDAT("Size",3,5,4),
		"agility": new kantia.attributeDAT("Agility",11,15,13),
		"reflexes": new kantia.attributeDAT("Reflexes",11,15,13),
		"constitution": new kantia.attributeDAT("Constitution",8,12,10),
		"fortitude": new kantia.attributeDAT("Fortitude",4,8,8),
		"reasoning": new kantia.attributeDAT("Reasoning",8,12,10),
		"willpower": new kantia.attributeDAT("Willpower",4,8,6),
		"spirit": new kantia.attributeDAT("Spirit",8,12,10),
		"perception": new kantia.attributeDAT("Perception",12,16,14)
	},
	{
		"Simple Weapons": new kantia.skillDAT("Simple Weapons","agility",6),
		"Dodge": new kantia.skillDAT("Dodge","reflexes",6),
		"Brawling": new kantia.skillDAT("Brawling","agility",2),
		"Hide": new kantia.skillDAT("Hide","special",8),
		"Move Silently": new kantia.skillDAT("Move Silently","special",4),
		"Resist Fear": new kantia.skillDAT("Resist Fear","spirit",2),
		"Resist Magic": new kantia.skillDAT("Resist Magic","spirit",2),
		"Resist Mental": new kantia.skillDAT("Resist Mental","willpower",2)
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
		"strength": new kantia.attributeDAT("Strength",5,9,7),
		"size": new kantia.attributeDAT("Size",4,7,5),
		"agility": new kantia.attributeDAT("Agility",12,16,14),
		"reflexes": new kantia.attributeDAT("Reflexes",13,17,15),
		"constitution": new kantia.attributeDAT("Constitution",10,14,12),
		"fortitude": new kantia.attributeDAT("Fortitude",5,9,7),
		"reasoning": new kantia.attributeDAT("Reasoning",6,10,8),
		"willpower": new kantia.attributeDAT("Willpower",4,8,6),
		"spirit": new kantia.attributeDAT("Spirit",7,11,9),
		"perception": new kantia.attributeDAT("Perception",12,16,14)
	},
	{
		"Simple Weapons": new kantia.skillDAT("Simple Weapons","agility",7),
		"Dodge": new kantia.skillDAT("Dodge","reflexes",7),
		"Crossbow": new kantia.skillDAT("Crossbow","perception",6),
		"Brawling": new kantia.skillDAT("Brawling","agility",5),
		"Throw": new kantia.skillDAT("Throw","agility",9),
		"Resist Fear": new kantia.skillDAT("Resist Fear","spirit",6),
		"Resist Magic": new kantia.skillDAT("Resist Magic","spirit",2),
		"Resist Mental": new kantia.skillDAT("Resist Mental","willpower",2),
		"Hide": new kantia.skillDAT("Hide","special",10),
		"Move Silently": new kantia.skillDAT("Move Silently","special",6)
	},
	{
		"Psychic Void": "Psychic Void",
		"Photosensitive": "Photosensitive",
		"Darkvision": "Darkvision"
	}
);

kantia.template.npcs["Kobald, Sorcerer"] = new kantia.template.npc(
	"Kobald, Sorcerer",
	"Kobald",
	{
		"strength": new kantia.attributeDAT("Strength",4,7,6),
		"size": new kantia.attributeDAT("Size",3,5,4),
		"agility": new kantia.attributeDAT("Agility",11,15,13),
		"reflexes": new kantia.attributeDAT("Reflexes",11,15,13),
		"constitution": new kantia.attributeDAT("Constitution",9,13,11),
		"fortitude": new kantia.attributeDAT("Fortitude",4,8,6),
		"reasoning": new kantia.attributeDAT("Reasoning",12,16,14),
		"willpower": new kantia.attributeDAT("Willpower",10,14,12),
		"spirit": new kantia.attributeDAT("Spirit",14,18,16),
		"perception": new kantia.attributeDAT("Perception",12,16,14)
	},
	{
		"Crossbow": new kantia.skillDAT("Crossbow","perception",2),
		"Dodge": new kantia.skillDAT("Dodge","reflexes",6),
		"Hide": new kantia.skillDAT("Hide","special",8),
		"Listen": new kantia.skillDAT("Listen","perception",10),
		"Move Silently": new kantia.skillDAT("Move Silently","special",6),
		"Spot": new kantia.skillDAT("Spot","perception",10),
		"Alchemy": new kantia.skillDAT("Alchemy","reasoning",6),
		"Brawling": new kantia.skillDAT("Brawling","agility",3),
		"Concentration": new kantia.skillDAT("Concentration","willpower",8),
		"Ethereal Accuracy": new kantia.skillDAT("Etheral Accuracy","willpower",0),
		"Melee Weapon": new kantia.skillDAT("Melee Weapon","agility",4),
		"Persuasion": new kantia.skillDAT("Persuasion","reasoning",8),
		"Smell": new kantia.skillDAT("Smell","perception",5),
		"Spellcraft": new kantia.skillDAT("Spellcraft","reasoning",5),
		"Throw": new kantia.skillDAT("Throw","agility",4),
		"Tracking": new kantia.skillDAT("Tracking","perception",4)
	},
	{
		"Psychic Void": "Psychic Void",
		"Photosensitive": "Photosensitive",
		"Darkvision": "Darkvision",
		"Thaumaturge": "Thaumaturge"
	}
);