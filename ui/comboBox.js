ui.comboBox = function(label) {
	this.dom = document.createElement("div");
	var l = document.createElement("label");
	l.innerHTML = label;
	this.dom.appendChild(l);
	this.select = document.createElement("select");
	this.select.svc = this;
	this.select.setAttribute("onchange","this.svc.updateData();");
	this.dom.appendChild(this.select);
	this.options = new Array();
	this.parent = undefined;
};

// -------------------------------------------------------------------------------------------------
// 
// -------------------------------------------------------------------------------------------------
ui.comboBox.prototype.setParent = function(parent) {
	this.parent = parent;
};

// -------------------------------------------------------------------------------------------------
// 
// -------------------------------------------------------------------------------------------------
ui.comboBox.prototype.setData = function(data) {
	this.data = data;
};

// -------------------------------------------------------------------------------------------------
// 
// -------------------------------------------------------------------------------------------------
ui.comboBox.prototype.addOptions = function(options) {
	for(var o in options) {
		var opt = document.createElement("option");
		opt.value = o;
		opt.innerHTML = options[o];
		this.select.appendChild(opt);
		this.options.push(opt);
	}
};

// -------------------------------------------------------------------------------------------------
// 
// -------------------------------------------------------------------------------------------------
ui.comboBox.prototype.setOptions = function(options) {
};

// -------------------------------------------------------------------------------------------------
// 
// -------------------------------------------------------------------------------------------------
ui.comboBox.prototype.clearOptions = function() {
};

// -------------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------
ui.comboBox.prototype.refreshView = function() {
	for(var i in this.options) {
		if(this.options[i].value == this.data.read())
			this.options[i].setAttribute("selected","selected");
	}
};

// -------------------------------------------------------------------------------------------------
// 
// -------------------------------------------------------------------------------------------------
ui.comboBox.prototype.updateData = function() {
	var i = this.select.selectedIndex;
	this.data.write(this.options[i].value);
	if(this.service)
		this.func.call(this.service,this.arg);
};

// -------------------------------------------------------------------------------------------------
// 
// -------------------------------------------------------------------------------------------------
ui.comboBox.prototype.setTabIndex = function(index) {
	this.select.setAttribute("tabindex",index);
};

// -------------------------------------------------------------------------------------------------
// 
// -------------------------------------------------------------------------------------------------
ui.comboBox.prototype.setUpdate = function(svc,func,arg) {
	this.service = svc;
	this.func = func;
	this.arg = arg;
};

// -------------------------------------------------------------------------------------------------
// 
// -------------------------------------------------------------------------------------------------
ui.comboBox.prototype.getValue = function() {
	var i = this.select.selectedIndex;
	return this.options[i];
};