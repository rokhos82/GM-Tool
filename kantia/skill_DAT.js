kantia.skillDAT = function(name,attr,rank) {
	this.name = name;
	if(rank)
		this.rank = rank;
	else
		this.rank = 0;
	if(attr.length)
		this.adjust = attr[0].adjust - attr[1].adjust;
	else
		this.adjust = attr.adjust;
	this.av = rank * 5;
	this.attribute = attr;
	this.total = this.av + this.adjust;
	this.modifiers = {};
};