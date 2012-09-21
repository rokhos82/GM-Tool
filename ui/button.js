ui.button = function(label) {
	this.dom = document.createElement("button");
	this.dom.innerHTML = label;
	this.callback = undefined;
	this.parent = undefined;
};

ui.button.prototype.setParent = function(parent) {
	this.parent = parent;
};

ui.button.prototype.setCallback = function(callback) {
	this.service = callback;
	this.dom.svc = this.service;
	this.dom.setAttribute("onclick","this.svc.read();");
};