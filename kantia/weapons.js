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
		difficulty: 20,
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
		difficulty: 15,
		staging: {
			value: 6,
			source: "strength"
		}
	},
	"Short Sword": {
		difficulty: 15,
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
		difficulty: 10,
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
	}
};

kantia.weapons.ranged = {
	"Dagger": {
		difficulty: {
			base: 10,
			increment: 5
		},
		range: {
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