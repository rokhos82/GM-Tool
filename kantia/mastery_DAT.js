kantia.masteryDAT = function(name,weapon) {
	this.name = name;
	this.weapon = weapon;
	this.rank = 1;
	this.effects = kantia.mastery.effects[name][1];
};