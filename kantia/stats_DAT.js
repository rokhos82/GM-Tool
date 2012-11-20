kantia.healthDAT = function(attr,race) {
	var total = (attr.size.score * 2) + attr.constitution.score + attr.fortitude.score + attr.willpower.score - 10;
	var w = Math.round(total/2);
	var b = total - w;
	
	if(kantia.race[race].hitpoints) {
		w += kantia.race[race].hitpoints.wound;
		b += kantia.race[race].hitpoints.bludgeon;
	}
	
	this.hitpoints = {
		wound: w,
		bludgeon: b,
	};
	
	this.damage = {
		wound: {
			light: 0,
			medium: 0,
			severe: 0
		},
		bludgeon: {
			light: 0,
			medium: 0,
			severe: 0
		}
	};
	
	this.stunpain = {
		threshold: Math.ceil((attr.size.score + attr.fortitude.score - 20) / 2) * 5,
		current: 0,
	};
};

kantia.staminaDAT = function(attr,race) {
	var stam = attr.willpower.score + attr.spirit.score + attr.constitution.score + attr.fortitude.score;
	this.max = stam;
	this.current = stam;
	this.recovery = Math.ceil(attr.constitution.score / 3);
};

kantia.windDAT = function(attr,race) {
	this.max = 4;
	this.current = 4;
};

kantia.movementDAT = function(attr,race) {
	var str = parseInt(attr.strength.score);
	var siz = parseInt(attr.size.score);

	var major = 10;
	if(str - siz >= 3)
		major += 3;
	else
		major += (str - siz);

	// Get race modifiers to movment.

	// Adjust for short stride (every 6" under 5') and long stride (every 1' over 6').
	var height = kantia.attributes.height[siz];
	if(siz < 9) {
		// Short stride
		var diff = 60 - height;
		var mod = Math.round(diff / 6);
		major += (mod < -3) ? -3 : mod;
	}
	else if(siz > 12) {
		// Long stride
		var diff = height - 72;
		var mod = Math.round(diff / 12);
		major += mod;
	}

	var free = Math.round(major/3);
	var sprint = Math.round(major * 8);

	this.major = major;
	this.free = free;
	this.sprint = sprint;
};

kantia.defenseDAT = function(attr,race) {
	var dr = 50 + (attr.agility.adjust - attr.size.adjust);
	
	this.dr = dr;
	this.noagldr = dr - attr.agility.adjust;
	this.touchdr = dr;
	this.absorb = 0;
	this.staging = attr.fortitude.score;
};

kantia.offenseDAT = function(attr,race) {
	this.staging = attr.strength.score;
	this.damage = 0;
	this.av = 0;
};