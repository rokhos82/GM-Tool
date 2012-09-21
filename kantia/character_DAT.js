kantia.characterDAT = function() {
	this.name = "John Doe";
	this.race = "human";
	this.attributes = new kantia.attributeDAT();
	this.skills = {
		"common": {
			"Spot": new kantia.skillDAT("Spot","perception"),
			"Listen": new kantia.skillDAT("Listen","perception"),
			"Smell": new kantia.skillDAT("Smell","perception"),
			"Search": new kantia.skillDAT("Search","perception"),
			"Resist Magic": new kantia.skillDAT("Resist Magic","spirt"),
			"Resist Mental": new kantia.skillDAT("Resist Mental","willpower"),
			"Resist Fear": new kantia.skillDAT("Resist Fear","strength"),
			"Concentration": new kantia.skillDAT("Concentration","willpower")
		},
		"physical": {
			"Climbing": new kantia.skillDAT("Climbing","agility"),
			"Fast Draw": new kantia.skillDAT("Fast Draw","reflexes"),
			"Gymnastics": new kantia.skillDAT("Gymnastics","agility"),
			"Hide": new kantia.skillDAT("Hide","special"),
			"Move Silent": new kantia.skillDAT("Move Silent","special"),
			"Slight of Hand": new kantia.skillDAT("Slight of Hand","agility"),
			"Speed Load": new kantia.skillDAT("Speed Load","agility")
		},
		"social": {
			"Deceit": new kantia.skillDAT("Deceit")
		},
		"education": {
			"Alchemy": new kantia.skillDAT("Alchemy","reasoning"),
			"Appraisal": new kantia.skillDAT("Appraisal","perception"),
			"Art": new kantia.skillDAT("Art","perception"),
			"Animal Handling": new kantia.skillDAT("Animal Handling","willpower"),
			"Boyer/Fletcher": new kantia.skillDAT("Boyer/Fletcher","reasoning")
		},
		"knowledge": {
		},
		"combat": {
			"Dodge": new kantia.skillDAT("Dodge"),
			"Feint": new kantia.skillDAT("Feint")
		},
		"magic": {
		}
	};
	this.masteries = {};
	this.weapons = {};
	this.armor = {};
	this.traits = {};
	this.heroic = {};
	this.stats = {
		"health": new kantia.healthDAT(this.attributes,this.race),
		"stamina": new kantia.staminaDAT(this.attributes,this.race),
		"wind": new kantia.windDAT(this.attributes,this.race),
		"movement": new kantia.movementDAT(this.attributes,this.race),
		"defense": new kantia.defenseDAT(this.attributes,this.race),
		"offense": new kantia.offenseDAT(this.attributes,this.race)
	};
};