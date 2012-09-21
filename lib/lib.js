var lib = {};

// -------------------------------------------------------------------------------------------------
// Creates a shallow copy of the object.  Standard data is copied but complex objects are not.
// -------------------------------------------------------------------------------------------------
lib.copy = function(obj) {
	var newObj = (obj instanceof Array) ? [] : {};
	for(i in obj) {
		newObj[i] = obj[i];
	}
	return newObj;
};

// -------------------------------------------------------------------------------------------------
// Creates a deep copy of the object.  All data is copied; even objects.
// -------------------------------------------------------------------------------------------------
lib.deepCopy = function(obj) {
	var newObj = (obj instanceof Array) ? [] : {};
	for(i in obj) {
		if(obj[i] && typeof obj[i] == "object")
			newObj[i] = lib.deepCopy(obj[i]);
		else
			newObj[i] = obj[i];
	}
	return newObj;
};

lib.deepCopyTo = function(obj,tar) {
	for(i in obj) {
		if(obj[i] && typeof obj[i] == "object")
			tar[i] = lib.deepCopy(obj[i]);
		else
			tar[i] = obj[i];
	}
};