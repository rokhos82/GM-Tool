var kantia = {};

kantia.lists = {};

////////////////////////////////////////////////////////////////////////////////////////////////////
// Object Templates
////////////////////////////////////////////////////////////////////////////////////////////////////
kantia.template = {};

kantia.template.race = function() {
	this.attributes = {
		strength: 0,
		size: 0,
		agility: 0,
		reflexes: 0,
		constitution: 0,
		fortitude: 0,
		reasoning: 0,
		willpower: 0,
		spirit: 0,
		perception: 0
	};
	this.skills = {};
	this.hitpoints = {
		wound: 0,
		bludgeon: 0
	};
	this.defense = {};
};

kantia.template.skill = function(name,attr) {
	this.name = name;
	this.attribute = attr;
};

// -------------------------------------------------------------------------------------------------
kantia.attributes = {};
kantia.attributes.adjust = {
	1: -45,
	2: -36,
	3: -28,
	4: -21,
	5: -15,
	6: -10,
	7: -6,
	8: -3,
	9: -1
};

// Height according to size in inches
kantia.attributes.height = {
	1: 20,
	2: 30,
	3: 36,
	4: 41,
	5: 47,
	6: 51,
	7: 55,
	8: 59,
	9: 62,
	10: 66,
	11: 70,
	12: 72,
	13: 76,
	14: 79,
	15: 81,
	16: 84,
	17: 87,
	18: 89,
	19: 91,
	20: 94,
	21: 96,
	22: 99,
	23: 101,
	24: 103,
	25: 105,
	26: 108,
	27: 110,
	28: 111,
	29: 113,
	30: 115
};

kantia.races = {
	"dwarf": "Dwarf",
	"human": "Human",
	"lukoi": "Lukoi",
	"troll": "Troll",
	"bugbear": "Bugbear",
	"felineshuri": "Shuri - Feline",
	"lupineshuri": "Shuri - Lupine",
	"reptileshuri": "Shuri - Reptilian",
	"avianshuri": "Shuri - Avian",
	"fae": "Fae",
	"shou": "Shou",
	"ogre": "Ogre",
	"snakemen": "Snakemen",
	"lizardmen": "Lizardmen",
	"gatormen": "Gatormen",
	"goblin": "Goblin",
	"hobgoblin": "Hobgoblin"
};

kantia.race = {};
kantia.race["npc"] = new kantia.template.race();
kantia.race["human"] = new kantia.template.race();

kantia.race["wolf"] = new kantia.template.race();
kantia.race["wolf"].defense = {
	absorb: 1
}

kantia.race["dwarf"] = new kantia.template.race();
kantia.race["dwarf"].attributes.agility = -2;
kantia.race["dwarf"].attributes.constitution = 2;
kantia.race["dwarf"].attributes.fortitude = 2;
kantia.race["dwarf"].attributes.spirit = -2;

kantia.race["lukoi"] = new kantia.template.race();
kantia.race["lukoi"].attributes.strength = 2;
kantia.race["lukoi"].attributes.size = 2;
kantia.race["lukoi"].attributes.fortitude = 2;
kantia.race["lukoi"].attributes.perception = 2;
kantia.race["lukoi"].skills = {
	"tracking": 20,
	"handguns": -10,
	"climbing": -20
};

kantia.race["troll"] = new kantia.template.race();
kantia.race["troll"].attributes.strength = 4;
kantia.race["troll"].attributes.size = 4;
kantia.race["troll"].attributes.agility = 2;
kantia.race["troll"].attributes.reflexes = 2;
kantia.race["troll"].attributes.constitution = 10;
kantia.race["troll"].attributes.reasoning = -4;
kantia.race["troll"].attributes.spirit = -2;
kantia.race["troll"].attributes.willpower = -2;
kantia.race["troll"].attributes.perception = 4;
kantia.race["troll"].skills = {
	"Throw": -10,
	"Archery": -10
};
kantia.race["troll"].hitpoints.wound = 2;
kantia.race["troll"].hitpoints.bludgeon = 2;
kantia.race["troll"].defense = {
	absorb: 1,
	agldr: 5,
	defdr: 5
};

kantia.race["bugbear"] = new kantia.template.race();
kantia.race["bugbear"].attributes.strength = 5;
kantia.race["bugbear"].attributes.size = 5;
kantia.race["bugbear"].attributes.agility = 2;
kantia.race["bugbear"].attributes.reflexes = 2;
kantia.race["bugbear"].attributes.constitution = 4;
kantia.race["bugbear"].attributes.fortitude = 2;
kantia.race["bugbear"].attributes.reasoning = -4;
kantia.race["bugbear"].attributes.willpower = -4;
kantia.race["bugbear"].attributes.spirit = -2;
kantia.race["bugbear"].attributes.perception = 2;
kantia.race["bugbear"].skills = {
	"resist fear": 20
};

kantia.race["felineshuri"] = new kantia.template.race();
kantia.race["felineshuri"].attributes.strength = -2;
kantia.race["felineshuri"].attributes.size = -2;
kantia.race["felineshuri"].attributes.agility = 4;
kantia.race["felineshuri"].attributes.reflexes = 2;
kantia.race["felineshuri"].attributes.fortitude = -2;
kantia.race["felineshuri"].attributes.spirit = 2;
kantia.race["felineshuri"].attributes.perception = 2;
kantia.race["felineshuri"].skills = {
	meditation: 10
};

kantia.race["lupineshuri"] = new kantia.template.race();
kantia.race["lupineshuri"].attributes.agility = 2;
kantia.race["lupineshuri"].attributes.perception = 2;
kantia.race["lupineshuri"].skills = {
	meditation: 10
};

kantia.race["reptilianshuri"] = new kantia.template.race();
kantia.race["reptilianshuri"].attributes.strength = -2;
kantia.race["reptilianshuri"].attributes.size = -2;
kantia.race["reptilianshuri"].attributes.agility = 2;
kantia.race["reptilianshuri"].attributes.reflexes = 4;
kantia.race["reptilianshuri"].attributes.fortitude = -2;
kantia.race["reptilianshuri"].attributes.willpower = 4;
kantia.race["reptilianshuri"].skills = {
	meditation: 10
};

kantia.race["avianshuri"] = new kantia.template.race();
kantia.race["avianshuri"].attributes.strength = -4;
kantia.race["avianshuri"].attributes.size = -4;
kantia.race["avianshuri"].attributes.agility = 2;
kantia.race["avianshuri"].attributes.fortitude = -4;
kantia.race["avianshuri"].attributes.reasoning = 4;
kantia.race["avianshuri"].attributes.willpower = 2;
kantia.race["avianshuri"].attributes.spirit = 6;
kantia.race["avianshuri"].attributes.perception = 6;
kantia.race["avianshuri"].skills = {
	meditation: 10
};

kantia.race["fae"] = new kantia.template.race();
kantia.race["fae"].attributes.strength = -2;
kantia.race["fae"].attributes.size = -2;
kantia.race["fae"].attributes.agility = 2;
kantia.race["fae"].attributes.fortitude = -2;
kantia.race["fae"].attributes.spirit = 2;
kantia.race["fae"].attributes.perception = 2;

kantia.race["shou"] = new kantia.template.race();
kantia.race["shou"].attributes.agility = 2;
kantia.race["shou"].attributes.reflexes = 2;
kantia.race["shou"].attributes.perception = 2;
kantia.race["shou"].skills["persuasion"] = 10;

kantia.race["ogre"] = new kantia.template.race();
kantia.race["ogre"].attributes.strength = 8;
kantia.race["ogre"].attributes.size = 10;
kantia.race["ogre"].attributes.agility = -2;
kantia.race["ogre"].attributes.reflexes = -2;
kantia.race["ogre"].attributes.fortitude = 4;
kantia.race["ogre"].attributes.reasoning = -4;
kantia.race["ogre"].attributes.willpower = -2;
kantia.race["ogre"].attributes.spirit = -2;

kantia.race["snakemen"] = new kantia.template.race();
kantia.race["snakemen"].attributes.strength = -2;
kantia.race["snakemen"].attributes.size = -2;
kantia.race["snakemen"].attributes.agility = 6;
kantia.race["snakemen"].attributes.reflexes = 6;
kantia.race["snakemen"].attributes.fortitude = -2;

kantia.race["lizardmen"] = new kantia.template.race();
kantia.race["lizardmen"].attributes.strength = 2;
kantia.race["lizardmen"].attributes.size = 2;
kantia.race["lizardmen"].attributes.agility = 2;
kantia.race["lizardmen"].attributes.relfexes = 2;
kantia.race["lizardmen"].attributes.constitution = 2;
kantia.race["lizardmen"].attributes.fortitude = 2;
kantia.race["lizardmen"].attributes.reasoning = -2;
kantia.race["lizardmen"].attributes.willpower = -2;
kantia.race["lizardmen"].attributes.spirit = -2;

kantia.race["gatormen"] = new kantia.template.race();
kantia.race["gatormen"].attributes.strength = 6;
kantia.race["gatormen"].attributes.size = 6;
kantia.race["gatormen"].attributes.fortitude = 4;
kantia.race["gatormen"].attributes.reasoning = -4;
kantia.race["gatormen"].attributes.willpower = -2;
kantia.race["gatormen"].attributes.spirit = -2;
kantia.race["gatormen"].attributes.perception = -2;

kantia.race["goblin"] = new kantia.template.race();
kantia.race["goblin"].attributes.strength = -4;
kantia.race["goblin"].attributes.size = -4;
kantia.race["goblin"].attributes.agility = 2;
kantia.race["goblin"].attributes.reflexes = 2;
kantia.race["goblin"].attributes.fortitude = -4;
kantia.race["goblin"].attributes.willpower = -2;
kantia.race["goblin"].attributes.perception = 4;

kantia.race["hobgoblin"] = new kantia.template.race();
kantia.race["hobgoblin"].attributes.strength = 1;
kantia.race["hobgoblin"].attributes.size = 1;
kantia.race["hobgoblin"].attributes.agility = 1;
kantia.race["hobgoblin"].attributes.reflexes = 1;
kantia.race["hobgoblin"].attributes.constitution = 1;
kantia.race["hobgoblin"].attributes.fortitude = 1;
kantia.race["hobgoblin"].attributes.willpower = -2;
kantia.race["hobgoblin"].attributes.spirit = -2;

kantia.skills = {};

/*kantia.skills = {
	"alchemy": "Alchemy",
	"animal handling": "Animal Handling",
	"appraisal": "Appraisal",
	"archery": "Archery",
	"art": "Art",
	"automatic handguns": "Automatic Handguns",
	"automatic rifles": "Automatic Rifles",
	"bowyer/fletcher": "Bowyer/Fletcher",
	"brawling": "Brawling",
	"climbing": "Climbing",
	"concentration": "Concentration",
	"countering": "Countering",
	"crossbow": "Crossbow",
	"deceit": "Deceit",
	"demolitions": "Demolitions",
	"determine motive": "Determine Motive",
	"disarm/create trap": "Disarm/Create Trap",
	"discipline: abjuration": "Discipline: Abjuration",
	"discipline: arcane": "Discipline: Arcane",
	"discipline: conjuration": "Discipline: Conjuration",
	"discipline: diviniation": "Discipline: Divination",
	"discipline: enchantment": "Discipline: Enchantment",
	"disguise": "Disguise",
	"dodge": "Dodge",
	"ethereal accuracy": "Ethereal Accuracy",
	"fast draw": "Fast Draw",
	"feint": "Feint",
	"first aid": "First Aid",
	"flora/fauna": "Flora/Fauna",
	"forgery": "Forgery",
	"gunsmith": "Gunsmith",
	"gymnastics": "Gymnastics",
	"handgun": "Handgun",
	"herbalism": "Herbalism",
	"hide": "Hide",
	"hunting/fishing": "Hunting/Fishing",
	"information gathering": "Information Gathering",
	"inspire": "Inspire",
	"intimidation": "Intimidation",
	"investigations": "Investigations",
	"knowledge": "Knowledge",
	"listen": "Listen",
	"lock picking": "Lock Picking",
	"martial arts": "Martial Arts",
	"resist fear": "Resist Fear",
	"resist magic": "Resist Magic",
	"resist mental": "Resist Mental",
	"rifles": "Rifles",
	"simple weapons": "Simple Weapons",
	"spot": "Spot",
	"swim": "Swim",
	"throw": "Throw",
	"weapon group: common swords": "Weapon Group: Common Swords",
	"weapon group: heavy swords": "Weapon Group: Heavy Swords",
	"weapon group: light swords": "Weapon Group: Light Swords",
	"weapon group: exotic blades": "Weapon Group: Exotic Blades",
	"weapon group: axes": "Weapon Group: Axes",
	"weapon group: pole weapons": "Weapon Group: Pole Weapons",
	"weapon group: bludgeons": "Weapon Group: Bludgeons",
	"weapon group: primitive": "Weapon Group: Primitive",
	"weapon group: dwarven military": "Weapon Group: Dwarven Military",
	"weapon group: common military": "Weapon Group: Common Military",
	"weapon group: martial arts": "Weapon Group: Martial Arts",
	"weapon group: woodland": "Weapon Group: Woodland"
};

kantia.skill = {};
kantia.skill.adjusts = {
	"Alchemy": "reasoning",
	"Animal Handling": "willpower",
	"Appraisal": "reasoning",
	"Archery": "agility",
	"Art": "perception",
	"Automatic Handguns": "agility",
	"Automatic Rifles": "agility",
	"Bowyer/Fletcher": "reasoning",
	"Brawling": "agility",
	"Climbing": "agility",
	"Concentration": "willpower",
	"Countering": "spirit",
	"Crossbow": "perception",
	"Deceit": "reasoning",
	"Demolitions": "reasoning",
	"Determine Motive": "reasoning",
	"Disarm/Create Trap": "reasoning",
	"Discipline: Abjuration": "spirit",
	"Discipline: Arcane": "spirit",
	"Discipline: Conjuration": "spirit",
	"Discipline: Divination": "spirit",
	"Discipline: Enchantment": "spirit",
	"Disguise": "perception",
	"Dodge": "reflexes",
	"Ethereal Accuracy": "willpower",
	"Fast Draw": "reflexes",
	"Feint": "reasoning",
	"First Aid": "reasoning",
	"Flora/Fauna": "reasoning",
	"Forgery": "reasoning",
	"Gunsmith": "reasoning",
	"Gymnastics": "agility",
	"Handgun": "agility",
	"Herbalism": "reasoning",
	"Hide": "agility",
	"Hunting/Fishing": "perception",
	"Information Gathering": "reasoning",
	"Inspire": "spirit",
	"Intimidation": "strength",
	"Investigations": "reasoning",
	"Knowledge": "reasoning",
	"Listen": "perception",
	"Lock Picking": "reasoning",
	"Martial Arts": "agility",
	"Rifles": "perception",
	"Simple Weapons": "agility",
	"Weapon Group: Common Swords": "agility",
	"Weapon Group: Heavy Swords": "agility",
	"Weapon Group: Light Swords": "agility",
	"Weapon Group: Exotic Blades": "agility",
	"Weapon Group: Axes": "agility",
	"Weapon Group: Pole Weapons": "agility",
	"Weapon Group: Bludgeons": "agility",
	"Weapon Group: Primitive": "agility",
	"Weapon Group: Dwarven Military": "agility",
	"Weapon Group: Common Military": "agility",
	"Weapon Group: Martial Arts": "agility",
	"Weapon Group: Woodland": "agility",
	"Spot": "perception",
	"Resist Fear": "size",
	"Resist Mental": "willpower",
	"Resist Magic": "spirit",
	"Swim": "strength",
	"Throw": "agility"
};//*/

kantia.masteries = {
	"Defense Mastery": "Defense Mastery",
	"Disarm Mastery": "Disarm Mastery",
	"Lethal Strike Mastery": "Lethal Strike Mastery",
	"Multiple Attack Specialty": "Multiple Attack Specialty",
	"Shield Specialty": "Shield Specialty",
	"Two-Weapon Mastery": "Two-Weapon Mastery",
	"Unarmed Specialty": "Unarmed Specialty"
};

kantia.mastery = {};
/*kantia.mastery["Lethal Strike Mastery"] = {
	1: {staging: 0, damage: 0},
	2: {staging: 1, damage: 0},
	3: {staging: 1, damage: 0},
	4: {staging: 1, damage: 1},
	5: {staging: 2, damage: 1},
	6: {staging: 2, damage: 1},
	7: {staging: 2, damage: 1},
	8: {staging: 3, damage: 2},
	9: {staging: 3, damage: 2},
	10: {staging: 3, damage: 2},
	11: {staging: 4, damage: 2},
	12: {staging: 4, damage: 3},
	13: {staging: 4, damage: 3},
	14: {staging: 5, damage: 3},
	15: {staging: 5, damage: 3},
	16: {staging: 5, damage: 4},
};//*/
kantia.mastery.effects = {};
kantia.mastery.effects["Lethal Strike Mastery"] = {
	1: "staging: 0, damage: 0",
	2: "staging: 1, damage: 0",
	3: "staging: 1, damage: 0",
	4: "staging: 1, damage: 1",
	5: "staging: 2, damage: 1",
	6: "staging: 2, damage: 1",
	7: "staging: 2, damage: 1",
	8: "staging: 3, damage: 2",
	9: "staging: 3, damage: 2",
	10: "staging: 3, damage: 2",
	11: "staging: 4, damage: 2",
	12: "staging: 4, damage: 3",
	13: "staging: 4, damage: 3",
	14: "staging: 5, damage: 3",
	15: "staging: 5, damage: 3",
	16: "staging: 5, damage: 4"
};

kantia.mastery.effects["Disarm Mastery"] = {
	1: "disarm bonus: 0",
	2: "disarm bonus: 5",
	3: "disarm bonus: 5",
	4: "disarm bonus: 10",
	5: "disarm bonus: 10",
	6: "disarm bonus: 15",
	7: "disarm bonus: 15",
	8: "disarm bonus: 20",
	9: "disarm bonus: 20",
	10: "disarm bonus: 25",
	11: "disarm bonus: 25",
	12: "disarm bonus: 30",
	13: "disarm bonus: 30",
	14: "disarm bonus: 35",
	15: "disarm bonus: 35",
	16: "disarm bonus: 40"
};

kantia.mastery.effects["Unarmed Specialty"] = {
	1: "diff reduction: 0, staging: 0, damage: 0",
	2: "diff reduction: 5, staging: 1, damage: 0",
	3: "diff reduction: 5, staging: 1, damage: 0",
	4: "diff reduction: 10, staging: 1, damage: 1",
	5: "diff reduction: 10, staging: 2, damage: 1",
	6: "diff reduction: 15, staging: 2, damage: 1",
	7: "diff reduction: 15, staging: 2, damage: 1",
	8: "diff reduction: 20, staging: 3, dlamage: 2",
	9: "diff reduction: 20, staging: 3, damage: 2",
	10: "diff reduction: 25, staging: 3, damage: 2",
	11: "diff reduction: 25, staging: 4, damage: 2",
	12: "diff reduction: 30, staging: 4, damage: 3",
	13: "diff reduction: 30, staging: 4, damage: 3",
	14: "diff reduction: 35, staging: 5, damage: 3",
	15: "diff reduction: 35, staging: 5, damage: 3",
	16: "diff reduction: 40, staging: 5, damage: 4"
};

kantia.mastery.effects["Shield Specialty"] = {
	1: "block bonus: 0, dr bonus: 0",
	2: "block bonus: 5, dr bonus: 0",
	3: "block bonus: 5, dr bonus: 0",
	4: "block bonus: 10, dr bonus: 0",
	5: "block bonus: 10, dr bonus: 5",
	6: "block bonus: 15, dr bonus: 5",
	7: "block bonus: 15, dr bonus: 5",
	8: "block bonus: 20, dr bonus: 5",
	9: "block bonus: 20, dr bonus: 5",
	10: "block bonus: 25, dr bonus: 10",
	11: "block bonus: 25, dr bonus: 10",
	12: "block bonus: 30, dr bonus: 10",
	13: "block bonus: 30, dr bonus: 10",
	14: "block bonus: 35, dr bonus: 10",
	15: "block bonus: 35, dr bonus: 15",
	16: "block bonus: 40, dr bonus: 15"
};

kantia.mastery.effects["Defense Mastery"] = {
	1: "block bonus: 0, dr bonus: 0",
	2: "block bonus: 5, dr bonus: 0",
	3: "block bonus: 5, dr bonus: 0",
	4: "block bonus: 10, dr bonus: 0",
	5: "block bonus: 10, dr bonus: 5",
	6: "block bonus: 15, dr bonus: 5",
	7: "block bonus: 15, dr bonus: 5",
	8: "block bonus: 20, dr bonus: 5",
	9: "block bonus: 20, dr bonus: 5",
	10: "block bonus: 25, dr bonus: 10",
	11: "block bonus: 25, dr bonus: 10",
	12: "block bonus: 30, dr bonus: 10",
	13: "block bonus: 30, dr bonus: 10",
	14: "block bonus: 35, dr bonus: 10",
	15: "block bonus: 35, dr bonus: 15",
	16: "block bonus: 40, dr bonus: 15"
};

kantia.mastery.effects["Multiple Attack Specialty"] = {
	1: "+1 AV",
	2: "+2 AV",
	3: "+3 AV",
	4: "+4 AV",
	5: "+5 AV",
	6: "+6 AV",
	7: "+7 AV",
	8: "+8 AV",
	9: "+9 AV",
	10: "+10 AV",
	11: "+11 AV",
	12: "+12 AV",
	13: "+13 AV",
	14: "+14 AV",
	15: "+15 AV",
	16: "+16 AV"
};

kantia.mastery.effects["Two-Weapon Mastery"] = {
	1: "av penalty: good -30, off -45, ambi -25",
	2: "av penalty: good -25, off -45, ambi -20",
	3: "av penalty: good -25, off -40, ambi -20",
	4: "av penalty: good -20, off -40, ambi -15",
	5: "av penalty: good -20, off -35, ambi -15",
	6: "av penalty: good -15, off -35, ambi -10",
	7: "av penalty: good -15, off -30, ambi -10",
	8: "av penalty: good -10, off -30, ambi -5",
	9: "av penalty: good -10, off -25, ambi -5",
	10: "av penalty: good -5, off -25, ambi 0",
	11: "av penalty: good -5, off -20, ambi 0; blocking bonus: ambi +5",
	12: "av penalty: good 0, off -20, ambi 0; blocking bonus: ambi +5",
	13: "av penalty: good 0, off -15, ambi 0; blocking bonus: ambi +10",
	14: "av penalty: good 0, off -15, ambi 0; blocking bonus: normal +5, ambi +10",
	15: "av penalty: good 0, off -10, ambi 0; blocking bonus: normal +5, ambi +15",
	16: "av penalty: good 0, off -10, ambi 0; blocking bonus: normal +10, ambi +15"
};

kantia.func = {};
kantia.func.skillArray = function(skills) {
	var arr = {};
	for(var s in skills) {
		arr[s] = skills[s].name;
	};
	return arr;
};

kantia.func.armorPenalties = function(armorDAT,pen_array) {
	var pen = {
		i: 0,
		r: 0,
		p: 0,
		ar: 0,
		sp: 0
	};
	
	for(var a in armorDAT) {
		var armor = armorDAT[a];
		
		for(var y in pen_array) {
			var p = pen_array[y];
			if(armor.penalties[p])
				pen[p] += armor.penalties[p];
		}
	}
	return pen;
};

kantia.func.d10 = function(x) {
	var total = 0;
	for(var i = 0;i < x;i++) {
		var r = Math.random();
		total += Math.ceil(r * 10);
	}
	return total;
};

kantia.func.d8 = function(x) {
	var total = 0;
	for(var i = 0;i < x;i++) {
		var r = Math.random();
		total += Math.ceil(r * 8);
	}
	return total;
};

kantia.func.d6 = function(x) {
	var total = 0;
	for(var i = 0;i < x;i++) {
		var r = Math.random();
		total += Math.ceil(r * 6);
	}
	return total;
};