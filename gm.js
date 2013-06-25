var GM = {};

GM.utility = {};
GM.utility.deepCopy = function(source,target) {
	var target = target || {};
	for(var i in source) {
		if(source[i] === null) {
			target[i] = source[i];
		}
		else if(typeof(source[i]) === "object") {
			target[i] = (source[i].constructor === Array) ? [] : {};
			GM.utility.deepCopy(source[i],target[i]);
		}
		else {
			target[i] = source[i];
		}
	}
	return target;
};

GM.settings = {
	version: "20121115",
	localStorageToken: "gm-tool.data"
};

GM.debug = {};
GM.debug.level = 2; // 0 - severe only, 1 - errors, 2 - fine detail
GM.debug.logFile = [];
GM.debug.dom = null;
GM.debug.cmd = null;
GM.debug.hidden = true;

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

	var hide = document.createElement("input");
	hide.setAttribute("type","button");
	hide.setAttribute("value","Toggle");
	hide.setAttribute("onclick","GM.debug.hideLog(); return false;");

	form.setAttribute("onsubmit","GM.debug.codeExec(); return false;");
	
	form.appendChild(cmd);
	form.appendChild(sbt);
	form.appendChild(btn);
	form.appendChild(hide);
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
			if(i < 10)
				str += "00" + i;
			else if(i < 100)
				str += "0" + i;
			else
				str += i;
			str += "> " + line + "<br />";
		}
	}
	GM.debug.dom.innerHTML = str;
};

GM.debug.clearLog = function() {
	GM.debug.logFile = [];
	GM.debug.refreshLogView();
};

GM.debug.hideLog = function() {
	if(GM.debug.hidden) {
		GM.debug.dom.style.display = "block";
		GM.debug.hidden = false;
	}
	else {
		GM.debug.dom.style.display = "none";
		GM.debug.hidden = true;
	}
};

GM.debug.codeExec = function() {
	var cmd = GM.debug.cmd.value;
	GM.debug.log("MSG: User Exec",cmd,0);
	GM.debug.cmd.value = "";
	try {
		eval(cmd);
	}
	catch (exception) {
		GM.debug.log("ERROR",exception,0);
	}
};

// Debug Command Line Helper Functions /////////////////////////////////////////////////////////////
GM.debug.stringify = function(object) {
	alert(JSON.stringify(object));
};

GM.debug.stringifyData = function(svc) {
	GM.debug.stringify(svc.dat);
};

// Key Bindings ////////////////////////////////////////////////////////////////////////////////////
GM.keyBindings = function(event) {
	event.keycode;
	event.shiftKey;
	event.ctrlKey;
	event.altKey;
	event.metaKey;
};

// Helper Objects //////////////////////////////////////////////////////////////////////////////////
GM.objects = {};

GM.objects.roll = function(type,roll,adjust,tav) {
	this.type = type;
	this.roll = roll;
	this.adjust = adjust;
	this.total = roll + adjust;
	this.tav = tav;

	this.status = 0;
	if(parseInt(roll/11) === roll/11)
		this.status += GM.objects.roll.status.crit;
	if(this.total >= tav)
		this.status += GM.objects.roll.status.success;
	if(roll === 1)
		this.status += GM.objects.roll.status.fumble;
	if(roll === 100)
		this.status += GM.objects.roll.status.ace;
};

GM.objects.rollEvent = function(actor,target,rolls) {
	this.actor = actor;
	this.target = target;
	this.rolls = rolls;
};

GM.objects.roll.status = {
	"crit": 0x01,
	"ace": 0x02,
	"fumble": 0x04,
	"success": 0x08,
	"failure": 0x10
};