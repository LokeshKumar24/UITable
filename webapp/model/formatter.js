sap.ui.define([], function () {
	"use strict";
	return {
        
        color:function(value){
			debugger;
			switch (value) {
				case value > 50 :
					return "Success"
					case value > 25 :
					return "Warning"
					default: return "Error"	
			}
			
        }
		}
	});
