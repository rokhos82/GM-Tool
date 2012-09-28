var GM = {};

// -------------------------------------------------------------------------------------------------
// 
// -------------------------------------------------------------------------------------------------
GM.main = function(root) {
	this.root = root;
	this.mainframe = new lib.mainframe();
	this.controls = new ui.panel("Controls",new lib.mainframe(this.mainframe));
	this.controls.setParent(this.root);
	this.root.appendChild(this.controls.dom);
	
	this.groups = {};
	
	// Build the controls panel
	var b = this.controls.addButton("New Group...",new db.link(this,this.addGroup,[]));
	var b = this.controls.addButton("New NPC...");
	var b = this.controls.addButton("View Templates...");
	
	var p = this.controls.addPanel("Groups");
	this.mainframe.addHandler("groupsUpdate","groups_panel",this.refreshGroupPanel,this,[p]);
	this.refreshGroupPanel(p);
	var p = this.controls.addPanel("NPCs");
};

// -------------------------------------------------------------------------------------------------
// 
// -------------------------------------------------------------------------------------------------
GM.main.prototype.addGroup = function() {
	// Get the name from the user.
	var name = prompt("Group Name","");
	
	if(this.groups[name]) {
		alert("Group with name (" + name + ") already exists.  Please choose a different name or delete the old group.");
	}
	else {
		this.groups[name] = new GM.groupDAT;
		this.mainframe.trigger("groupsUpdate");
	}
};

// -------------------------------------------------------------------------------------------------
// 
// -------------------------------------------------------------------------------------------------
GM.main.prototype.refreshGroupPanel = function(panel) {
	panel.removeChildren();
	
	for(var g in this.groups) {
		panel.addPanel(g);
	}
};


// -------------------------------------------------------------------------------------------------
// 
// -------------------------------------------------------------------------------------------------
GM.main.prototype.loadGroups = function() {
};

// -------------------------------------------------------------------------------------------------
// 
// -------------------------------------------------------------------------------------------------
GM.main.prototype.saveGroups = function() {
};

// -------------------------------------------------------------------------------------------------
// groupDAT - the group data object.
// -------------------------------------------------------------------------------------------------
GM.groupDAT = function() {
	this.members = {};
	this.active = "";
};