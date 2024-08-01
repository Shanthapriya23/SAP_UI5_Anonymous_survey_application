sap.ui.define(
    [
        "sap/ui/core/mvc/Controller",
        "sap/ui/model/json/JSONModel"
    ],
    function(Controller, JSONModel) {
      "use strict";
  
      return Controller.extend("loginuserproject.controller.App", {
        onInit: function() 
        {
          var oModel = new JSONModel("model/QuestionModel.json");
          this.getView().setModel(oModel);
        }
      });
    }
  );
  