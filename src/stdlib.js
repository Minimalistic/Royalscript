//ROYAL SCRIPT STANDARD LIB

//recursively calls sublists of arguments from the lib to unnest the AST
var callLib = function(lib, first, second, spacer){
	if(typeof second === 'object' && first in lib){
		return lib[first](second, spacer);
	}
	else {
		return first;
	}
};

exports.callLib = callLib;

//util function that unnests only 2 arguments from an AST node, otherwise throws error
/*var get2Args = function(lib, args, spacer){
	switch(args.length){
		case 2:
		   if(typeof args[1] === 'object') throw "Argument Error: Got improper arguments but expected 2.";
		   else return [args[0], args[1]];
		case 3:
		   break;
		case 4:
		   break;
		default:
		   throw "Argument Error: Got improper arguments but expected 2.";
	}
};*/

//standard library object
//functions starting with , are private and cannot be called in the front-end
var STD = {
	//Comma join util cannot be directly called
	",":function(args, spacer){
		var str = spacer + callLib(this, args[0], args[1], spacer);
		for (var i = 1; i < args.length; i++) {
			if(!(typeof args[i] === 'object')){
				str += ", " + callLib(this, args[i], args[i+1], spacer);
			}
		};
		return str;
	},
	//private infix joiner function
	",infix":function(sep, args, spacer){
		var str = spacer + callLib(this, args[0], args[1], spacer);
		for (var i = 1; i < args.length; i++) {
			if(!(typeof args[i] === 'object')){
				str += sep + callLib(this, args[i], args[i+1], spacer);
			}
		};
		return str;		
	},
	//same as ,infix but has a limit of the amount of arguments it links
	",ifixn":function(sep, limit, args, spacer){
		if(args.length < 1 || args.length > limit) throw "Argument Error: Improper number of arguments";
		var str = spacer + callLib(this, args[0], args[1], spacer);
		for (var i = 1; i < args.length; i++) {
			if(!(typeof args[i] === 'object')){
				str += sep + callLib(this, args[i], args[i+1], spacer);
			}
		};
		return str;		
	},
	//MATH
	"+":function(args, spacer){
		var str = spacer + callLib(this, args[0], args[1], spacer);
		for (var i = 1; i < args.length; i++) {
			if(!(typeof args[i] === 'object')){
				str += " + " + callLib(this, args[i], args[i+1], spacer);
			}
		};
		return str;
	},
	"-":function(args, spacer){
		var str = spacer + callLib(this, args[0], args[1], spacer);
		for (var i = 1; i < args.length; i++) {
			if(!(typeof args[i] === 'object')){
				str += " - " + callLib(this, args[i], args[i+1], spacer);
			}
		};
		return str;
	},
	"*":function(args, spacer){
		var str = spacer + callLib(this, args[0], args[1], spacer);
		for (var i = 1; i < args.length; i++) {
			if(!(typeof args[i] === 'object')){
				str += " * " + callLib(this, args[i], args[i+1], spacer);
			}
		};
		return str;
	},
	"/":function(args, spacer){
		var str = spacer + callLib(this, args[0], args[1], spacer);
		for (var i = 1; i < args.length; i++) {
			if(!(typeof args[i] === 'object')){
				str += " / " + callLib(this, args[i], args[i+1], spacer);
			}
		};
		return str;
	},
	"%":function(args, spacer){
		var str = spacer + callLib(this, args[0], args[1], spacer);
		for (var i = 1; i < args.length; i++) {
			if(!(typeof args[i] === 'object')){
				str += " % " + callLib(this, args[i], args[i+1], spacer);
			}
		};
		return str;
	},
	//floor division, calls other function in lib
	"//":function(args, spacer) {
		return spacer + "Math.floor(" + this["/"](args, spacer) + ")";
	},
	"**":function(args, spacer){
		return spacer + "Math.pow(" + this[","](args, spacer) + ")";
	},
	//printing function
	"$":function(args, spacer){
		return spacer + "console.log(" + this[","](args, spacer) + ");";
	},
	//CONDITIONS
	//or oper
	"||":function(args, spacer){
		return this[",infix"](" || ", args, spacer);
	},
	//and oper
	"&&":function(args, spacer){
		var str = spacer + callLib(this, args[0], args[1], spacer);
		for (var i = 1; i < args.length; i++) {
			if(!(typeof args[i] === 'object')){
				str += " && " + callLib(this, args[i], args[i+1], spacer);
			}
		};
		return str;
	},
	"==":function(args, spacer){
		return this[",ifixn"](" === ", 4, args, spacer);
	},
	"!=":function(args, spacer){
		return this[",ifixn"](" !== ", 4, args, spacer);
	},
	">":function(args, spacer){
		return this[",ifixn"](" > ", 4, args, spacer);
	},
	"<":function(args, spacer){
		return this[",ifixn"](" < ", 4, args, spacer);
	},
	"<=":function(args, spacer){
		return this[",ifixn"](" <= ", 4, args, spacer);
	},
	">=":function(args, spacer){
		return this[",ifixn"](" >= ", 4, args, spacer);
	}
};

exports.STD = STD;

var obj = [ '$', [ '5', '6', '==', [ '+', ['5', '6'], '5'], '>=', ['true', 'false'] ] ];
console.log(STD[obj[0]](obj[1], ""));