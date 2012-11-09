var GM = {};

GM.utility = {};

GM.debug = {};
GM.debug.level = 2; // 0 - severe only, 1 - errors, 2 - fine detail
GM.debug.logFile = [];
GM.debug.dom = null;

GM.debug.log = function(ttl,msg,lvl) {
	GM.debug.logFile.push({
		title: ttl,
		message: msg,
		level: lvl
	});
	GM.debug.refreshLogView();
};

GM.debug.attachLogView = function(root) {
	GM.debug.dom = document.createElement("div");
	GM.debug.dom.setAttribute("class","debug");
	root.appendChild(GM.debug.dom);
};

GM.debug.refreshLogView = function() {
	var str = "";
	for(var i in GM.debug.logFile) {
		var entry = GM.debug.logFile[i];
		if(entry.level <= GM.debug.level) {
			var line = entry.title + " - " + entry.message;
			str += i + "> " + line + "<br />";
		}
	}
	GM.debug.dom.innerHTML = str;
};

GM.debug.clearLog = function() {
	GM.debug.logFile = [];
	GM.debug.refreshLogView();
};