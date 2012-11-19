kantia.attributeSVC = function(dat) {
	this.dat = dat;
};

kantia.attributeSVC.prototype.update = function() {
	this.dat.score = this.dat.base + this.dat.modifier;
	this.dat.av = this.dat.score * 5;
	this.dat.adjust = (this.dat.score < 10) ? kantia.attributes.adjust[this.dat.score] : (this.dat.score - 10) * 2;
};