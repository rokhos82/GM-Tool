var ui = {};

ui.label = function(text) {
	this.text = text;
	this.dom = document.createElement("span");
	this.dom.innerHTML = text;
};

ui.label.prototype.setParent = function(parent) {
	this.parent = parent;
};

ui.label.prototype.refreshView = function() {
	// Stub function.  Do nothing.
};