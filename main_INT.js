// -------------------------------------------------------------------------------------------------
// mainINT
// -------------------------------------------------------------------------------------------------
GM.mainINT = function(root,svc) {
	GM.debug.log("START: mainINT.constructor","Begin creating mainINT object",2);
	this.service = svc;
	this.parent = null;
	this.children = [];
	this.dom = root;
	GM.debug.log("END: mainINT.constructor","End creating mainINT object",2);
};

GM.utility.extend(GM.mainINT,GM.baseINT);

// -------------------------------------------------------------------------------------------------
// initialize
// -------------------------------------------------------------------------------------------------
GM.mainINT.prototype.initialize = function() {
};

// -------------------------------------------------------------------------------------------------
// addUIElement - this function adds a UI element to this interface object
// -------------------------------------------------------------------------------------------------
GM.mainINT.prototype.addUIElement = function(e) {
	GM.debug.log("CALL: mainINT.addUIElement","Adding new UI element to the interface",2);
};