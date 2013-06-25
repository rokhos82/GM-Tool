GM.actionDAT = function(name,actions,skill,item) {
	this.version = "20130123";
	this.name = name;
	this.actions = actions;
	this.skill = skill;
	this.item = item;
	this.avs = [];

	if(this.item && this.item.difficulty)
		var base_av = this.skill.total - this.item.difficulty.base;
	else if(this.item && this.item.block)
		var base_av = this.skill.total - this.item.block;
	else
		var base_av = this.skill.total;

	var limit = (actions == "*") ? 4 : actions;
	for(var i = 0;i < limit;i++) {
		this.avs.push(base_av - (i * 20));
	}
};

GM.actionDAT.version = "20130123";