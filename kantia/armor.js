kantia.armor = {};

// Build the armor lists for each slot (coverage).
kantia.lists.armor = {};
kantia.lists.armor.torso = ["Leather Jerkin","Hard Leather Cuirass","Scale Breastplate","Chain Shirt","Breastplate"];
kantia.lists.armor.arms = ["Leather Vambrace","Hard Leather Vambrace","Chain Vambrace","Scale Vambrace","Plate Vambrace"];
kantia.lists.armor.legs = ["Leather Greaves","Hard Leather Greaves","Chain Greaves","Scale Greaves","Plate Greaves"];
kantia.lists.armor.blocking = ["Small Shield","Medium Shield","Full Shield","Buckler","Leather Bracers","Reinforced Bracers"];
kantia.lists.armor.head = ["Light Helm","Chain Coif","Battle Helm"];
kantia.lists.armor.hand = ["Chain Gloves","Gauntlets","Leather Gloves"];

kantia.template.armor = function(name,def,called,staging,absorb,ball,bypass,block,cover,pen,cat) {
	this.name = name ? name : "";
	this.deflect = def ? def : 0;
	this.calledshot = called ? called : 0;
	this.staging = staging ? staging : 0;
	this.absorb = absorb ? absorb : 0;
	this.ballistic = ball ? ball : 0;
	this.bypass = bypass ? bypass : 0;
	this.block = block ? block : 0;
	this.coverage = cover ? cover : 0;
	this.penalties = {i:0,r:0,p:0,ar:0,sp:0};
	if(pen) {
		this.penalties = {
			i: pen.i,
			r: pen.r,
			p: pen.p,
			ar: pen.ar,
			sp: pen.sp
		};
	}
	this.category = cat ? cat : "";
};

// Helmets /////////////////////////////////////////////////////////////////////////////////////////
var cat = "Helmet";
// Light Helm --------------------------------------------------------------------------------------
var name = "Light Helm";
kantia.armor[name] = new kantia.template.armor(name,5,30,5,6,0,-20,0,"Head",{i:-1,r:-10,p:-10,ar:-5,sp:-10},cat);

// Chain Coif --------------------------------------------------------------------------------------
var name = "Chain Coif";
kantia.armor[name] = new kantia.template.armor(name,0,20,5,3,0,-10,0,"Head",{r:-5,p:-5,ar:-5,sp:-10},cat);

// Battle Helm ---
var name = "Battle Helm";
kantia.armor[name] = new kantia.template.armor(name,5,40,10,10,0,-40,0,"Head",{i:-2,r:-20,p:-40,ar:-10,sp:-20},cat);

// Shields /////////////////////////////////////////////////////////////////////////////////////////
var cat = "Shield";
// Small Shield ------------------------------------------------------------------------------------
var name = "Small Shield";
kantia.armor[name] = new kantia.template.armor(name,5,0,10,12,0,0,20,"Blocking",{},cat);

// Medium Shield -----------------------------------------------------------------------------------
var name = "Medium Shield";
kantia.armor[name] = new kantia.template.armor(name,5,0,10,16,0,0,30,"Blocking",{i:-1,ar:-5,sp:-10},cat);

// Full Shield -------------------------------------------------------------------------------------
var name = "Full Shield";
kantia.armor[name] = new kantia.template.armor(name,10,0,15,24,0,0,40,"Blocking",{i:-3,ar:-15,sp:-20},cat);

// Buckler -----------------------------------------------------------------------------------------
var name = "Buckler";
kantia.armor[name] = new kantia.template.armor(name,0,0,10,12,0,0,10,"Blocking",{},cat);

// Leather Armor ///////////////////////////////////////////////////////////////////////////////////
var cat = "Leather";
// Leather Jerkin ----------------------------------------------------------------------------------
var name = "Leather Jerkin";
kantia.armor[name] = new kantia.template.armor(name,5,0,2,1,0,-40,0,"Torso",{},cat);

// Leather Vambrace --------------------------------------------------------------------------------
var name = "Leather Vambrace";
kantia.armor[name] = new kantia.template.armor(name,0,5,2,1,0,-10,0,"Arms",{},cat);

// Leather Greaves ---------------------------------------------------------------------------------
var name = "Leather Greaves";
kantia.armor[name] = new kantia.template.armor(name,0,5,2,1,0,-10,0,"Legs",{},cat);

// Hard Leather Armor //////////////////////////////////////////////////////////////////////////////
var cat = "Leather, Hard";
// Hard Leather Cuirass ----------------------------------------------------------------------------
var name = "Hard Leather Cuirass";
kantia.armor[name] = new kantia.template.armor(name,5,10,4,2,0,-40,0,"Torso",{i:-1},cat);

// Hard Leather Vambrace ---------------------------------------------------------------------------
var name = "Hard Leather Vambrace";
kantia.armor[name] = new kantia.template.armor(name,5,10,4,2,0,-10,0,"Arms",{ar:-5,sp:-5},cat);

// Hard Leather Greaves ----------------------------------------------------------------------------
var name = "Hard Leather Greaves";
kantia.armor[name] = new kantia.template.armor(name,0,10,4,2,0,-10,0,"Legs",{i:-1,ar:-5},cat);

// Chain Armor /////////////////////////////////////////////////////////////////////////////////////
var cat = "Chain";
// Chain Shirt -------------------------------------------------------------------------------------
var name = "Chain Shirt";
kantia.armor[name] = new kantia.template.armor(name,10,20,5,3,0,-40,0,"Torso",{i:-2,ar:-10,sp:-5},cat);

// Chain Vambrace ----------------------------------------------------------------------------------
var name = "Chain Vambrace";
kantia.armor[name] = new kantia.template.armor(name,5,20,5,3,0,-10,0,"Arms",{i:-1,r:-5,ar:-5,sp:-5},cat);

// Chain Greaves -----------------------------------------------------------------------------------
var name = "Chain Greaves";
kantia.armor[name] = new kantia.template.armor(name,0,20,5,3,0,-10,0,"Legs",{i:-1,ar:-5},cat);