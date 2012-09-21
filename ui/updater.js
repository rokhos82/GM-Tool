// -------------------------------------------------------------------------------------------------
// updater - message hanlder construct.
// -------------------------------------------------------------------------------------------------
ui.updater = function() {
	this.messages = {};
};

ui.updater.prototype.addMessageHandler = function(name,type,svc,callback) {
	if(!this.messages[type])
		this.messages[type] = {};
		
	this.messages[type][name] = new ui.updater.callback(name,svc,callback);
};

ui.updater.prototype.removeMessageHandler = function(name,type) {
	delete this.messages[type][name];
};

ui.updater.prototype.triggerMessage = function(type) {
	for(var m in this.messages[type]) {
		this.messages[type][m].trigger();
	}
};

// -------------------------------------------------------------------------------------------------
// updater callback - object to hold callback function and object that needs to all it.
// -------------------------------------------------------------------------------------------------
ui.updater.callback = function(name,svc,callback) {
	this.name = name;
	this.svc = svc;
	this.callback = callback;
};

ui.updater.callback.prototype.trigger = function() {
	callback.call(this.svc);
};