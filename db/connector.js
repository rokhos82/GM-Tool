// -------------------------------------------------------------------------------------------------
// Connector - this facilites data passing between to objects.  Usually a UI object and a simple
// data object.
// -------------------------------------------------------------------------------------------------
db.connector = function(data,token) {
	this.data = data;  // Entire data object or subobject.  Must not be the end object.
	this.token = token;  // The final subobject token for the data required.
};

db.connector.prototype.read = function() {
	return this.data[this.token];
};

db.connector.prototype.write = function(data) {
	this.data[this.token] = data;
};

// -------------------------------------------------------------------------------------------------
// Local - this a simple temp storage object.
// -------------------------------------------------------------------------------------------------
db.local = function(def) {
	this.data = def;
};

db.local.prototype.read = function() {
	return this.data;
};

db.local.prototype.write = function(data) {
	this.data = data;
};

// -------------------------------------------------------------------------------------------------
// Link
// -------------------------------------------------------------------------------------------------
db.link = function(service,func,ui) {
	this.svc = service;
	this.func = func;
	this.ui = ui;
};

db.link.prototype.read = function() {
	this.func.call(this.svc,this.ui);
};