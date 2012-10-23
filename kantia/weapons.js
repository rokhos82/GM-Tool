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

kantia.weapons = {};
kantia.weapons.melee = {
	"Hand Axe": {
		difficulty: {
			base: 20
		},
		staging: {
			value: 12,
			source: "strength"
		},
		damage: {
			avg: 5,
			text: "1d6 + 2",
			roll: function() { kantia.func.d6(1) + 2; }
		}
	},
	"Medium Club": {
		difficulty: {
			base: 15
		},
		staging: {
			value: 6,
			source: "strength"
		}
	},
	"Short Sword": {
		difficulty: {
			base: 15
		},
		staging: {
			value: 8,
			source: "strength"
		},
		damage: {
			avg: 5,
			text: "1d8 + 1",
			roll: function() { kantia.func.d8(1) + 1; }
		}
	},
	"Dagger": {
		difficulty: {
			base: 10
		},
		range: "Standard",
		staging: {
			value: 4,
			source: "strength"
		},
		damage: {
			avg: 3,
			text: "1d6",
			roll: function() { kantia.func.d6(1); }
		}
	},
	"Short Spear, 2H": {
		difficulty: {
			base: 20
		},
		range: "",
		staging: {
			value: 10,
			source: "strength"
		},
		damage: {
			avg: 5,
			text: "1d10",
			roll: function() { kantia.func.d10(1); }
		}
	},
	"Short Spear, 1H": {
		difficulty: {
			base: 20
		},
		range: "Reach",
		staging: {
			value: 8,
			source: "strength"
		},
		damage: {
			avg: 5,
			text: "1d10",
			roll: function() { kantia.func.d10(1); }
		}
	}
};

// Ranged Weapons ----------------------------------------------------------------------------------
kantia.weapons.ranged = {
	"Dagger": {
		difficulty: {
			base: 10,
			increment: 5
		},
		range: {
			text: "4 (+2)",
			base: 4,
			increment: 2
		},
		staging: {
			value: 4,
			source: "strength"
		},
		damage: {
			avg: 3,
			text: "1d6",
			roll: function() { kantia.func.d6(1); }
		}
	},
	"Short Spear": {
		difficulty: {
			base: 20,
			increment: 5
		},
		range: {
			text: "4 (+2)",
			base: 4,
			increment: 2
		},
		staging: {
			value: 8,
			source: "strength"
		},
		damage: {
			avg: 5,
			text: "1d10",
			roll: function() { kantia.func.d10(1); }
		}
	},
	"Light Crossbow": {
		difficulty: {
			base: 20,
			increment: 10
		},
		range: {
			text: "20 (+5",
			base: 20,
			increment: 5
		},
		staging: {
			value: 22
		},
		damage: {
			avg: 6,
			text: "1d8 + 2",
			roll: function() { kantia.func.d8(1) + 2; }
		},
		rof: 1
	},
	"Short Bow": {
		difficulty: {
			base: 20,
			increment: 10
		},
		range: {
			text: "20 (+5",
			base: 20,
			increment: 5
		},
		staging: {
			value: 8,
			source: "strength",
			limit: 13
		},
		damage: {
			avg: 5,
			text: "1d8 + 1",
			roll: function() { kantia.func.d8(1) + 1; }
		},
		rof: 2
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