// -------------------------------------------------------------------------------------------------
//
// -------------------------------------------------------------------------------------------------
ui.tabContainer = function() {
	this.parent = null;
	this.tabs = new Array();
};

ui.tabContainer.prototype.refreshView = function() {
	for(var t in this.tabs) {
		this.tabs[t].refreshView();
	}
};

ui.tabContainer.prototype.addTab = function() {
	var t = new ui.tab();
	this.tabs.push(t);
	return t;
};

ui.tabContainer.prototype.setParent = function(parent) {
	this.parent = parent;
};

// -------------------------------------------------------------------------------------------------
//
// -------------------------------------------------------------------------------------------------
ui.tab = function() {
	this.parent = null;
	this.children = new Array();
};

ui.tab.prototype.refreshView = function() {
	this.form.refreshView();
};

ui.tab.prototype.addForm = function() {
};

ui.tab.prototype.setParent = function(parent) {
	this.parent = parent;
};