// -------------------------------------------------------------------------------------------------
// Weapon Templates and Other Data
// -------------------------------------------------------------------------------------------------
kantia.weapon = {};
kantia.weapon.groups = {
	"All": {
		"Bastard Sword": "Bastard Sword",
		"Battle Axe": "Battle Axe",
		"Broad Sword": "Broad Sword",
		"Great Axe": "Great Axe",
		"Hatchet": "Hatchet",
		"Halberd": "Halberd",
		"Long Sword": "Long Sword",
		"Medium Club": "Medium Club",
		"Sabre": "Sabre",
		"Short Sword": "Short Sword",
		"Wood Axe": "Wood Axe"
	},
	"Weapon Group: Common Swords": {
		"Bastard Sword": "Bastard Sword",
		"Broad Sword": "Broad Sword",
		"Long Sword": "Long Sword",
		"Sabre": "Sabre",
		"Short Sword": "Short Sword"
	},
	"Weapon Group: Axes": {
		"Battle Axe": "Battle Axe",
		"Great Axe": "Great Axe",
		"Hatchet": "Hatchet",
		"Halberd": "Halberd",
		"Wood Axe": "Wood Axe"
	},
	"Weapon Group: Primitive": {
		"War Hammer": "War Hammer",
		"Hatchet": "Hatchet",
		"Spear": "Spear",
		"Long Spear": "Long Spear",
		"Light Club": "Light Club",
		"Medium Club": "Medium Club",
		"Mace": "Mace",
		"Morning Star": "Morning Star"
	},
	"Weapon Group: Woodland": {
		"Spear": "Spear"
	}
};

kantia.weapons = {
	"Hatchet": {
		staging: {
			value: 2,
			source: "strength"
		}
	},
	"Medium Club": {
		difficulty: 15,
		staging: {
			value: 6,
			source: "strength"
		}
	}
};

// -------------------------------------------------------------------------------------------------
// weaponDAT object - holds specific weapon data
// -------------------------------------------------------------------------------------------------
kantia.weaponDAT = function(weapon,name) {
	this.name = name;
	this.type = weapon;
	
	lib.deepCopyTo(kantia.weapons[weapon],this);
};