ui.popup = function() {
	this.dom = document.createElement("div");
	this.children = new Array();
	this.classes = new Array();
	this.dat = {};
};

ui.popup.prototype.setParent = function(parent) {
	this.parent = parent;
};

ui.popup.prototype.appendChild = function(child) {
	this.dom.appendChild(child.dom);
	this.children.push(child);
	child.setParent(this);
};

ui.popup.prototype.show = function() {
	this.dom.style.display = "block";
};

ui.popup.prototype.hide = function() {
	this.dom.style.display = "none";
};

ui.popup.prototype.addForm = function(title) {
	var f = new ui.form(title);
	this.appendChild(f);
	return f;
};

ui.popup.prototype.addClass = function(klass) {
	this.classes.push(klass);
	var klass_str = "";
	for(var c in this.classes) {
		klass_str += this.classes[c] + " ";
	}
	this.dom.setAttribute("class",klass_str);
};