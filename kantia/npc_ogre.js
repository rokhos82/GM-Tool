////////////////////////////////////////////////////////////////////////////////////////////////////
// Ogre NPC Templates
////////////////////////////////////////////////////////////////////////////////////////////////////
var race = "Ogre";

// Ogre Brute, Basic -------------------------------------------------------------------------------
var name = "Orge Brute, Basic";
kantia.template.npcs[name] = new kantia.template.npc(
	name,
	race,
	{
		"strength": new kantia.template.npcAttribute("Strength",20,26,22),
		"size": new kantia.template.npcAttribute("Size",20,30,24),
		"agility": new kantia.template.npcAttribute("Agility",6,12,8),
		"reflexes": new kantia.template.npcAttribute("Reflexes",6,12,8),
		"constitution": new kantia.template.npcAttribute("Constitution",13,15,14),
		"fortitude": new kantia.template.npcAttribute("Fortitude",15,20,18),
		"reasoning": new kantia.template.npcAttribute("Reasoning",4,10,4),
		"willpower": new kantia.template.npcAttribute("Willpower",4,10,6),
		"spirit": new kantia.template.npcAttribute("Spirit",4,10,6),
		"perception": new kantia.template.npcAttribute("Perception",6,12,10)
	},
	{
		"Climbing": new kantia.template.npcSkill("Climbing","strength",4),
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
		"Smell": new kantia.template.npcSkill("Smell","perception",4),
		"Spot": new kantia.template.npcSkill("Spot","perception",6),
		"Street Savy": new kantia.template.npcSkill("Street Savy","reasoning",4),
		"Melee": new kantia.template.npcSkill("Melee","agility",8)
	},
	{
		"Adrenaline Control": new kantia.template.npcTrait("Adrenaline Control",1),
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
		"Leathal Strike Mastery": new kantia.template.npcMastery("Leathal Strike Mastery",4),
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
		new kantia.template.npcHC("Take'em All",1),
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

// Ogre Brute, Expert ------------------------------------------------------------------------------
var name = "Orge Brute, Expert";
kantia.template.npcs[name] = new kantia.template.npc(
	name,
	race,
	{
		"strength": new kantia.template.npcAttribute("Strength",20,26,24),
		"size": new kantia.template.npcAttribute("Size",20,30,26),
		"agility": new kantia.template.npcAttribute("Agility",6,12,8),
		"reflexes": new kantia.template.npcAttribute("Reflexes",6,12,8),
		"constitution": new kantia.template.npcAttribute("Constitution",13,15,15),
		"fortitude": new kantia.template.npcAttribute("Fortitude",15,20,19),
		"reasoning": new kantia.template.npcAttribute("Reasoning",4,10,5),
		"willpower": new kantia.template.npcAttribute("Willpower",4,10,6),
		"spirit": new kantia.template.npcAttribute("Spirit",4,10,6),
		"perception": new kantia.template.npcAttribute("Perception",6,12,10)
	},
	{
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
		"Smell": new kantia.template.npcSkill("Smell","perception",6),
		"Spot": new kantia.template.npcSkill("Spot","perception",8),
		"Street Saavy": new kantia.template.npcSkill("Street Saavy","reasoning",6),
		"Melee": new kantia.template.npcSkill("Melee","agility",12),
		"Aim (AGL)": new kantia.template.npcSkill("Aim (AGL)","agility",12),
		"Aim (PER)": new kantia.template.npcSkill("Aim (PER)","perception",12)
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
		new kantia.template.npcHC("Take'em All",2),
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

// Ogre Brute, Master ------------------------------------------------------------------------------
var name = "Orge Brute, Master"
kantia.template.npcs[name] = new kantia.template.npc(
	name,
	race,
	{
		"strength": new kantia.template.npcAttribute("Strength",20,26,24),
		"size": new kantia.template.npcAttribute("Size",20,30,26),
		"agility": new kantia.template.npcAttribute("Agility",6,12,8),
		"reflexes": new kantia.template.npcAttribute("Reflexes",6,12,8),
		"constitution": new kantia.template.npcAttribute("Constitution",13,15,15),
		"fortitude": new kantia.template.npcAttribute("Fortitude",15,20,19),
		"reasoning": new kantia.template.npcAttribute("Reasoning",4,10,5),
		"willpower": new kantia.template.npcAttribute("Willpower",4,10,6),
		"spirit": new kantia.template.npcAttribute("Spirit",4,10,6),
		"perception": new kantia.template.npcAttribute("Perception",6,12,10)
	},
	{
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
		"Smell": new kantia.template.npcSkill("Smell","perception",6),
		"Spot": new kantia.template.npcSkill("Spot","perception",8),
		"Street Saavy": new kantia.template.npcSkill("Street Saavy","reasoning",6),
		"Melee": new kantia.template.npcSkill("Melee","agility",12),
		"Aim (AGL)": new kantia.template.npcSkill("Aim (AGL)","agility",12),
		"Aim (PER)": new kantia.template.npcSkill("Aim (PER)","perception",12)
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
		new kantia.template.npcHC("Take'em All",2),
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