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

kantia.lists.weapons = {};
kantia.lists.weapons.melee = {};
kantia.lists.weapons.melee.all = [
	"Bite (Dog)",
	"Bite (Panther)",
	"Bite (Wolf)",
	"Hand Axe",
	"Short Sword",
	"Dagger",
	"Short Spear, 1H",
	"Short Spear, 2H",
	"Battle Axe, 1H",
	"Battle Axe, 2H",
	"Footman's Pick, 1H",
	"Footman's Pick, 2H",
	"Great Axe",
	"Medium Club, 1H",
	"Medium Club, 2H",
	"Heavy Club",
	"Greatsword",
	"Wood Axe",
	"Pick-Axe",
	"Light Club",
	"War Claws",
	"Staff"
];

kantia.lists.weapons.ranged = {};
kantia.lists.weapons.ranged.all = [
	"Dagger",
	"Short Spear",
	"Light Crossbow",
	"Short Bow"
];

kantia.weapons = {};
kantia.weapons.melee = {
	"Hand Axe": {
		difficulty: { base: 20 },
		range: { text: "Standard" },
		staging: { value: 12, source: "strength" },
		damage: { avg: 5, text: "1d6 + 2", roll: function() { return kantia.func.d6(1) + 2; }},
		hands: 1,
		other: {}
	},
	"Short Sword": {
		difficulty: { base: 15 },
		range: { text: "Standard" },
		staging: { value: 8, source: "strength" },
		damage: { avg: 5, text: "1d8 + 1", roll: function() { return kantia.func.d8(1) + 1; }},
		hands: 1,
		other: {}
	},
	"Dagger": {
		difficulty: { base: 10 },
		range: { text: "Standard" },
		staging: { value: 4, source: "strength"	},
		damage: { avg: 3, text: "1d6", roll: function() { return kantia.func.d6(1); }},
		hands: 1,
		other: { "Easy Two Weapon": 1 }
	},
	"Short Spear, 2H": {
		difficulty: { base: 20 },
		range: { text: "Reach" },
		staging: { value: 10,source: "strength" },
		damage: { avg: 5, text: "1d10", roll: function() { return kantia.func.d10(1); }},
		other: {}
	},
	"Short Spear, 1H": {
		difficulty: { base: 20 },
		range: { text: "Reach" },
		staging: { value: 8,source: "strength" },
		damage: { avg: 5, text: "1d10",	roll: function() { return kantia.func.d10(1); }},
		other: {}
	},
	"Battle Axe, 1H": {
		difficulty: { base: 30 },
		range: { text: "Standard" },
		staging: { value: 12,source: "strength" },
		damage: { avg: 7, text: "1d10 + 2",	roll: function() { return kantia.func.d10(1) + 2; }},
		other: {}
	},
	"Battle Axe, 2H": {
		difficulty: { base: 30 },
		range: { text: "Standard" },
		staging: { value: 16, source: "strength" },
		damage: { avg: 7, text: "1d10 + 2", roll: function() { return kantia.func.d10(1) + 2; }},
		other: {}
	},
	"Footman's Pick, 1H": {
		difficulty: { base: 30 },
		range: { text: "Standard" },
		staging: { value: 12, source: "strength" },
		damage: { avg: 8, text: "2d6 + 1", roll: function() { return kantia.func.d6(2) + 1; }},
		other: {}
	},
	"Footman's Pick, 2H": {
		difficulty: { base: 30 },
		range: { text: "Standard" },
		staging: { value: 16, source: "strength" },
		damage: { avg: 8, text: "2d6 + 1", roll: function() { return kantia.func.d6(2) + 1; }},
		other: {}
	},
	"Great Axe": {
		difficulty: { base: 45 },
		range: { text: "Standard" },
		staging: { value: 20, source: "strength" },
		damage: { avg: 9, text: "2d6 + 2", roll: function() { return kantia.func.d6(2) + 1; }},
		other: {}
	},
	"Medium Club, 1H": {
		difficulty: { base: 15 },
		range: { text: "Standard" },
		staging: { value: 8, source: "strength" },
		damage: { avg: 4, text: "1d8", roll: function() { return kantia.func.d8(1); }},
		other: {}
	},
	"Medium Club, 2H": {
		difficulty: { base: 15 },
		range: { text: "Standard" },
		staging: { value: 12, source: "strength" },
		damage: { avg: 4, text: "1d8", roll: function() { return kantia.func.d8(1); }},
		other: {}
	},
	"Heavy Club": {
		difficulty: { base: 20 },
		range: { text: "Standard" },
		staging: { value: 12, source: "strength" },
		damage: { avg: 7, text: "1d8 + 3", roll: function() { return kantia.func.d8(1) + 3; }},
		other: {}
	},
	"Greatsword": {
		difficulty: { base: 40 },
		range: { text: "Standard" },
		staging: { value: 20, source: "strength" },
		damage: { avg: 9, text: "2d8", roll: function() { return kantia.func.d8(2); }},
		other: {}
	},
	"Wood Axe": {
		difficulty: { base: 30 },
		range: { text: "Standard" },
		staging: { value: 16, source: "strength" },
		damage: { avg: 6, text: "1d8 + 2", roll: function() { return kantia.func.d8() + 2; }},
		other: {}
	},
	"Pick-Axe": {
		difficulty: { base: 50 },
		range: { text: "Standard" },
		staging: { value: 20, source: "strength" },
		damage: { avg: 10, text: "2d6 + 3", roll: function() { return kantia.func.d6(2) + 3; }},
		other: {}
	},
	"Light Club": {
		difficulty: { base: 10 },
		range: { text: "Standard" },
		staging: { value: 6, source: "strength" },
		damage: { avg: 3, text: "1d6", roll: function() { return kantia.func.d6(1); }},
		other: {}
	},
	"Staff": {
		difficulty: { base: 10 },
		range: { text: "Reach" },
		staging: { value: 8, source: "strength" },
		damage: { avg: 4, text: "1d8", roll: function() { return kantia.func.d8(1); }},
		other: { "Defensive Weapon": 1, "Double-ended": 1, "Reach": 1 }
	},
	"Bite (Wolf)": {
		difficulty: { base: 17 },
		range: { text: "Normal" },
		staging: { value: 10, source: "strength" },
		damage: { avg: 4, text: "1d6 + 1", roll: function() { return kantia.func.d6(1) + 1; }},
		other: {}
	},
	"Bite (Panther)": {
		difficulty: { base: 16 },
		range: { text: "Normal" },
		staging: { value: 8, source: "strength" },
		damage: { avg: 4, text: "1d8", roll: function() { return kantia.func.d8(1); }},
		other: {}
	},
	"Claw (Panther)": {
		difficulty: { base: 6 },
		range: { text: "Normal" },
		staging: { value: 6, source: "strength" },
		damage: { avg: 3, text: "1d6", roll: function() { return kantia.func.d6(1); }},
		other: {}
	},
	"War Claws": {
		difficulty: { base: 10 },
		range: { text: "Normal" },
		staging: { value: 4, source: "strength" },
		damage: { avg: 3, text: "1d6", roll: function() { return kantia.func.d6(1); }},
		other: { "Easy Two Weapon": 1 }
	},
	"Bite (Dog)": {
		difficulty: { base: 8 },
		range: { text: "Normal" },
		staging: { value: 8, source: "strength" },
		damage: { avg: 3, text: "1d6", roll: function() { return kantia.func.d6(1); }},
		other: {}
	}
};

// Ranged Weapons ----------------------------------------------------------------------------------
kantia.weapons.ranged = {
	"Dagger": {
		difficulty: { base: 10, increment: 5 },
		range: { text: "4 (+2)", base: 4, increment: 2 },
		staging: { value: 4, source: "strength" },
		damage: { avg: 3, text: "1d6", roll: function() { return kantia.func.d6(1); }},
		other: { rof: 1 }
	},
	"Short Spear": {
		difficulty: { base: 20, increment: 5 },
		range: { text: "4 (+2)", base: 4, increment: 2 },
		staging: { value: 8, source: "strength" },
		damage: { avg: 5, text: "1d10", roll: function() { return kantia.func.d10(1); }},
		other: { rof: 1 }
	},
	"Light Crossbow": {
		difficulty: { base: 20, increment: 10 },
		range: { text: "20 (+5", base: 20, increment: 5 },
		staging: { value: 22 },
		damage: { avg: 6, text: "1d8 + 2", roll: function() { return kantia.func.d8(1) + 2; }},
		other: { rof: 1 }
	},
	"Short Bow": {
		difficulty: { base: 20, increment: 10 },
		range: { text: "20 (+5", base: 20, increment: 5 },
		staging: { value: 8, source: "strength", limit: 13 },
		damage: { avg: 5, text: "1d8 + 1", roll: function() { return kantia.func.d8(1) + 1; }},
		other: { rof: 2 }
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