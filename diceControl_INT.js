GM.diceControlINT = function(parent) {
	GM.debug.log("BEGIN: GM.diceControlINT","Begin construction of diceControlINT object",2);
	this.parent = parent;
	this.initialized = false;
	this.elements = {};
	this.data = {
		quantity: 1,
		die: "d100",
		results: "",
		adjust: 0,
		tav: 50
	};
	
	this.ui = new ui.popup("popup","fog");
	
	var p = this.ui.addPanel("Dice Roller");
	
	var types = {
		"d100":"d100",
		"d20":"d20",
		"d12":"d12",
		"d10":"d10",
		"d8":"d8",
		"d6":"d6",
		"d4":"d4",
		"d3":"d3"
	}
	var cb = p.addComboBox("Die Type",types,new db.connector(this.data,"die"));
	this.elements.die = cb;
	
	var i = p.addTextField("Quantity",new db.connector(this.data,"quantity"));
	this.elements.quantity = i;

	var i = p.addTextField("Adjust",new db.connector(this.data,"adjust"));
	this.elements.adjust = i;

	var i = p.addTextField("TAV",new db.connector(this.data,"tav"));
	this.elements.tav = i;
	
	var sp = p.addPanel("Results");
	var ta = sp.addTextArea(new db.connector(this.data,"results"));
	this.elements.results = ta;

	this.refreshView();
	
	p.addButton("Roll",new db.link(this,this.rollDice,[]));
	p.addButton("Close",new db.link(this.ui,this.ui.hide,[]));
	GM.debug.log("END: GM.diceControlINT","Finished construction of diceControlINT object",2);
};

GM.diceControlINT.prototype.initialize = function() {
	GM.debug.log("CALL: GM.diceControlINT.initialize","Initializing the interface object",2);
	if(!this.initialized) {
		this.parent.ui.appendChild(this.ui);
		this.initialized = true;
	}
};

GM.diceControlINT.prototype.refreshView = function() {
	for(var e in this.elements)
		this.elements[e].refreshView();
};

GM.diceControlINT.prototype.reset = function() {
	GM.debug.log("CALL: GM.diceControlINT.reset","Resetting the interface to defaults",2);
	this.data.quantity = 1;
	this.data.die = "d100";
	this.data.results = "";
	this.data.adjust = 0;
	this.data.tav = 50;
	this.refreshView();
};

GM.diceControlINT.prototype.invoke = function() {
	GM.debug.log("CALL: GM.diceControlINT.invoke","Invoking the dice control popup",2);
	if(!this.initialized) {
		this.initialize();
	}
	this.reset();
	this.ui.show();
};

GM.diceControlINT.prototype.rollDice = function() {
	GM.debug.log("CALL: GM.diceControlINT.rollDice","Rolling dice!",2);
	
	var multi = 0;
	if(this.data.die === "d100")
		multi = 101;
	else if(this.data.die === "d20")
		multi = 21;

	this.data.results = "";
	var adj = parseInt(this.data.adjust);
	var tav = parseInt(this.data.tav);
	for(var i = 0;i < this.data.quantity;i++) {
		var r = Math.floor(Math.random()*multi);
		var f = r + adj;
		if(f < 10)
			this.data.results += "0" + f + "(" + r + ")";
		else
			this.data.results += f + "(" + r + ")";

		if(f >= tav)
			this.data.results += "! ";
		else
			this.data.results += " ";
	}
	
	this.elements.results.refreshView();
	GM.debug.log("INFO: GM.diceControlINT.rollDice","Results are: " + this.data.results,2)
};

GM.diceControlINT.prototype.changeDieType = function() {
	GM.debug.log("CALL: Gm.diceControlINT.changeDieType","Changing die type",2);
}