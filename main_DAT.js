// -------------------------------------------------------------------------------------------------
// mainDAT
// -------------------------------------------------------------------------------------------------
GM.mainDAT = function() {
	this.version = GM.mainDAT.version;

	this.campaigns = {};
	this.characters = {};
	this.spells = {};
};

GM.mainDAT.version = "20130624";
GM.mainDAT.upgrade = function(obj) {
	if(obj.version == "20130624") {
		// We are done
	}
	else {
		// Something is wrong, version not supported.
	}
};