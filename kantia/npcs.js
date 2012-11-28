kantia.template.npcs = {};

kantia.template.npcList = {
	"Human": {
		"Human Brute, Basic": "Human Brute, Basic",
		"Human Brute, Expert": "Human Brute, Expert",
		"Human Brute, Master": "Human Brute, Master",
		"Human Fighter, Basic": "Human Fighter, Basic",
		"Human Fighter, Expert": "Human Fighter, Expert",
		"Human Fighter, Master": "Human Fighter, Master",
		"Human Mage, Basic": "Human Mage, Basic",
	},
	"Lukoi": {
		"Lukoi Brute, Basic": "Lukoi Brute, Basic",
		"Lukoi Brute, Expert": "Lukoi Brute, Expert",
		"Lukoi Fighter, Basic": "Lukoi Fighter, Basic",
		"Lukoi Fighter, Expert": "Lukoi Fighter, Expert",
		"Lukoi Fighter, Master": "Lukoi Fighter, Master"
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
	},
	"Animal": {
		"Wolf": "Wolf"
	}
};

kantia.template.npc = function(name,race,attributes,skills,traits,masteries,hc,armor,weapons,magic,loot,desc,categories) {
	this.race = race;
	this.name = name;
	this.skills = skills;
	this.attributes = attributes;
	this.armor = armor;
	this.weapons = weapons;
	this.traits = traits;
	this.hc = hc;
	this.categories = categories;
	this.magic = magic;
	this.description = desc;
	this.masteries = masteries;
	this.loot = loot;
};

kantia.template.npcSkill = function(name,attr,rank) {
	this.name = name;
	this.attribute = attr;
	this.rank = rank;
};

kantia.template.npcAttribute = function(name,min,max,avg) {
	this.name = name;
	this.min = min;
	this.max = max;
	this.avg = avg;
};

kantia.template.npcTrait = function(name,rank) {
	this.name = name;
	this.rank = rank;
};

kantia.template.npcHC = function(name,rank) {
	this.name = name;
	this.rank = rank;
};

kantia.template.npcMastery = function(name,rank) {
	this.name = name;
	this.rank = rank;
};

////////////////////////////////////////////////////////////////////////////////////////////////////
// Human NPC Templates
////////////////////////////////////////////////////////////////////////////////////////////////////

// Human Brute, Basic ------------------------------------------------------------------------------
kantia.template.npcs["Human Brute, Basic"] = new kantia.template.npc(
	"Human Brute, Basic",
	"Human",
	{
		"strength": new kantia.template.npcAttribute("Strength",13,15,14),
		"size": new kantia.template.npcAttribute("Size",13,15,14),
		"agility": new kantia.template.npcAttribute("Agility",8,12,10),
		"reflexes": new kantia.template.npcAttribute("Reflexes",8,12,10),
		"constitution": new kantia.template.npcAttribute("Constitution",13,15,14),
		"fortitude": new kantia.template.npcAttribute("Fortitude",13,15,14),
		"reasoning": new kantia.template.npcAttribute("Reasoning",6,12,7),
		"willpower": new kantia.template.npcAttribute("Willpower",6,12,8),
		"spirit": new kantia.template.npcAttribute("Spirit",6,12,8),
		"perception": new kantia.template.npcAttribute("Perception",6,12,10)
	},
	{
		"Brawling": new kantia.template.npcSkill("Brawling","agility",8),
		"Climbing": new kantia.template.npcSkill("Climbing","strength",5),
		"Determine Motivation": new kantia.template.npcSkill("Determine Motivation","reasoning",4),
		"Dodge": new kantia.template.npcSkill("Dodge","reflexes",5),
		"Feint": new kantia.template.npcSkill("Feint","reasoning",3),
		"Hide": new kantia.template.npcSkill("Hide",["agility","size"],4),
		"Intimidation": new kantia.template.npcSkill("Intimidation","strength",8),
		"Knowledge Skill": new kantia.template.npcSkill("Knowledge Skill","reasoning",6),
		"Listen": new kantia.template.npcSkill("Listen","perception",4),
		"Move Silently": new kantia.template.npcSkill("Move Silently",["agility","size"],4),
		"Persuasion": new kantia.template.npcSkill("Persuasion","reasoning",4),
		"Professional Skill": new kantia.template.npcSkill("Professional Skill","reasoning",4),
		"Simple Weapons": new kantia.template.npcSkill("Simple Weapons","agility",8),
		"Smell": new kantia.template.npcSkill("Smell","perception",4),
		"Spot": new kantia.template.npcSkill("Spot","perception",6),
		"Street Saavy": new kantia.template.npcSkill("Street Saavy","reasoning",4),
		"Weapon of Choice (Agility)": new kantia.template.npcSkill("Weapon of Choice (Agility)","agility",8),
		"Weapon of Choice (Perception)": new kantia.template.npcSkill("Weapon of Choice (Perception)","perception",8)
	},
	{
		"Adrenaline": new kantia.template.npcTrait("Adrenaline",1),
		"Ambidextrious": new kantia.template.npcTrait("Ambidextrious",1),
		"Branded": new kantia.template.npcTrait("Branded",1),
		"Combat Experience": new kantia.template.npcTrait("Combat Experience",1),
		"Fast Healing": new kantia.template.npcTrait("Fast Healing",1),
		"Habit": new kantia.template.npcTrait("Habit",1),
		"Half-Breed": new kantia.template.npcTrait("Half-Breed",1),
		"Impulsive": new kantia.template.npcTrait("Impulsive",1),
		"Missing Eye": new kantia.template.npcTrait("Missing Eye",1),
		"Missing Finger": new kantia.template.npcTrait("Missing Finger",1),
		"Ruthless": new kantia.template.npcTrait("Ruthless",1),
		"Skeptical": new kantia.template.npcTrait("Skeptical",1),
		"Spirit Sink": new kantia.template.npcTrait("Spirit Sink",4),
		"Uneducated": new kantia.template.npcTrait("Uneducated",1),
		"Void": new kantia.template.npcTrait("Void",1)
	},
	{
		"Two Weapon Mastery": new kantia.template.npcMastery("Two Weapon Mastery",4),
		"Multiple Attack - 2nd Attack": new kantia.template.npcMastery("Multiple Attack - 2nd Attack",4),
		"Leathal Strike Mastery": new kantia.template.npcMastery("Leathal Strike Mastery",4)
	},
	[
		new kantia.template.npcHC("Animal Companion",1),
		new kantia.template.npcHC("Back to the Wall",1),
		new kantia.template.npcHC("Berserker",2),
		new kantia.template.npcHC("Combat Intuition",2),
		new kantia.template.npcHC("Combat Reflexes",4),
		new kantia.template.npcHC("Deep Roots",1),
		new kantia.template.npcHC("Favored Opponent",1),
		new kantia.template.npcHC("Fearless",1),
		new kantia.template.npcHC("Hermit's Stride",1),
		new kantia.template.npcHC("Intimidating Presence",1),
		new kantia.template.npcHC("Iron Will",1),
		new kantia.template.npcHC("Nothing to Lose",1),
		new kantia.template.npcHC("Psychic Resistance",1),
		new kantia.template.npcHC("Robust Health",1),
		new kantia.template.npcHC("Magic Resistance",1),
		new kantia.template.npcHC("Take'em ALl",1),
		new kantia.template.npcHC("Thick Skinned",1),
		new kantia.template.npcHC("Tough as Nails",1)
	],
	["Leather Jerkin","Leather Vambrace","Leather Greaves"],
	{
		"melee": ["Light Club","Medium Club, 1H","Medium Club, 2H","Heavy Club","Battle Axe, 1H","Battle Axe, 2H","Great Axe","Footman's Pick, 1H","Footman's Pick, 2H","Greatsword","Wood Axe","Pick-Axe","Dagger"],
		"ranged": []
	},
	"",
	"These NPCs often have few possessions, although what they do own is often very durable and sturdy. Wilderness types will often carry any survival equipment they need with them at all times, while urban types often only carry what they will need in the immediate future. The average brute has 1d3-1 crowns, 2d6-2 silver, and 2d10 copper.",
	"A basic template for a large, combat oriented brute characters, barbarians, enforcers, bouncers and similar characters.  These characters are typically melee oriented, although some wilderness types use ranged weapons.",
	[]
);

// Human Brute, Expert ------------------------------------------------------------------------------
kantia.template.npcs["Human Brute, Expert"] = new kantia.template.npc(
	"Human Brute, Expert",
	"Human",
	{
		"strength": new kantia.template.npcAttribute("Strength",13,15,15),
		"size": new kantia.template.npcAttribute("Size",13,15,15),
		"agility": new kantia.template.npcAttribute("Agility",8,12,10),
		"reflexes": new kantia.template.npcAttribute("Reflexes",8,12,10),
		"constitution": new kantia.template.npcAttribute("Constitution",13,15,15),
		"fortitude": new kantia.template.npcAttribute("Fortitude",13,15,15),
		"reasoning": new kantia.template.npcAttribute("Reasoning",6,12,8),
		"willpower": new kantia.template.npcAttribute("Willpower",6,12,8),
		"spirit": new kantia.template.npcAttribute("Spirit",6,12,8),
		"perception": new kantia.template.npcAttribute("Perception",6,12,10)
	},
	{
		"Brawling": new kantia.template.npcSkill("Brawling","agility",12),
		"Climbing": new kantia.template.npcSkill("Climbing","strength",6),
		"Determine Motivation": new kantia.template.npcSkill("Determine Motivation","reasoning",6),
		"Dodge": new kantia.template.npcSkill("Dodge","reflexes",8),
		"Feint": new kantia.template.npcSkill("Feint","reasoning",5),
		"Hide": new kantia.template.npcSkill("Hide",["agility","size"],6),
		"Intimidation": new kantia.template.npcSkill("Intimidation","strength",14),
		"Knowledge Skill": new kantia.template.npcSkill("Knowledge Skill","reasoning",8),
		"Listen": new kantia.template.npcSkill("Listen","perception",6),
		"Move Silently": new kantia.template.npcSkill("Move Silently",["agility","size"],6),
		"Persuasion": new kantia.template.npcSkill("Persuasion","reasoning",6),
		"Professional Skill": new kantia.template.npcSkill("Professional Skill","reasoning",6),
		"Simple Weapons": new kantia.template.npcSkill("Simple Weapons","agility",12),
		"Smell": new kantia.template.npcSkill("Smell","perception",6),
		"Spot": new kantia.template.npcSkill("Spot","perception",8),
		"Street Saavy": new kantia.template.npcSkill("Street Saavy","reasoning",6),
		"Weapon of Choice (Agility)": new kantia.template.npcSkill("Weapon of Choice (Agility)","agility",12),
		"Weapon of Choice (Perception)": new kantia.template.npcSkill("Weapon of Choice (Perception)","perception",12)
	},
	{
		"Adrenaline": new kantia.template.npcTrait("Adrenaline",1),
		"Ambidextrious": new kantia.template.npcTrait("Ambidextrious",1),
		"Branded": new kantia.template.npcTrait("Branded",1),
		"Combat Experience": new kantia.template.npcTrait("Combat Experience",1),
		"Fast Healing": new kantia.template.npcTrait("Fast Healing",1),
		"Habit": new kantia.template.npcTrait("Habit",1),
		"Half-Breed": new kantia.template.npcTrait("Half-Breed",1),
		"Impulsive": new kantia.template.npcTrait("Impulsive",1),
		"Missing Eye": new kantia.template.npcTrait("Missing Eye",1),
		"Missing Finger": new kantia.template.npcTrait("Missing Finger",1),
		"Ruthless": new kantia.template.npcTrait("Ruthless",1),
		"Skeptical": new kantia.template.npcTrait("Skeptical",1),
		"Spirit Sink": new kantia.template.npcTrait("Spirit Sink",4),
		"Uneducated": new kantia.template.npcTrait("Uneducated",1),
		"Void": new kantia.template.npcTrait("Void",1)
	},
	{
		"Two Weapon Mastery": new kantia.template.npcMastery("Two Weapon Mastery",6),
		"Multiple Attack - 2nd Attack": new kantia.template.npcMastery("Multiple Attack - 2nd Attack",8),
		"Multiple Attack - 3rd Attack": new kantia.template.npcMastery("Multiple Attack - 3rd Attack",4),
		"Leathal Strike Mastery": new kantia.template.npcMastery("Leathal Strike Mastery",8)
	},
	[
		new kantia.template.npcHC("Alertness",2),
		new kantia.template.npcHC("Animal Companion",1),
		new kantia.template.npcHC("Back to the Wall",1),
		new kantia.template.npcHC("Berserker",4),
		new kantia.template.npcHC("Combat Intuition",3),
		new kantia.template.npcHC("Combat Reflexes",4),
		new kantia.template.npcHC("Danger Sense",1),
		new kantia.template.npcHC("Deep Roots",1),
		new kantia.template.npcHC("Favored Opponent",1),
		new kantia.template.npcHC("Fearless",1),
		new kantia.template.npcHC("Flashy Warrior",1),
		new kantia.template.npcHC("Hermit's Stride",1),
		new kantia.template.npcHC("Intimidating Presence",1),
		new kantia.template.npcHC("Iron Will",1),
		new kantia.template.npcHC("Nothing to Lose",1),
		new kantia.template.npcHC("Psychic Resistance",1),
		new kantia.template.npcHC("Robust Health",1),
		new kantia.template.npcHC("Magic Resistance",1),
		new kantia.template.npcHC("Take'em ALl",2),
		new kantia.template.npcHC("The Stare",1),
		new kantia.template.npcHC("Thick Skinned",1),
		new kantia.template.npcHC("Tough as Nails",2)
	],
	["Leather Jerkin","Leather Vambrace","Leather Greaves"],
	{
		"melee": ["Light Club","Medium Club, 1H","Medium Club, 2H","Heavy Club","Battle Axe, 1H","Battle Axe, 2H","Great Axe","Footman's Pick, 1H","Footman's Pick, 2H","Greatsword","Wood Axe","Pick-Axe","Dagger"],
		"ranged": []
	},
	"",
	"These NPCs often have few possessions, although what they do own is often very durable and sturdy. Wilderness types will often carry any survival equipment they need with them at all times, while urban types often only carry what they will need in the immediate future. The average brute has 1d3 crowns, 2d6 silver, and 2d10 copper.",
	"A basic template for a large, combat oriented brute characters, barbarians, enforcers, bouncers and similar characters.  These characters are typically melee oriented, although some wilderness types use ranged weapons.",
	[]
);

// Human Brute, Master ------------------------------------------------------------------------------
kantia.template.npcs["Human Brute, Master"] = new kantia.template.npc(
	"Human Brute, Master",
	"Human",
	{
		"strength": new kantia.template.npcAttribute("Strength",13,15,16),
		"size": new kantia.template.npcAttribute("Size",13,15,15),
		"agility": new kantia.template.npcAttribute("Agility",8,12,10),
		"reflexes": new kantia.template.npcAttribute("Reflexes",8,12,10),
		"constitution": new kantia.template.npcAttribute("Constitution",13,15,15),
		"fortitude": new kantia.template.npcAttribute("Fortitude",13,15,16),
		"reasoning": new kantia.template.npcAttribute("Reasoning",6,12,9),
		"willpower": new kantia.template.npcAttribute("Willpower",6,12,8),
		"spirit": new kantia.template.npcAttribute("Spirit",6,12,8),
		"perception": new kantia.template.npcAttribute("Perception",6,12,10)
	},
	{
		"Brawling": new kantia.template.npcSkill("Brawling","agility",12),
		"Climbing": new kantia.template.npcSkill("Climbing","strength",6),
		"Determine Motivation": new kantia.template.npcSkill("Determine Motivation","reasoning",6),
		"Dodge": new kantia.template.npcSkill("Dodge","reflexes",8),
		"Feint": new kantia.template.npcSkill("Feint","reasoning",7),
		"Hide": new kantia.template.npcSkill("Hide",["agility","size"],6),
		"Intimidation": new kantia.template.npcSkill("Intimidation","strength",14),
		"Knowledge Skill": new kantia.template.npcSkill("Knowledge Skill","reasoning",8),
		"Listen": new kantia.template.npcSkill("Listen","perception",6),
		"Move Silently": new kantia.template.npcSkill("Move Silently",["agility","size"],6),
		"Persuasion": new kantia.template.npcSkill("Persuasion","reasoning",6),
		"Professional Skill": new kantia.template.npcSkill("Professional Skill","reasoning",6),
		"Simple Weapons": new kantia.template.npcSkill("Simple Weapons","agility",12),
		"Smell": new kantia.template.npcSkill("Smell","perception",6),
		"Spot": new kantia.template.npcSkill("Spot","perception",8),
		"Street Saavy": new kantia.template.npcSkill("Street Saavy","reasoning",6),
		"Weapon of Choice (Agility)": new kantia.template.npcSkill("Weapon of Choice (Agility)","agility",12),
		"Weapon of Choice (Perception)": new kantia.template.npcSkill("Weapon of Choice (Perception)","perception",12)
	},
	{
		"Adrenaline": new kantia.template.npcTrait("Adrenaline",1),
		"Ambidextrious": new kantia.template.npcTrait("Ambidextrious",1),
		"Branded": new kantia.template.npcTrait("Branded",1),
		"Combat Experience": new kantia.template.npcTrait("Combat Experience",1),
		"Fast Healing": new kantia.template.npcTrait("Fast Healing",1),
		"Habit": new kantia.template.npcTrait("Habit",1),
		"Half-Breed": new kantia.template.npcTrait("Half-Breed",1),
		"Impulsive": new kantia.template.npcTrait("Impulsive",1),
		"Missing Eye": new kantia.template.npcTrait("Missing Eye",1),
		"Missing Finger": new kantia.template.npcTrait("Missing Finger",1),
		"Ruthless": new kantia.template.npcTrait("Ruthless",1),
		"Skeptical": new kantia.template.npcTrait("Skeptical",1),
		"Spirit Sink": new kantia.template.npcTrait("Spirit Sink",4),
		"Uneducated": new kantia.template.npcTrait("Uneducated",1),
		"Void": new kantia.template.npcTrait("Void",1)
	},
	{
		"Two Weapon Mastery": new kantia.template.npcMastery("Two Weapon Mastery",8),
		"Multiple Attack - 2nd Attack": new kantia.template.npcMastery("Multiple Attack - 2nd Attack",12),
		"Multiple Attack - 3rd Attack": new kantia.template.npcMastery("Multiple Attack - 3rd Attack",8),
		"Multiple Attack - 4th Attack": new kantia.template.npcMastery("Multiple Attack - 4th Attack",4),
		"Leathal Strike Mastery": new kantia.template.npcMastery("Leathal Strike Mastery",12)
	},
	[
		new kantia.template.npcHC("Alertness",4),
		new kantia.template.npcHC("Animal Companion",1),
		new kantia.template.npcHC("Back to the Wall",1),
		new kantia.template.npcHC("Berserker",6),
		new kantia.template.npcHC("Combat Intuition",4),
		new kantia.template.npcHC("Combat Reflexes",6),
		new kantia.template.npcHC("Danger Sense",1),
		new kantia.template.npcHC("Deep Roots",1),
		new kantia.template.npcHC("Favored Opponent",1),
		new kantia.template.npcHC("Fearless",1),
		new kantia.template.npcHC("Flashy Warrior",1),
		new kantia.template.npcHC("Hermit's Stride",1),
		new kantia.template.npcHC("Intimidating Presence",1),
		new kantia.template.npcHC("Iron Will",1),
		new kantia.template.npcHC("Nothing to Lose",1),
		new kantia.template.npcHC("Psychic Resistance",1),
		new kantia.template.npcHC("Robust Health",1),
		new kantia.template.npcHC("Magic Resistance",1),
		new kantia.template.npcHC("Take'em ALl",2),
		new kantia.template.npcHC("The Stare",1),
		new kantia.template.npcHC("Thick Skinned",3),
		new kantia.template.npcHC("Tough as Nails",2)
	],
	["Leather Jerkin","Leather Vambrace","Leather Greaves"],
	{
		"melee": ["Light Club","Medium Club, 1H","Medium Club, 2H","Heavy Club","Battle Axe, 1H","Battle Axe, 2H","Great Axe","Footman's Pick, 1H","Footman's Pick, 2H","Greatsword","Wood Axe","Pick-Axe","Dagger"],
		"ranged": []
	},
	"",
	"These NPCs often have few possessions, although what they do own is often very durable and sturdy, although brutes of this skill and power may possess luxuries and some premium equipment. Wilderness types will often carry any survival equipment they need with them at all times, while urban types often only carry what they will need in the immediate future. The average brute has 1d6 crowns, 2d8 silver, and 2d10 copper.",
	"A basic template for a large, combat oriented brute characters, barbarians, enforcers, bouncers and similar characters.  These characters are typically melee oriented, although some wilderness types use ranged weapons.",
	[]
);

// Human Fighter, Basic ------------------------------------------------------------------------------
kantia.template.npcs["Human Fighter, Basic"] = new kantia.template.npc(
	"Human Fighter, Basic",
	"Human",
	{
		"strength": new kantia.template.npcAttribute("Strength",10,15,13),
		"size": new kantia.template.npcAttribute("Size",9,14,12),
		"agility": new kantia.template.npcAttribute("Agility",9,14,12),
		"reflexes": new kantia.template.npcAttribute("Reflexes",9,14,12),
		"constitution": new kantia.template.npcAttribute("Constitution",6,12,10),
		"fortitude": new kantia.template.npcAttribute("Fortitude",9,14,12),
		"reasoning": new kantia.template.npcAttribute("Reasoning",6,12,9),
		"willpower": new kantia.template.npcAttribute("Willpower",6,12,9),
		"spirit": new kantia.template.npcAttribute("Spirit",6,12,9),
		"perception": new kantia.template.npcAttribute("Perception",6,12,10)
	},
	{
		"Brawling": new kantia.template.npcSkill("Brawling","agility",6),
		"Climbing": new kantia.template.npcSkill("Climbing","strength",4),
		"Determine Motivation": new kantia.template.npcSkill("Determine Motivation","reasoning",4),
		"Dodge": new kantia.template.npcSkill("Dodge","reflexes",6),
		"Feint": new kantia.template.npcSkill("Feint","reasoning",4),
		"Hide": new kantia.template.npcSkill("Hide",["agility","size"],4),
		"Knowledge Skills": new kantia.template.npcSkill("Knowledge Skills","reasoning",6),
		"Listen": new kantia.template.npcSkill("Listen","perception",4),
		"Move Silently": new kantia.template.npcSkill("Move Silently",["agility","size"],4),
		"Persuasion": new kantia.template.npcSkill("Persuasion","reasoning",4),
		"Professional Skills": new kantia.template.npcSkill("Professional Skills","reasoning",6),
		"Simple Weapons": new kantia.template.npcSkill("Simple Weapons","agility",6),
		"Smell": new kantia.template.npcSkill("Smell","perception",6),
		"Spot": new kantia.template.npcSkill("Spot","perception",6),
		"Street Saavy": new kantia.template.npcSkill("Street Saavy","reasoning",4),
		"Tracking": new kantia.template.npcSkill("Tracking","perception",4),
		"Weapon of Choice (Agility)": new kantia.template.npcSkill("Weapon of Choice (Agility)","agility",8),
		"Weapon of Choice (Perception)": new kantia.template.npcSkill("Weapon of Choice (Perception)","perception",8)
	},
	{
		"Ambidextrious": new kantia.template.npcTrait("Ambidextrious",1),
		"Animal Empathy": new kantia.template.npcTrait("Animal Empathy",1),
		"Branded": new kantia.template.npcTrait("Branded",1),
		"Code of Honor": new kantia.template.npcTrait("Code of Honor",1),
		"Combat Experience": new kantia.template.npcTrait("Combat Experience",1),
		"Habit": new kantia.template.npcTrait("Habit",1),
		"Half-Breed": new kantia.template.npcTrait("Half-Breed",1),
		"Impulsive": new kantia.template.npcTrait("Impulsive",1),
		"Light Footed": new kantia.template.npcTrait("Light Footed",1),
		"Light Sleeper": new kantia.template.npcTrait("Light Sleeper",1),
		"Lone Wolf": new kantia.template.npcTrait("Lone Wolf",1),
		"Lucky": new kantia.template.npcTrait("Lucky",6),
		"Ruthless": new kantia.template.npcTrait("Ruthless",1),
		"Skeptical": new kantia.template.npcTrait("Skeptical",1),
		"Spirit Sink": new kantia.template.npcTrait("Spirit Sink",4),
		"Suave": new kantia.template.npcTrait("Suave",1),
		"Uneducated": new kantia.template.npcTrait("Uneducated",1),
		"Void": new kantia.template.npcTrait("Void",1)
	},
	{
		"Two Weapon Mastery": new kantia.template.npcMastery("Two Weapon Mastery",4),
		"Multiple Attack - 2nd Attack": new kantia.template.npcMastery("Multiple Attack - 2nd Attack",4),
		"Lethal Strike Mastery": new kantia.template.npcMastery("Lethal Strike Mastery",4)
	},
	[
		new kantia.template.npcHC("Intimidating Presence",1),
		new kantia.template.npcHC("Nothing to Lose",1),
		new kantia.template.npcHC("Thich Skinned",1),
		new kantia.template.npcHC("Tough as Nails",1),
		new kantia.template.npcHC("Animal Companion",1),
		new kantia.template.npcHC("Favored Opponent",1),
		new kantia.template.npcHC("Fearless",1),
		new kantia.template.npcHC("Iron Will",1),
		new kantia.template.npcHC("Alert Sleeper",1),
		new kantia.template.npcHC("Psychic Resistance",1),
		new kantia.template.npcHC("Magic Resistance",1),
		new kantia.template.npcHC("Combat Reflexes",4),
		new kantia.template.npcHC("Combat Intuition",4),
		new kantia.template.npcHC("Cool Headed",1),
		new kantia.template.npcHC("Steadfast",1),
		new kantia.template.npcHC("Back to the Wall",1),
		new kantia.template.npcHC("Tactician",1)
	],
	["Chain Shirt","Reinforced Bracers"],
	{
		"melee": kantia.lists.weapons.melee.all.slice(),
		"ranged": kantia.lists.weapons.ranged.all.slice()
	},
	"",
	"These NPCs do not have a preferred set of weapons and most listed weapons in the player's guide are acceptable. Equipment is typically of average quality, sometimes being well worn but usually well kept. Depending upon whether or not the NPC is near his home, he may or may not have more personal posessions besides standard equipment. While not rich, these NPCs tend to carry more money than simple commoners, though they sometimes spend their money un-wisely. Assume these NPCs carry 1d4 gold crowns, 1d8 silver shillings, and 2d10 copper if they would have any reason for carrying their money on their person (or adjust for the campaign).",
	"The fighter template focuses on NPCs that have a talent for traditional melee combat. Many are soldiers, mercenaries, town watch, bandits, and bounty hunters. They are well-skilled and capable individuals that are equally efficient if working alone or with others. They lead rough and often very dangerous lives and their personalities and attitudes will reflect that. NPC Fighters are vaguely classified into three types: basic, expert, and master.",
	[]
);

// Human Fighter, Expert ------------------------------------------------------------------------------
kantia.template.npcs["Human Fighter, Expert"] = new kantia.template.npc(
	"Human Fighter, Expert",
	"Human",
	{
		"strength": new kantia.template.npcAttribute("Strength",10,15,14),
		"size": new kantia.template.npcAttribute("Size",9,14,12),
		"agility": new kantia.template.npcAttribute("Agility",9,14,12),
		"reflexes": new kantia.template.npcAttribute("Reflexes",9,14,12),
		"constitution": new kantia.template.npcAttribute("Constitution",6,12,11),
		"fortitude": new kantia.template.npcAttribute("Fortitude",9,14,13),
		"reasoning": new kantia.template.npcAttribute("Reasoning",6,12,10),
		"willpower": new kantia.template.npcAttribute("Willpower",6,12,10),
		"spirit": new kantia.template.npcAttribute("Spirit",6,12,9),
		"perception": new kantia.template.npcAttribute("Perception",6,12,10)
	},
	{
		"Brawling": new kantia.template.npcSkill("Brawling","agility",8),
		"Climbing": new kantia.template.npcSkill("Climbing","strength",6),
		"Determine Motivation": new kantia.template.npcSkill("Determine Motivation","reasoning",6),
		"Dodge": new kantia.template.npcSkill("Dodge","reflexes",10),
		"Feint": new kantia.template.npcSkill("Feint","reasoning",6),
		"Hide": new kantia.template.npcSkill("Hide",["agility","size"],6),
		"Knowledge Skills": new kantia.template.npcSkill("Knowledge Skills","reasoning",8),
		"Listen": new kantia.template.npcSkill("Listen","perception",6),
		"Move Silently": new kantia.template.npcSkill("Move Silently",["agility","size"],6),
		"Persuasion": new kantia.template.npcSkill("Persuasion","reasoning",6),
		"Professional Skills": new kantia.template.npcSkill("Professional Skills","reasoning",8),
		"Simple Weapons": new kantia.template.npcSkill("Simple Weapons","agility",8),
		"Smell": new kantia.template.npcSkill("Smell","perception",8),
		"Spot": new kantia.template.npcSkill("Spot","perception",8),
		"Street Saavy": new kantia.template.npcSkill("Street Saavy","reasoning",4),
		"Tracking": new kantia.template.npcSkill("Tracking","perception",4),
		"Weapon of Choice (Agility)": new kantia.template.npcSkill("Weapon of Choice (Agility)","agility",12),
		"Weapon of Choice (Perception)": new kantia.template.npcSkill("Weapon of Choice (Perception)","perception",12)
	},
	{
		"Ambidextrious": new kantia.template.npcTrait("Ambidextrious",1),
		"Animal Empathy": new kantia.template.npcTrait("Animal Empathy",1),
		"Branded": new kantia.template.npcTrait("Branded",1),
		"Code of Honor": new kantia.template.npcTrait("Code of Honor",1),
		"Combat Experience": new kantia.template.npcTrait("Combat Experience",1),
		"Habit": new kantia.template.npcTrait("Habit",1),
		"Half-Breed": new kantia.template.npcTrait("Half-Breed",1),
		"Impulsive": new kantia.template.npcTrait("Impulsive",1),
		"Light Footed": new kantia.template.npcTrait("Light Footed",1),
		"Light Sleeper": new kantia.template.npcTrait("Light Sleeper",1),
		"Lone Wolf": new kantia.template.npcTrait("Lone Wolf",1),
		"Lucky": new kantia.template.npcTrait("Lucky",6),
		"Ruthless": new kantia.template.npcTrait("Ruthless",1),
		"Skeptical": new kantia.template.npcTrait("Skeptical",1),
		"Spirit Sink": new kantia.template.npcTrait("Spirit Sink",4),
		"Suave": new kantia.template.npcTrait("Suave",1),
		"Uneducated": new kantia.template.npcTrait("Uneducated",1),
		"Void": new kantia.template.npcTrait("Void",1)
	},
	{
		"Two Weapon Mastery": new kantia.template.npcMastery("Two Weapon Mastery",6),
		"Multiple Attack - 2nd Attack": new kantia.template.npcMastery("Multiple Attack - 2nd Attack",8),
		"Multiple Attack - 3rd Attack": new kantia.template.npcMastery("Multiple Attack - 3rd Attack",4),
		"Lethal Strike Mastery": new kantia.template.npcMastery("Lethal Strike Mastery",6),
		"Weapon Defense": new kantia.template.npcMastery("Weapon Defense",5)
	},
	[
		new kantia.template.npcHC("Alert Sleeper",1),
		new kantia.template.npcHC("Alertness",1),
		new kantia.template.npcHC("Attack Precision",1),
		new kantia.template.npcHC("Animal Companion",1),
		new kantia.template.npcHC("Back to the Wall",1),
		new kantia.template.npcHC("Blind Fighting",1),
		new kantia.template.npcHC("Combat Intuition",4),
		new kantia.template.npcHC("Combat Reflexes",8),
		new kantia.template.npcHC("Commanding Presence",1),
		new kantia.template.npcHC("Cool Headed",1),
		new kantia.template.npcHC("Crippling Strike",1),
		new kantia.template.npcHC("Danger Sense",1),
		new kantia.template.npcHC("Dead Eye Aim",1),
		new kantia.template.npcHC("Favored Opponent",1),
		new kantia.template.npcHC("Fearless",1),
		new kantia.template.npcHC("Flashy Warrior",1),
		new kantia.template.npcHC("Intimidating Presence",1),
		new kantia.template.npcHC("Iron Will",1),
		new kantia.template.npcHC("Killing Blow",1),
		new kantia.template.npcHC("Leadership",1),
		new kantia.template.npcHC("Magic Resistance",1),
		new kantia.template.npcHC("Nothing to Lose",1),
		new kantia.template.npcHC("Psychic Resistance",1),
		new kantia.template.npcHC("Shoot 'em All",1),
		new kantia.template.npcHC("Steadfast",1),
		new kantia.template.npcHC("Tactician",1),
		new kantia.template.npcHC("Take 'em All",1),
		new kantia.template.npcHC("The Stare",1),
		new kantia.template.npcHC("Thich Skinned",2),
		new kantia.template.npcHC("Tough as Nails",2),
		new kantia.template.npcHC("Weapon Shield",1),
		new kantia.template.npcHC("Weapon Technique",1)
	],
	["Chain Shirt","Reinforced Bracers"],
	{
		"melee": kantia.lists.weapons.melee.all.slice(),
		"ranged": kantia.lists.weapons.ranged.all.slice()
	},
	"",
	"Experienced military NPCs like this tend to carry good to high quality equipment. Some of it may actually be much better than standard issue. While they may not always carry money on themselves, it wouldn't be uncommon to find. High-Level fighting types usually carry about 2d6 crowns, 2d12 silver, and 2d10 copper.",
	"The fighter template focuses on NPCs that have a talent for traditional melee combat. Many are soldiers, mercenaries, town watch, bandits, and bounty hunters. They are well-skilled and capable individuals that are equally efficient if working alone or with others. They lead rough and often very dangerous lives and their personalities and attitudes will reflect that. NPC Fighters are vaguely classified into three types: basic, expert, and master.",
	[]
);

// Human Fighter, Master ------------------------------------------------------------------------------
kantia.template.npcs["Human Fighter, Master"] = new kantia.template.npc(
	"Human Fighter, Master",
	"Human",
	{
		"strength": new kantia.template.npcAttribute("Strength",10,15,14),
		"size": new kantia.template.npcAttribute("Size",9,14,12),
		"agility": new kantia.template.npcAttribute("Agility",9,14,13),
		"reflexes": new kantia.template.npcAttribute("Reflexes",9,14,12),
		"constitution": new kantia.template.npcAttribute("Constitution",6,12,12),
		"fortitude": new kantia.template.npcAttribute("Fortitude",9,14,14),
		"reasoning": new kantia.template.npcAttribute("Reasoning",6,12,11),
		"willpower": new kantia.template.npcAttribute("Willpower",6,12,10),
		"spirit": new kantia.template.npcAttribute("Spirit",6,12,9),
		"perception": new kantia.template.npcAttribute("Perception",6,12,10)
	},
	{
		"Brawling": new kantia.template.npcSkill("Brawling","agility",10),
		"Climbing": new kantia.template.npcSkill("Climbing","strength",8),
		"Determine Motivation": new kantia.template.npcSkill("Determine Motivation","reasoning",6),
		"Dodge": new kantia.template.npcSkill("Dodge","reflexes",12),
		"Feint": new kantia.template.npcSkill("Feint","reasoning",8),
		"Hide": new kantia.template.npcSkill("Hide",["agility","size"],8),
		"Knowledge Skills": new kantia.template.npcSkill("Knowledge Skills","reasoning",8),
		"Listen": new kantia.template.npcSkill("Listen","perception",6),
		"Move Silently": new kantia.template.npcSkill("Move Silently",["agility","size"],8),
		"Persuasion": new kantia.template.npcSkill("Persuasion","reasoning",6),
		"Professional Skills": new kantia.template.npcSkill("Professional Skills","reasoning",8),
		"Simple Weapons": new kantia.template.npcSkill("Simple Weapons","agility",8),
		"Smell": new kantia.template.npcSkill("Smell","perception",8),
		"Spot": new kantia.template.npcSkill("Spot","perception",8),
		"Street Saavy": new kantia.template.npcSkill("Street Saavy","reasoning",4),
		"Tracking": new kantia.template.npcSkill("Tracking","perception",6),
		"Weapon of Choice (Agility)": new kantia.template.npcSkill("Weapon of Choice (Agility)","agility",16),
		"Weapon of Choice (Perception)": new kantia.template.npcSkill("Weapon of Choice (Perception)","perception",16)
	},
	{
		"Ambidextrious": new kantia.template.npcTrait("Ambidextrious",1),
		"Animal Empathy": new kantia.template.npcTrait("Animal Empathy",1),
		"Branded": new kantia.template.npcTrait("Branded",1),
		"Code of Honor": new kantia.template.npcTrait("Code of Honor",1),
		"Combat Experience": new kantia.template.npcTrait("Combat Experience",1),
		"Habit": new kantia.template.npcTrait("Habit",1),
		"Half-Breed": new kantia.template.npcTrait("Half-Breed",1),
		"Impulsive": new kantia.template.npcTrait("Impulsive",1),
		"Light Footed": new kantia.template.npcTrait("Light Footed",1),
		"Light Sleeper": new kantia.template.npcTrait("Light Sleeper",1),
		"Lone Wolf": new kantia.template.npcTrait("Lone Wolf",1),
		"Lucky": new kantia.template.npcTrait("Lucky",6),
		"Ruthless": new kantia.template.npcTrait("Ruthless",1),
		"Skeptical": new kantia.template.npcTrait("Skeptical",1),
		"Spirit Sink": new kantia.template.npcTrait("Spirit Sink",4),
		"Suave": new kantia.template.npcTrait("Suave",1),
		"Uneducated": new kantia.template.npcTrait("Uneducated",1),
		"Void": new kantia.template.npcTrait("Void",1)
	},
	{
		"Two Weapon Mastery": new kantia.template.npcMastery("Two Weapon Mastery",8),
		"Multiple Attack - 2nd Attack": new kantia.template.npcMastery("Multiple Attack - 2nd Attack",12),
		"Multiple Attack - 3rd Attack": new kantia.template.npcMastery("Multiple Attack - 3rd Attack",8),
		"Multiple Attack - 4th Attack": new kantia.template.npcMastery("Multiple Attack - 4th Attack",4),
		"Lethal Strike Mastery": new kantia.template.npcMastery("Lethal Strike Mastery",8),
		"Weapon Defense": new kantia.template.npcMastery("Weapon Defense",10)
	},
	[
		new kantia.template.npcHC("Alert Sleeper",1),
		new kantia.template.npcHC("Alertness",1),
		new kantia.template.npcHC("Attack Precision",1),
		new kantia.template.npcHC("Animal Companion",1),
		new kantia.template.npcHC("Back to the Wall",1),
		new kantia.template.npcHC("Blind Fighting",1),
		new kantia.template.npcHC("Combat Intuition",4),
		new kantia.template.npcHC("Combat Reflexes",8),
		new kantia.template.npcHC("Commanding Presence",1),
		new kantia.template.npcHC("Cool Headed",1),
		new kantia.template.npcHC("Crippling Strike",1),
		new kantia.template.npcHC("Danger Sense",1),
		new kantia.template.npcHC("Dead Eye Aim",1),
		new kantia.template.npcHC("Favored Opponent",1),
		new kantia.template.npcHC("Fearless",1),
		new kantia.template.npcHC("Flashy Warrior",1),
		new kantia.template.npcHC("Intimidating Presence",1),
		new kantia.template.npcHC("Iron Will",1),
		new kantia.template.npcHC("Killing Blow",1),
		new kantia.template.npcHC("Leadership",1),
		new kantia.template.npcHC("Magic Resistance",1),
		new kantia.template.npcHC("Nothing to Lose",1),
		new kantia.template.npcHC("Psychic Resistance",1),
		new kantia.template.npcHC("Shoot 'em All",1),
		new kantia.template.npcHC("Steadfast",1),
		new kantia.template.npcHC("Tactician",1),
		new kantia.template.npcHC("Take 'em All",1),
		new kantia.template.npcHC("The Stare",1),
		new kantia.template.npcHC("Thich Skinned",2),
		new kantia.template.npcHC("Tough as Nails",2),
		new kantia.template.npcHC("Weapon Master",1),
		new kantia.template.npcHC("Weapon Shield",1),
		new kantia.template.npcHC("Weapon Technique",1)
	],
	["Chain Shirt","Reinforced Bracers"],
	{
		"melee": kantia.lists.weapons.melee.all.slice(),
		"ranged": kantia.lists.weapons.ranged.all.slice()
	},
	"",
	"Experienced military NPCs like this tend to carry good to high quality equipment. Some of it may actually be much better than standard issue. While they may not always carry money on themselves, it wouldn't be uncommon to find. High-Level fighting types usually carry about 2d6 crowns, 2d12 silver, and 2d10 copper.",
	"The fighter template focuses on NPCs that have a talent for traditional melee combat. Many are soldiers, mercenaries, town watch, bandits, and bounty hunters. They are well-skilled and capable individuals that are equally efficient if working alone or with others. They lead rough and often very dangerous lives and their personalities and attitudes will reflect that. NPC Fighters are vaguely classified into three types: basic, expert, and master.",
	[]
);

// Human Mage, Basic -------------------------------------------------------------------------------
kantia.template.npcs["Human Mage, Basic"] = new kantia.template.npc(
	"Human Mage, Basic",
	"Human",
	{
		"strength": new kantia.template.npcAttribute("Strength",8,11,9),
		"size": new kantia.template.npcAttribute("Size",8,11,9),
		"agility": new kantia.template.npcAttribute("Agility",10,13,11),
		"reflexes": new kantia.template.npcAttribute("Reflexes",11,13,12),
		"constitution": new kantia.template.npcAttribute("Constitution",13,15,14),
		"fortitude": new kantia.template.npcAttribute("Fortitude",9,12,10),
		"reasoning": new kantia.template.npcAttribute("Reasoning",10,13,11),
		"willpower": new kantia.template.npcAttribute("Willpower",10,14,12),
		"spirit": new kantia.template.npcAttribute("Spirit",14,17,15),
		"perception": new kantia.template.npcAttribute("Perception",10,13,11)
	},
	{
		"Brawling": new kantia.template.npcSkill("Brawling","agility",2),
		"Climbing": new kantia.template.npcSkill("Climbing","strength",2),
		"Determine Motivation": new kantia.template.npcSkill("Determine Motivation","reasoning",4),
		"Dodge": new kantia.template.npcSkill("Dodge","reflexes",4),
		"Ethereal Accuracy": new kantia.template.npcSkill("Ethereal Accuracy","willpower",6),
		"Hide": new kantia.template.npcSkill("Hide",["agility","size"],4),
		"Intimidation": new kantia.template.npcSkill("Intimidation","strength",4),
		"Knowledge Skill": new kantia.template.npcSkill("Knowledge Skill","reasoning",6),
		"Listen": new kantia.template.npcSkill("Listen","perception",4),
		"Move Silently": new kantia.template.npcSkill("Move Silently",["agility","size"],4),
		"Persuasion": new kantia.template.npcSkill("Persuasion","reasoning",4),
		"Professional Skill": new kantia.template.npcSkill("Professional Skill","reasoning",6),
		"Simple Weapons": new kantia.template.npcSkill("Simple Weapons","agility",4),
		"Smell": new kantia.template.npcSkill("Smell","perception",4),
		"Spellcraft": new kantia.template.npcSkill("Spellcraft","spirit",8),
		"Spot": new kantia.template.npcSkill("Spot","perception",6),
		"Street Saavy": new kantia.template.npcSkill("Street Saavy","reasoning",4),
	},
	{
		"Stamina": new kantia.template.npcTrait("Stamina",2),
		"Thaumaturge": new kantia.template.npcTrait("Thaumaturge",1)
	},
	{
	},
	[
		new kantia.template.npcHC("Animal Companion",1),
		new kantia.template.npcHC("Blood Magician",1)
	],
	["Leather Jerkin"],
	{
		"melee": ["Dagger","Short Spear, 1H","Short Spear, 2H","Staff"],
		"ranged": ["Dagger","Short Spear"]
	},
	"Choose a magic discipline at rank 4.  Casting rank should be at least rank 6.",
	"These NPCs often have few possessions, although what they do own is often very durable and sturdy. Wilderness types will often carry any survival equipment they need with them at all times, while urban types often only carry what they will need in the immediate future. The average brute has 1d3-1 crowns, 2d6-2 silver, and 2d10 copper.",
	"",
	[]
);

////////////////////////////////////////////////////////////////////////////////////////////////////
// Kobald NPC Templates
////////////////////////////////////////////////////////////////////////////////////////////////////

// Kobald, Common ----------------------------------------------------------------------------------
kantia.template.npcs["Kobald, Common"] = new kantia.template.npc(
	"Kobald, Common",
	"Kobald",
	{
		"strength": new kantia.template.npcAttribute("Strength",4,7,6),
		"size": new kantia.template.npcAttribute("Size",3,5,4),
		"agility": new kantia.template.npcAttribute("Agility",11,15,13),
		"reflexes": new kantia.template.npcAttribute("Reflexes",11,15,13),
		"constitution": new kantia.template.npcAttribute("Constitution",8,12,10),
		"fortitude": new kantia.template.npcAttribute("Fortitude",4,8,8),
		"reasoning": new kantia.template.npcAttribute("Reasoning",8,12,10),
		"willpower": new kantia.template.npcAttribute("Willpower",4,8,6),
		"spirit": new kantia.template.npcAttribute("Spirit",8,12,10),
		"perception": new kantia.template.npcAttribute("Perception",12,16,14)
	},
	{
		"Simple Weapons": new kantia.template.npcSkill("Simple Weapons","agility",2),
		"Dodge": new kantia.template.npcSkill("Dodge","reflexes",6),
		"Brawling": new kantia.template.npcSkill("Brawling","agility",2),
		"Hide": new kantia.template.npcSkill("Hide","special",8),
		"Move Silently": new kantia.template.npcSkill("Move Silently","special",4),
		"Resist Fear": new kantia.template.npcSkill("Resist Fear","spirit",2),
		"Resist Magic": new kantia.template.npcSkill("Resist Magic","spirit",2),
		"Resist Mental": new kantia.template.npcSkill("Resist Mental","willpower",2),
		"Throw": new kantia.template.npcSkill("Throw","agility",4)
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
		"strength": new kantia.template.npcAttribute("Strength",5,9,7),
		"size": new kantia.template.npcAttribute("Size",4,7,5),
		"agility": new kantia.template.npcAttribute("Agility",12,16,14),
		"reflexes": new kantia.template.npcAttribute("Reflexes",13,17,15),
		"constitution": new kantia.template.npcAttribute("Constitution",10,14,12),
		"fortitude": new kantia.template.npcAttribute("Fortitude",5,9,7),
		"reasoning": new kantia.template.npcAttribute("Reasoning",6,10,8),
		"willpower": new kantia.template.npcAttribute("Willpower",4,8,6),
		"spirit": new kantia.template.npcAttribute("Spirit",7,11,9),
		"perception": new kantia.template.npcAttribute("Perception",12,16,14)
	},
	{
		"Melee Weapon": new kantia.template.npcSkill("Melee Weapon","agility",7),
		"Dodge": new kantia.template.npcSkill("Dodge","reflexes",7),
		"Archery": new kantia.template.npcSkill("Archery","agility",6),
		"Crossbow": new kantia.template.npcSkill("Crossbow","perception",6),
		"Brawling": new kantia.template.npcSkill("Brawling","agility",5),
		"Throw": new kantia.template.npcSkill("Throw","agility",9),
		"Resist Fear": new kantia.template.npcSkill("Resist Fear","spirit",6),
		"Resist Magic": new kantia.template.npcSkill("Resist Magic","spirit",2),
		"Resist Mental": new kantia.template.npcSkill("Resist Mental","willpower",2),
		"Hide": new kantia.template.npcSkill("Hide","special",10),
		"Move Silently": new kantia.template.npcSkill("Move Silently","special",6)
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
		"strength": new kantia.template.npcAttribute("Strength",4,7,6),
		"size": new kantia.template.npcAttribute("Size",3,5,4),
		"agility": new kantia.template.npcAttribute("Agility",11,15,13),
		"reflexes": new kantia.template.npcAttribute("Reflexes",11,15,13),
		"constitution": new kantia.template.npcAttribute("Constitution",9,13,11),
		"fortitude": new kantia.template.npcAttribute("Fortitude",4,8,6),
		"reasoning": new kantia.template.npcAttribute("Reasoning",12,16,14),
		"willpower": new kantia.template.npcAttribute("Willpower",10,14,12),
		"spirit": new kantia.template.npcAttribute("Spirit",14,18,16),
		"perception": new kantia.template.npcAttribute("Perception",12,16,14)
	},
	{
		"Archery": new kantia.template.npcSkill("Archery","agility",2),
		"Crossbow": new kantia.template.npcSkill("Crossbow","perception",2),
		"Dodge": new kantia.template.npcSkill("Dodge","reflexes",6),
		"Hide": new kantia.template.npcSkill("Hide","special",8),
		"Listen": new kantia.template.npcSkill("Listen","perception",10),
		"Move Silently": new kantia.template.npcSkill("Move Silently","special",6),
		"Spot": new kantia.template.npcSkill("Spot","perception",10),
		"Alchemy": new kantia.template.npcSkill("Alchemy","reasoning",6),
		"Brawling": new kantia.template.npcSkill("Brawling","agility",3),
		"Concentration": new kantia.template.npcSkill("Concentration","willpower",8),
		"Ethereal Accuracy": new kantia.template.npcSkill("Etheral Accuracy","willpower",0),
		"Melee Weapon": new kantia.template.npcSkill("Melee Weapon","agility",4),
		"Persuasion": new kantia.template.npcSkill("Persuasion","reasoning",8),
		"Smell": new kantia.template.npcSkill("Smell","perception",5),
		"Spellcraft": new kantia.template.npcSkill("Spellcraft","reasoning",5),
		"Throw": new kantia.template.npcSkill("Throw","agility",4),
		"Tracking": new kantia.template.npcSkill("Tracking","perception",4),
	},
	{
		"Psychic Void": "Psychic Void",
		"Photosensitive": "Photosensitive",
		"Darkvision": "Darkvision",
		"Thaumaturge": "Thaumaturge"
	},
	[],
	{
		"melee": ["Short Sword","Dagger","Hand Axe","Footman's Pick","Short Spear, 1H","Short Spear, 2H"],
		"ranged": ["Dagger","Short Spear"]
	},
	"Only female kobalds are capable of sorcery. If a thaumaturge is born, she is capable of learning any discipline, although most prefer enchantment, earth elementalism, transmutation, shadowmancy, and illusion. Typically a kobald sorcerer will have between 4 and 16 ranks in her primary discipline and each of the individual spell skills. Her discipline casting rank is typically equal to her discipline rank. Multi-disciplinary sorcerers are uncommon, but not unheard of."
);

////////////////////////////////////////////////////////////////////////////////////////////////////
// Animal NPC Templates
////////////////////////////////////////////////////////////////////////////////////////////////////

// Wolf --------------------------------------------------------------------------------------------
kantia.template.npcs["Wolf"] = new kantia.template.npc(
	"Wolf",
	"Wolf",
	{
		"strength": new kantia.template.npcAttribute("Strength",4,13,8),
		"size": new kantia.template.npcAttribute("Size",4,13,8),
		"agility": new kantia.template.npcAttribute("Agility",9,20,16),
		"reflexes": new kantia.template.npcAttribute("Reflexes",9,20,16),
		"constitution": new kantia.template.npcAttribute("Constitution",6,16,12),
		"fortitude": new kantia.template.npcAttribute("Fortitude",6,15,10),
		"reasoning": new kantia.template.npcAttribute("Reasoning",2,5,4),
		"willpower": new kantia.template.npcAttribute("Willpower",3,9,6),
		"spirit": new kantia.template.npcAttribute("Spirit",3,9,6),
		"perception": new kantia.template.npcAttribute("Perception",10,24,16)
	},
	{
		"Bite": new kantia.template.npcSkill("Bite","agility",6),
		"Climbing": new kantia.template.npcSkill("Climbing","strength",0),
		"Dodge": new kantia.template.npcSkill("Dodge","reflexes",12),
		"Feint": new kantia.template.npcSkill("Feint","reasoning",8),
		"Hide": new kantia.template.npcSkill("Hide",["agility","size"],6),
		"Listen": new kantia.template.npcSkill("Listen","perception",12),
		"Move Silently": new kantia.template.npcSkill("Move Silently",["agility","size"],6),
		"Resist Fear": new kantia.template.npcSkill("Resist Fear","fortitude",6), 
		"Resist Magic": new kantia.template.npcSkill("Resist Magic","spirit",5),
		"Resist Mental": new kantia.template.npcSkill("Resist Mental","spirit",5),
		"Smell": new kantia.template.npcSkill("Smell","perception",12),
		"Spot": new kantia.template.npcSkill("Spot","perception",6),
		"Tracking": new kantia.template.npcSkill("Tracking","perception",8)
	},
	{
		"Low Light Vision": new kantia.template.npcTrait("Low Light Vision",1),
		"Sense of Smell": new kantia.template.npcTrait("Sense of Smell",1)
	},
	{},
	[],
	[],
	{
		"melee": ["Bite (Wolf)"],
		"ranged": []
	},
	"",
	"These NPCs often have few possessions, although what they do own is often very durable and sturdy. Wilderness types will often carry any survival equipment they need with them at all times, while urban types often only carry what they will need in the immediate future. The average brute has 1d3-1 crowns, 2d6-2 silver, and 2d10 copper.",
	"Wolves are large canines that live in packs. Normally, wolves will not attack humans except during lean times. Wolves are intelligent and can be domesticated, although only wolves raised in captivity from a pup are truly worthwhile as pets or companions. Even then, a wolf is still a very dangerous pet.  A lone wolf will usually attempt to avoid conflict with other creatures, but a pack of wolves will use flanking tactics, one group of wolves feinting and fighting defensively while another group will force an attack upon the flanks and rear of their prey.",
	[]
);