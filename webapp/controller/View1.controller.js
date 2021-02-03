sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"uitable/model/formatter",
	"sap/ui/model/json/JSONModel"
],
	/**
	 * @param {typeof sap.ui.core.mvc.Controller} Controller
	 */
	function (Controller,formatter,JSONModel) {
		"use strict";

		return Controller.extend("uitable.controller.View1", {
			formatter:formatter,
			onInit: function () {
		var	data=	this.getOwnerComponent().getModel().getProperty("/productionList")

		data.forEach((element,index) => {
			data[index].quantity=Number(element.quantity);
		});
		console.log(data);
		var model = new JSONModel({productionList:data});
		this.getOwnerComponent().setModel(model);
		this.addTable()
			},
			addCellColor:function(value){
				//debugger;
				 var table=this.getView().byId("uitab")
			     var items=table.getColumns();
				for(let i=0;i<items.length;i++){
					if(value>50){
						items[3].getAggregation("template").removeStyleClass("green");
						items[3].getAggregation("template").addStyleClass("green");
						
						break;
					}
					else if(value>25){
						items[3].getAggregation("template").addStyleClass("yellow");
						break;
					}
					else{
						items[3].getAggregation("template").addStyleClass("red");
						break;
					}
				}
				//this.addStyleClass("red")
				return value;
			},

			addTable:function(){
				var oTable = this.getView().byId("newtab");
				oTable.addColumn(
					new sap.ui.table.Column(
						{ label: "Quantity",
						 template: new sap.m.Text().bindProperty("text",{				
								path: "quantity" 	
						 })
					 }));
  
				var  template= new sap.m.Text().bindProperty("text",{
				   parts: [
					   {path: "quantity" },
					   {path: "brand" }
				   ],
				   formatter: function(quantity, brand){  
					 //  console.log(this)                
					 if(quantity>50 ){
					    this.addStyleClass("green");
					 
					 }  else  if(quantity >=25)
					 {
						  this.addStyleClass("yellow");
					 
					 }else{
						this.addStyleClass("red");
					 }
					 return brand ;
				   
				   }
				  })
				oTable.addColumn(
					new sap.ui.table.Column(
						{ label: "Brand",
						 template:  template
					 }));

					 var  template1= new sap.m.Text().bindProperty("text",{
						parts: [
							{path: "quantity" },
							{path: "productName" }
						],
						formatter: function(quantity, productName){                  
						  if(quantity>50 ){
							
							this.addCustomData(new sap.ui.core.CustomData(
							 {key: "colorcode", value: "green", writeToDom:true }
						   ));
						  
						  }  
						  else  if(quantity >= 25)
						  {
							   this.addCustomData(new sap.ui.core.CustomData(
								{key: "colorcode", value: "yellow", writeToDom:true }
							  ));
						  
						  }
						  else{
							this.addCustomData(new sap.ui.core.CustomData(
								{key: "colorcode", value: "red", writeToDom:true }
							  ));
						  }
						  return productName ;
						
						}
					   })


					 oTable.addColumn(
						new sap.ui.table.Column(
							{ label: "ProductName",
							 template:  template1
						 }));
			
			   
			}
			
		});
	});
