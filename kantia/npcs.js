kantia.template.npcs = {};

kantia.template.npcList = {
	"Human": {
		"Human Brute, Basic": "Human Brute, Basic",
		"Human Brute, Expert": "Human Brute, Expert",
		"Human Brute, Master": "Human Brute, Master",
		"Human Fighter, Basic": "Human Fighter, Basic",
		"Human Fighter, Expert": "Human Fighter, Expert",
		"Human Fighter, Master": "Human Fighter, Master"
	},
	"Troll": {
		"Troll Brute, Basic": "Troll Brute, Basic",
		"Troll Brute, Expert": "Troll Brute, Expert",
		"Troll Brute, Master": "Troll Brute, Master"
	},
	"Kobald": {
		"Kobald, Common": "Kobald, Common",
		"Kobald, Warrior": "Kobald, Warrior",
		"Kobald, Sorcerer": "Kobald, Sorcerer"
	}
};

kantia.template.npc = function(name,race,attributes,skills,traits,armor,weapons) {
	this.race = race;
	this.name = name;
	this.skills = skills;
	this.attributes = attributes;
	this.armor = armor;
	this.weapons = weapons;
	this.traits = traits;
	this.hc;
	this.categories;
};

////////////////////////////////////////////////////////////////////////////////////////////////////
// Human NPC Templates
////////////////////////////////////////////////////////////////////////////////////////////////////

// Human Brute, Basic ------------------------------------------------------------------------------
kantia.template.npcs["Human Brute, Basic"] = new kantia.template.npc(
	"Human Brute, Basic",
	"Human",
	{
		"strength": new kantia.attributeDAT("Strength",13,15,14),
		"size": new kantia.attributeDAT("Size",13,15,14),
		"agility": new kantia.attributeDAT("Agility",8,12,10),
		"reflexes": new kantia.attributeDAT("Reflexes",8,12,10),
		"constitution": new kantia.attributeDAT("Constitution",13,15,14),
		"fortitude": new kantia.attributeDAT("Fortitude",13,15,14),
		"reasoning": new kantia.attributeDAT("Reasoning",6,12,7),
		"willpower": new kantia.attributeDAT("Willpower",6,12,8),
		"spirit": new kantia.attributeDAT("Spirit",6,12,8),
		"perception": new kantia.attributeDAT("Perception",6,12,10)
	},
	{
		"Brawling": new kantia.skillDAT("Brawling","agility",8),
		"Climbing": new kantia.skillDAT("Climbing","strength",5)
	},
	{
	},
	["Leather Jerkin","Leather Vambrace","Leather Greaves"]
);

// Human Brute, Expert ------------------------------------------------------------------------------
kantia.template.npcs["Human Brute, Expert"] = new kantia.template.npc(
	"Human Brute, Expert",
	"Human",
	{
		"strength": new kantia.attributeDAT("Strength",13,15,15),
		"size": new kantia.attributeDAT("Size",13,15,15),
		"agility": new kantia.attributeDAT("Agility",8,12,10),
		"reflexes": new kantia.attributeDAT("Reflexes",8,12,10),
		"constitution": new kantia.attributeDAT("Constitution",13,15,15),
		"fortitude": new kantia.attributeDAT("Fortitude",13,15,15),
		"reasoning": new kantia.attributeDAT("Reasoning",6,12,8),
		"willpower": new kantia.attributeDAT("Willpower",6,12,8),
		"spirit": new kantia.attributeDAT("Spirit",6,12,8),
		"perception": new kantia.attributeDAT("Perception",6,12,10)
	},
	{
		"Brawling": new kantia.skillDAT("Brawling","agility",12),
		"Climbing": new kantia.skillDAT("Climbing","strength",6)
	},
	{
	}
);

// Human Brute, Master ------------------------------------------------------------------------------
kantia.template.npcs["Human Brute, Master"] = new kantia.template.npc(
	"Human Brute, Master",
	"Human",
	{
		"strength": new kantia.attributeDAT("Strength",13,15,16),
		"size": new kantia.attributeDAT("Size",13,15,15),
		"agility": new kantia.attributeDAT("Agility",8,12,10),
		"reflexes": new kantia.attributeDAT("Reflexes",8,12,10),
		"constitution": new kantia.attributeDAT("Constitution",13,15,15),
		"fortitude": new kantia.attributeDAT("Fortitude",13,15,16),
		"reasoning": new kantia.attributeDAT("Reasoning",6,12,9),
		"willpower": new kantia.attributeDAT("Willpower",6,12,8),
		"spirit": new kantia.attributeDAT("Spirit",6,12,8),
		"perception": new kantia.attributeDAT("Perception",6,12,10)
	},
	{
		"Brawling": new kantia.skillDAT("Brawling","agility",12),
		"Climbing": new kantia.skillDAT("Climbing","strength",6)
	},
	{
	}
);

// Human Fighter, Basic ------------------------------------------------------------------------------
kantia.template.npcs["Human Fighter, Basic"] = new kantia.template.npc(
	"Human Fighter, Basic",
	"Human",
	{
		"strength": new kantia.attributeDAT("Strength",10,15,13),
		"size": new kantia.attributeDAT("Size",9,14,12),
		"agility": new kantia.attributeDAT("Agility",9,14,12),
		"reflexes": new kantia.attributeDAT("Reflexes",9,14,12),
		"constitution": new kantia.attributeDAT("Constitution",6,12,10),
		"fortitude": new kantia.attributeDAT("Fortitude",9,14,12),
		"reasoning": new kantia.attributeDAT("Reasoning",6,12,9),
		"willpower": new kantia.attributeDAT("Willpower",6,12,9),
		"spirit": new kantia.attributeDAT("Spirit",6,12,9),
		"perception": new kantia.attributeDAT("Perception",6,12,10)
	},
	{
		"Brawling": new kantia.skillDAT("Brawling","agility",6),
		"Climbing": new kantia.skillDAT("Climbing","strength",4)
	},
	{
	}
);

// Human Fighter, Expert ------------------------------------------------------------------------------
kantia.template.npcs["Human Fighter, Expert"] = new kantia.template.npc(
	"Human Fighter, Expert",
	"Human",
	{
		"strength": new kantia.attributeDAT("Strength",10,15,14),
		"size": new kantia.attributeDAT("Size",9,14,12),
		"agility": new kantia.attributeDAT("Agility",9,14,12),
		"reflexes": new kantia.attributeDAT("Reflexes",9,14,12),
		"constitution": new kantia.attributeDAT("Constitution",6,12,11),
		"fortitude": new kantia.attributeDAT("Fortitude",9,14,13),
		"reasoning": new kantia.attributeDAT("Reasoning",6,12,10),
		"willpower": new kantia.attributeDAT("Willpower",6,12,10),
		"spirit": new kantia.attributeDAT("Spirit",6,12,9),
		"perception": new kantia.attributeDAT("Perception",6,12,10)
	},
	{
		"Brawling": new kantia.skillDAT("Brawling","agility",8),
		"Climbing": new kantia.skillDAT("Climbing","strength",6)
	},
	{
	}
);

// Human Fighter, Master ------------------------------------------------------------------------------
kantia.template.npcs["Human Fighter, Master"] = new kantia.template.npc(
	"Human Fighter, Master",
	"Human",
	{
		"strength": new kantia.attributeDAT("Strength",10,15,14),
		"size": new kantia.attributeDAT("Size",9,14,12),
		"agility": new kantia.attributeDAT("Agility",9,14,13),
		"reflexes": new kantia.attributeDAT("Reflexes",9,14,12),
		"constitution": new kantia.attributeDAT("Constitution",6,12,12),
		"fortitude": new kantia.attributeDAT("Fortitude",9,14,14),
		"reasoning": new kantia.attributeDAT("Reasoning",6,12,11),
		"willpower": new kantia.attributeDAT("Willpower",6,12,10),
		"spirit": new kantia.attributeDAT("Spirit",6,12,9),
		"perception": new kantia.attributeDAT("Perception",6,12,10)
	},
	{
		"Brawling": new kantia.skillDAT("Brawling","agility",10),
		"Climbing": new kantia.skillDAT("Climbing","strength",8)
	},
	{
	}
);

////////////////////////////////////////////////////////////////////////////////////////////////////
// Troll NPC Templates
////////////////////////////////////////////////////////////////////////////////////////////////////

// Troll Brute, Basic ------------------------------------------------------------------------------
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
		"Determine Motivation": new kantia.skillDAT("Determine Motivation","reasoning",4),
		"Dodge": new kantia.skillDAT("Dodge","reflexes",5)
	},
	{
	}
);

// Troll Brute, Expert -----------------------------------------------------------------------------
kantia.template.npcs["Troll Brute, Expert"] = new kantia.template.npc(
	"Troll Brute, Expert",
	"Troll",
	{
		"strength": new kantia.attributeDAT("Strength",15,20,19),
		"size": new kantia.attributeDAT("Size",15,20,19),
		"agility": new kantia.attributeDAT("Agility",10,14,12),
		"reflexes": new kantia.attributeDAT("Reflexes",10,14,12),
		"constitution": new kantia.attributeDAT("Constitution",20,30,25),
		"fortitude": new kantia.attributeDAT("Fortitude",13,16,15),
		"reasoning": new kantia.attributeDAT("Reasoning",3,10,5),
		"willpower": new kantia.attributeDAT("Willpower",5,12,6),
		"spirit": new kantia.attributeDAT("Spirit",5,12,6),
		"perception": new kantia.attributeDAT("Perception",10,18,14)
	},
	{
		"Brawling": new kantia.skillDAT("Brawling","agility",12),
		"Climbing": new kantia.skillDAT("Climbing","strength",6)
	},
	{
	}
);

// Troll Brute, Master -----------------------------------------------------------------------------
kantia.template.npcs["Troll Brute, Master"] = new kantia.template.npc(
	"Troll Brute, Master",
	"Troll",
	{
		"strength": new kantia.attributeDAT("Strength",15,20,20),
		"size": new kantia.attributeDAT("Size",15,20,19),
		"agility": new kantia.attributeDAT("Agility",10,14,12),
		"reflexes": new kantia.attributeDAT("Reflexes",10,14,12),
		"constitution": new kantia.attributeDAT("Constitution",20,30,26),
		"fortitude": new kantia.attributeDAT("Fortitude",13,16,16),
		"reasoning": new kantia.attributeDAT("Reasoning",3,10,5),
		"willpower": new kantia.attributeDAT("Willpower",5,12,6),
		"spirit": new kantia.attributeDAT("Spirit",5,12,6),
		"perception": new kantia.attributeDAT("Perception",10,18,14)
	},
	{
		"Brawling": new kantia.skillDAT("Brawling","agility",12),
		"Climbing": new kantia.skillDAT("Climbing","strength",6)
	},
	{
	}
);

////////////////////////////////////////////////////////////////////////////////////////////////////
// Kobald NPC Templates
////////////////////////////////////////////////////////////////////////////////////////////////////

// Kobald, Common ----------------------------------------------------------------------------------
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
		"Simple Weapons": new kantia.skillDAT("Simple Weapons","agility",2),
		"Dodge": new kantia.skillDAT("Dodge","reflexes",6),
		"Brawling": new kantia.skillDAT("Brawling","agility",2),
		"Hide": new kantia.skillDAT("Hide","special",8),
		"Move Silently": new kantia.skillDAT("Move Silently","special",4),
		"Resist Fear": new kantia.skillDAT("Resist Fear","spirit",2),
		"Resist Magic": new kantia.skillDAT("Resist Magic","spirit",2),
		"Resist Mental": new kantia.skillDAT("Resist Mental","willpower",2),
		"Throw": new kantia.skillDAT("Throw","agility",4)
	},
	{
		"Psychic Void": "Psychic Void",
		"Photosensitive": "Photosensitive",
		"Darkvision": "Darkvision"
	},
	[],
	{
		"melee": ["Short Sword","Dagger","Hand Axe","Footman's Pick","Short Spear, 1H","Short Spear, 2H"],
		"ranged": ["Dagger","Short Spear"]
	}
);

// Kobald, Warrior----------------------------------------------------------------------------------
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
		"Melee Weapon": new kantia.skillDAT("Melee Weapon","agility",7),
		"Dodge": new kantia.skillDAT("Dodge","reflexes",7),
		"Archery": new kantia.skillDAT("Archery","agility",6),
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
	},
	["Leather Jerkin","Leather Vambrace","Leather Greaves","Medium Shield","Light Helm"],
	{
		"melee": ["Short Sword","Dagger","Hand Axe","Footman's Pick","Short Spear, 1H","Short Spear, 2H"],
		"ranged": ["Dagger","Short Spear","Light Crossbow"],
	}
);

// Kobald, Sorcerer --------------------------------------------------------------------------------
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