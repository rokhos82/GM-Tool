kantia.skillDAT = function(name,attr,rank) {
	this.name = name;
	if(rank)
		this.rank = rank;
	else
		this.rank = 0;
	this.adjust = attr.adjust;
	this.av = rank * 5;
	this.attribute = attr;
	this.total = this.av + this.adjust;
};