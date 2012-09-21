kantia.attributeDAT = function(name,min,max,avg) {
	this.name = name;
	this.base = avg;
	this.modifier = 0;
	this.score = this.base + this.modifier;
	this.av = this.score * 5;
	if(avg < 10)
		this.adjust = kantia.attributes.adjust[avg];
	else
		this.adjust = (avg - 10) * 2;
	this.min = min;
	this.max = max;
	this.avg = avg;
};