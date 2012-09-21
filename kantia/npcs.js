kantia.template.npcs = {};

kantia.template.npc = function(race,name,attributes,skills) {
	this.race = race;
	this.name = name;
	this.skills = skills;
	this.attributes = attributes;
	this.armor;
	this.weapons;
	this.traits;
	this.hc;
	this.categories;
};

kantia.template.npcs["Kobald"] = new kantia.template.npc(
	"Kobald",
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
		"Dodge": new kantia.skillDAT("Dodge","Agility",6),
		"Hide": new kantia.skillDAT("Hide","special",8),
		"Resist Fear": new kantia.skillDAT("Resist Fear","Spirit",2),
		"Resist Magic": new kantia.skillDAT("Resist Magic","Spirit",2),
		"Resist Mental": new kantia.skillDAT("Resist Mental","Willpower",2)
	}
);