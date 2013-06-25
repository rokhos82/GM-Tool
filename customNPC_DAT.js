////////////////////////////////////////////////////////////////////////////////////////////////////
// customNPCDAT
////////////////////////////////////////////////////////////////////////////////////////////////////
GM.customNPCDAT = function(name) {
	this.version = "20130225";
	this.race = "";
	this.name = name;
	this.skills = null;
	this.attributes = {
		"strength": new kantia.template.npcAttirbute("Strength",10,10,10),
		"size": new kantia.template.npcAttirbute("Size",10,10,10),
		"agility": new kantia.template.npcAttirbute("Agility",10,10,10),
		"reflexes": new kantia.template.npcAttribute("Reflexes",10,10,10),
		"constitution": new kantia.template.npcAttribute("Constitution",10,10,10),
		"fortitude": new kantia.template.npcAttribute("Fortitude",10,10,10),
		"reasoning": new kantia.template.npcAttribute("Reasoning",10,10,10),
		"willpower": new kantia.template.npcAttribute("Willpower",10,10,10),
		"spirit": new kantia.template.npcAttribute("Spirit",10,10,10),
		"perception": new kantia.template.npcAttribute("Perception",10,10,10)
	};
	this.armor = null;
	this.weapons = null;
	this.traits = null;
	this.hc = null;
	this.masteries = null;
	this.magic = null;
	this.description = null;
	this.categories = null;
	this.loot = null;
};

GM.customNPCDAT.version = "20130225";

//
// Version Change Log
//   20130212 - base
//	 20130225 - added race and attributes

GM.customNPCDAT.upgrade = function(dat) {
	GM.debug.log("CALL: GM.customNPCDAT.upgrade","Upgrading customNPCDAT object",1);
	if(dat.version == GM.customNPCDAT.version) {
		// The data object is up to date, stop trying to update it.
	}
	else if(dat.version == "20130212") {
		// Add race and attributes
		dat.race = "";
		dat.attributes = {
			"strength": new kantia.template.npcAttirbute("Strength",10,10,10),
			"size": new kantia.template.npcAttirbute("Size",10,10,10),
			"agility": new kantia.template.npcAttirbute("Agility",10,10,10),
			"reflexes": new kantia.template.npcAttribute("Reflexes",10,10,10),
			"constitution": new kantia.template.npcAttribute("Constitution",10,10,10),
			"fortitude": new kantia.template.npcAttribute("Fortitude",10,10,10),
			"reasoning": new kantia.template.npcAttribute("Reasoning",10,10,10),
			"willpower": new kantia.template.npcAttribute("Willpower",10,10,10),
			"spirit": new kantia.template.npcAttribute("Spirit",10,10,10),
			"perception": new kantia.template.npcAttribute("Perception",10,10,10)
		};
	}
	else {
		// We don't know what version it thinks it is.  Throw an error.
		GM.debug.log("ERROR: GM.customNPCDAT.upgrade","customNPCDAT version not found",0);
	}
};