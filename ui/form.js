ui.form = function(title) {
	if(!title)
		this.dom = document.createElement("div");
	else {
		this.dom = document.createElement("fieldset");
		this.title = document.createElement("legend");
		this.title.innerHTML = title;
		this.dom.appendChild(this.title);
	}
	this.parent = undefined;
	this.children = new Array();
	this.updater = undefined;
	this.classes = new Array();
};

ui.form.prototype.setParent = function(parent) {
	this.parent = parent;
};

ui.form.prototype.setUpdater = function(up) {
	this.updater = up;
};

ui.form.prototype.setMainframe = function(main) {
	this.mainframe = main;
};

ui.form.prototype.appendChild = function(child) {
	this.dom.appendChild(child.dom);
	this.children.push(child);
	child.setParent(this);
};

ui.form.prototype.addTextField = function(label,conn,ro) {
	var tf = new ui.textField(label,conn,ro);
	this.appendChild(tf);
	return tf;
};

ui.form.prototype.addComboBox = function(label,options,data) {
	var combo = new ui.comboBox(label);
	combo.addOptions(options);
	if(data) {
		combo.setData(data);
		combo.refreshView();
	}
	this.appendChild(combo);
	
	return combo;
};

ui.form.prototype.addTable = function() {
	var t = new ui.table();
	this.appendChild(t);
	if(this.updater)
		t.setUpdater(this.updater);
	return t;
};

ui.form.prototype.addButton = function(label,link) {
	var b = new ui.button(label);
	b.setCallback(link);
	this.appendChild(b);
	return b;
};

ui.form.prototype.addForm = function(title) {
	var f = new ui.form(title);
	this.appendChild(f);
	return f;
};

ui.form.prototype.destroy = function() {
	this.parent.removeChild(this.dom);
};

ui.form.prototype.addClass = function(klass) {
	this.classes.push(klass);
	var klass_str = "";
	for(var c in this.classes) {
		klass_str += this.classes[c] + " ";
	}
	this.dom.setAttribute("class",klass_str);
};

ui.form.prototype.refreshView = function() {
	for(var c in this.children) {
		this.children[c].refreshView();
	}
};