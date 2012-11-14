GM.encounterDAT = function(name) {
	GM.debug.log("CALL: GM.encounterDAT","Initializing encounterDAT object",2);
	this.version = "20121114";
	this.name = name;
	this.groups = {};
	this.notes = [];
};