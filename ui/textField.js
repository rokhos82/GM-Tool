ui.textField = function(label,data,ro) {
	this.dom = document.createElement("div");
	if(label) {
		var	l = document.createElement("label");
		l.innerHTML = label;
		this.dom.appendChild(l);
	}
	var i = document.createElement("input");
	i.setAttribute("type","text");
	this.dom.appendChild(i);
	this.field = i;
	this.field.svc = this;
	this.parent = undefined;
	this.setData(data);
	this.setReadOnly(ro);
	
	this.field.setAttribute("onblur","this.svc.updateData();");
};

ui.textField.prototype.setParent = function(parent) {
	this.parent = parent;
};

// -------------------------------------------------------------------------------------------------
// setData - takes 1 parameter: connector.  This must be an object with a read and a write method.
// -------------------------------------------------------------------------------------------------
ui.textField.prototype.setData = function(connector) {
	this.data = connector;
	if(connector)
		this.refreshView();
};

ui.textField.prototype.setUpdate = function(svc,func,arg) {
	this.service = svc;
	this.func = func;
	this.arg = arg;
};

ui.textField.prototype.setReadOnly = function(ro) {
	if(ro) {
		this.field.setAttribute("readonly","readonly");
	}
	else {
		this.field.removeAttribute("readonly");
	}
};

ui.textField.prototype.refreshView = function() {
	this.field.value = this.data.read();
};

ui.textField.prototype.updateData = function() {
	this.data.write(this.field.value);
	if(this.service)
		this.func.call(this.service,this.arg);
};

ui.textField.prototype.setTabIndex = function(index) {
	this.field.setAttribute("tabindex",index);
};

ui.textField.prototype.getValue = function() {
	return this.field.value;
};