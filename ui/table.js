// -------------------------------------------------------------------------------------------------
// Table - 
// -------------------------------------------------------------------------------------------------
ui.table = function() {
	this.dom = document.createElement("div");
	var t = document.createElement("table");
	this.header = document.createElement("thead");
	this.body = document.createElement("tbody");
	this.footer = document.createElement("tfoot");
	t.appendChild(this.header);
	t.appendChild(this.body);
	t.appendChild(this.footer);
	this.dom.appendChild(t);
	this.parent = undefined;
	this.rows = new Array();
};

ui.table.prototype.setParent = function(parent) {
	this.parent = parent;
};

ui.table.prototype.setUpdater = function(up) {
	this.updater = up;
};

ui.table.prototype.addRow = function(cells) {
	var r = new ui.table.row();
	this.body.appendChild(r.dom);
	r.setParent(this);
	if(typeof(cells) == "object")
		r.addCellArray(cells);
	this.rows.push(r);
	return r;
};

ui.table.prototype.addCustomRow = function(elements) {
	var r = new ui.table.row();
	for(var e in elements) {
		r.addCustomCell(elements[e]);
	}
	this.body.appendChild(r.dom);
	this.rows.push(r);
};

ui.table.prototype.mapUpdater = function(row,cell,type,name,func) {
	this.updater.addMessageHandler(name,type,this.rows[row].cells[cell],func);
};

ui.table.prototype.removeRow = function(row) {
	for(var r in this.rows) {
		if(this.rows[r] === row) {
			this.body.removeChild(row.dom);
			this.rows.splice(r,1);
		}
	}
};

// -------------------------------------------------------------------------------------------------
// Row - 
// -------------------------------------------------------------------------------------------------
ui.table.row = function() {
	this.dom = document.createElement("tr");
	this.cells = new Array();
};

ui.table.row.prototype.setParent = function(parent) {
	this.parent = parent;
};

ui.table.row.prototype.addCell = function(cell) {
	var c = document.createElement("td");
	if(typeof(cell) == "string") {
		c.innerHTML = cell;
	}
	else {
		var tf = new ui.textField();
		tf.setData(cell);
		c.appendChild(tf.dom);
	}
	this.dom.appendChild(c);
};

ui.table.row.prototype.addCellArray = function(cells) {
	for(var i in cells) {
		var c = document.createElement("td");
		if(typeof(cells[i]) == "string" || typeof(cells[i]) == "number") {
			c.innerHTML = cells[i];
		}
		else {
			var tf = new ui.textField();
			tf.setData(cells[i]);
			c.appendChild(tf.dom);
			this.cells.push(tf);
		}
		this.dom.appendChild(c);
	};
};

ui.table.row.prototype.addCustomCell = function(ui) {
	var c = document.createElement("td");
	c.appendChild(ui.dom);
	ui.setParent(this);
	this.dom.appendChild(c);
	this.cells.push(ui);
};

// -------------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------