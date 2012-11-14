////////////////////////////////////////////////////////////////////////////////////////////////////
// groupINT
////////////////////////////////////////////////////////////////////////////////////////////////////
GM.groupINT = function(parent,svc) {
	GM.debug.log("CALL: GM.groupINT","Initializing groupINT object",2);
	this.parent = parent;
	this.svc = svc;
	this.mainframe = svc.mainframe;

	GM.debug.log("END: GM.groupINT","Finished initializing groupINT object",2);
};

GM.groupINT.prototype.initialize = function() {
};