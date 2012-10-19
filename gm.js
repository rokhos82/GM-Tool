var GM = {};

GM.utility = {};

GM.utility.d10 = function() {
	var r = Math.random();
	var d = Math.round(r * 10);
	return d;
};