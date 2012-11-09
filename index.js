var root = document.getElementById("root");

GM.debug.attachLogView(root);

var gm_data = new GM.mainDAT();
var gm_interface = new GM.mainSVC(root,gm_data);