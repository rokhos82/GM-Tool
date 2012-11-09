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
	
	var sbt = document.createElement("input");
	sbt.setAttribute("type","submit");
	sbt.setAttribute("value","Exec");

	var btn = document.createElement("input");
	btn.setAttribute("type","button");
	btn.setAttribute("value","Clear");
	btn.setAttribute("onclick","GM.debug.clearLog(); return false;"); 

	form.setAttribute("onsubmit","GM.debug.codeExec(); return false;");
	
	form.appendChild(cmd);
	form.appendChild(sbt);
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
	var cmd = GM.debug.cmd.value;
	GM.debug.log("User Exec",cmd,0);
	GM.debug.cmd.value = "";
	try {
		eval(cmd);
	}
	catch (exception) {
		GM.debug.log("ERROR",exception,0);
	}
};