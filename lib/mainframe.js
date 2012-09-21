lib.mainframe = function() {
	this.messages = {};
};

lib.mainframe.prototype.addHandler = function(type,name,func,obj,arg) {
	if(!this.messages[type])
		this.messages[type] = {};
		
	this.messages[type][name] = {};
	this.messages[type][name].func = func;
	this.messages[type][name].obj = obj;
	this.messages[type][name].arg = arg;
};

lib.mainframe.prototype.removeHandler = function(type,name) {
	if(this.messages[type])
		delete this.messages[type][name];
};

lib.mainframe.prototype.trigger = function(type) {
	if(this.messages[type]) {
		for(var n in this.messages[type]) {
			this.messages[type][n].func.call(this.messages[type][n].obj,this.messages[type][n].arg);
		}
	}
};

lib.mainframe.prototype.reset = function() {
	this.messages = {};
};