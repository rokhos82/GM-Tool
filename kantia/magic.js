kantia.template.spell = function(name,rank) {
	this.name = name;
	this.rank = rank;
	this.power = rank;
};

kantia.template.magic = function(discipline,drank,casting,crank,cattr) {
	this.discipline = discipline;
	this.rank = drank;
	this.casting = new kantia.skillDAT(casting,cattr,crank);
	this.spells = {};
};

kantia.template.discipline = function(name,attr) {
	this.name = name;
	this.attribute = attr;
};

kantia.disciplineList = {
	"Magic": {
		"Abjuration": "Abjuration",
		"Arcane": "Arcane",
		"Conjuring": "Conjuring",
		"Divination": "Divination",
		"Enchantment": "Enchantment",
		"Holy": "Holy",
		"Illusion": "Illusion",
		"Nature": "Nature",
		"Necromancy": "Necromancy",
		"Profane": "Profane",
		"Shadowmancy": "Shadowmancy",
		"Transmutation": "Transmutation"
	},
	"Elemental": {
		"Air": "Air",
		"Earth": "Earth",
		"Fire": "Fire",
		"Thunder": "Thunder",
		"Water": "Water"
	},
	"Manipulation": {
		"Manipulation": "Manipulation",
		"Shou Spirit Way": "Shou Spirit Way"
	},
	"Psychic": {
		"Channeling": "Channeling",
		"Domination": "Domination",
		"Electrokinesis": "Electrokinesis",
		"Photokinesis": "Photokinesis",
		"Pyrokinesis": "Pyrokinesis",
		"Sensitivity": "Sensitivity",
		"Telekinesis": "Telekinesis",
		"Telepathy": "Telepathy"
	},
	"Shuri": {
		"Avian": "Avian",
		"Feline": "Feline",
		"Lupine": "Lupine",
		"Reptilian": "Reptilian"
	},
	"Other": {
		"Demonic": "Demonic",
		"Folk Magic": "Folk Magic"
	}
};

kantia.skills["Abjuration"] = new kantia.template.skill("Abjuration","spirit");
kantia.skills["Arcane"] = new kantia.template.skill("Arcane","spirit");
kantia.skills["Conjuring"] = new kantia.template.skill("Conjuring","spirit");
kantia.skills["Divination"] = new kantia.template.skill("Divination","spirit");
kantia.skills["Enchantment"] = new kantia.template.skill("Enchantment","spirit");
kantia.skills["Holy"] = new kantia.template.skill("Holy","spirit");
kantia.skills["Illusion"] = new kantia.template.skill("Illusion","spirit");
kantia.skills["Nature"] = new kantia.template.skill("Nature","spirit");
kantia.skills["Necromancy"] = new kantia.template.skill("Necromancy","spirit");
kantia.skills["Profane"] = new kantia.template.skill("Profane","spirit");
kantia.skills["Shadowmancy"] = new kantia.template.skill("Shadowmancy","spirit");
kantia.skills["Transmutation"] = new kantia.template.skill("Transmutation","spirit");
kantia.skills["Air"] = new kantia.template.skill("Air","spirit");
kantia.skills["Earth"] = new kantia.template.skill("Earth","spirit");
kantia.skills["Fire"] = new kantia.template.skill("Fire","spirit");
kantia.skills["Thunder"] = new kantia.template.skill("Thunder","spirit");
kantia.skills["Water"] = new kantia.template.skill("Water","spirit");
kantia.skills["Manipulation"] = new kantia.template.skill("Manipulation","spirit");
kantia.skills["Shou Spirit Way"] = new kantia.template.skill("Shou Spirit Way","spirit");
kantia.skills["Channeling"] = new kantia.template.skill("Channeling","willpower");
kantia.skills["Domination"] = new kantia.template.skill("Domination","willpower");
kantia.skills["Electrokinesis"] = new kantia.template.skill("Electrokinesis","willpower");
kantia.skills["Photokinesis"] = new kantia.template.skill("Photokinesis","willpower");
kantia.skills["Pyrokinesis"] = new kantia.template.skill("Pyrokinesis","willpower");
kantia.skills["Sensitivity"] = new kantia.template.skill("Sensitivity","willpower");
kantia.skills["Telekinesis"] = new kantia.template.skill("Telekinesis","willpower");
kantia.skills["Telepathy"] = new kantia.template.skill("Telepathy","willpower");
kantia.skills["Avian"] = new kantia.template.skill("Avian","spirit");
kantia.skills["Feline"] = new kantia.template.skill("Feline","spirit");
kantia.skills["Lupine"] = new kantia.template.skill("Lupine","spirit");
kantia.skills["Reptilian"] = new kantia.template.skill("Reptilian","spirit");
kantia.skills["Demonic"] = new kantia.template.skill("Demonic","spirit");
kantia.skills["Folk Magic"] = new kantia.template.skill("Folk Magic","spirit");

kantia.spellList = {
	"Enchantment": {
		"Aging":"Aging",
		"Alarm":"Alarm",
		"Alter Dreamscape":"Alter Dreamscape",
		"Animation":"Animation",
		"Anti-Dark":"Anti-Dark",
		"Anti-Light":"Anti-Light",
		"Anti-Magic":"Anti-Magic",
		"Arcane Vision":"Arcane Vision",
		"Awaken":"Awaken",
		"Cantrip":"Cantrip",
		"Charm":"Charm",
		"Clumsiness":"Clumsiness",
		"Command Animals":"Command Animals",
		"Command Beasts":"Command Beasts",
		"Confusion":"Confusion",
		"Contingency":"Contingency",
		"Control":"Control",
		"Courage":"Courage",
		"Curse":"Curse",
		"Dispell":"Dispell",
		"Energy Barrier":"Energy Barrier",
		"Enhance Sentient":"Enhance Sentient",
		"Erase":"Erase",
		"Extend Life":"Extend Life",
		"Fatigue":"Fatigue",
		"Forget":"Forget",
		"Frenzy":"Frenzy",
		"Fright":"Fright",
		"Ignore":"Ignore",
		"Keenness":"Keenness",
		"Magic Weapon":"Magic Weapon",
		"Mesmerize":"Mesmerize",
		"Mystic Script":"Mystic Script",
		"Nature\'s Fury":"Nature\'s Fury",
		"Nightmare":"Nightmare",
		"Oiled Tongue":"Oiled Tongue",
		"Open/Seal":"Open/Seal",
		"Paralysis":"Paralysis",
		"Preserve":"Preserve",
		"Prowess":"Prowess",
		"Rage/Pacifism":"Rage/Pacifism",
		"Repair":"Repair",
		"Sense Enhancement":"Sense Enhancement",
		"Sensory Depriviation":"Sensory Depriviation",
		"Shift Aura":"Shift Aura",
		"Sleep":"Sleep",
		"Spasm":"Spasm",
		"Sphere of Silence":"Sphere of Silence",
		"Spirit Sense":"Spirit Sense",
		"Suggestion":"Suggestion",
		"Suspend":"Suspend",
		"Tempering":"Tempering",
		"Thunderous Voice":"Thunderous Voice",
		"Vincibility":"Vincibility"
	}
};

kantia.spells = {};