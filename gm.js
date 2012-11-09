var GM = {};

GM.utility = {};

GM.debug = {};
GM.debug.level = 2; // 0 - severe only, 1 - errors, 2 - fine detail
GM.debug.logFile = [];
GM.debug.dom = null;
GM.debug.cmd = null;

GM.debug.log = function(ttl,msg,lvl) {
	GM.debug.logFile.push({
		title: ttl,
		message: msg,
		level: lvl
	});
	GM.debug.refreshLogView();
};

GM.debug.attachLogView = function(root) {
	var dom = document.createElement("div");
	dom.setAttribute("class","debug");

	// Build the command line
	var form = document.createElement("form");
	
	var cmd = document.createElement("input");
	cmd.setAttribute("type","text");
	GM.debug.cmd = cmd;
	
	var btn = document.createElement("input");
	btn.setAttribute("type","submit");
	btn.setAttribute("value","Exec");

	form.setAttribute("onsubmit","GM.debug.codeExec();");
	
	form.appendChild(cmd);
	form.appendChild(btn);
	dom.appendChild(form);

	// Build the log file view
	GM.debug.dom = document.createElement("div");
	dom.appendChild(GM.debug.dom);

	root.appendChild(dom);
};

GM.debug.refreshLogView = function() {
	var str = "";
	for(var i = GM.debug.logFile.length - 1;i >= 0;i--) {
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

GM.debug.codeExec = function() {
	alert(GM.debug.cmd.value);
};