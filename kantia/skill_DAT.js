kantia.skillDAT = function(name,attr,rank) {
	this.name = name;
	if(rank)
		this.rank = rank;
	else
		this.rank = 0;
	this.adjust = 0;
	this.av = 0;
	this.attribute = attr;
};