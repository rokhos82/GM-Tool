////////////////////////////////////////////////////////////////////////////////////////////////////
// customNPCSVC
////////////////////////////////////////////////////////////////////////////////////////////////////
GM.customNPCSVC = function(dat,parent) {
	GM.debug.log("BEGIN: GM.customNPCSVC","Started construction of customNPCSVC object",2);
	this.parent = parent;
	this.dat = dat;
	this.ui = new GM.customNPCINT(this);
	GM.debug.log("END: GM.customNPCSVC","Finished construction of customNPCSVC object",2);
};

GM.customNPCSVC.prototype.invoke = function(parent) {
	GM.debug.log("CALL: GM.customNPCSVC.invoke","Invoking the custom NPC template editor",2);
	this.ui.show(parent);
};

GM.customNPCSVC.prototype.getName = function() {
	GM.debug.log("CALL: GM.customNPCSVC.getName","Retrieving template name",2);
	return this.dat.name;
};

GM.customNPCSVC.prototype.getData = function(token) {
	GM.debug.log("CALL: GM.customNPCSVC.getDataToken","Retrieve data for token " + token,2);
	return this.dat[token];
};

GM.customNPCSVC.prototype.getDataConnector = function(token,sub) {
	GM.debug.log("CALL: GM.customNPCSVC.getDataConnector","Building data connector for token " + token,2);
	var conn = null;
	if(sub) {
		conn = new db.connector(this.dat[sub],token);
	}
	else {
		conn =  new db.connector(this.dat,token);
	}
	return conn;
};

GM.customNPCSVC.prototype.requestManager = function() {
	GM.debug.log("CALL: GM.customNPCSVC.requestManager","Requesting the template manager be shown",2);
	this.parent.invoke();
};