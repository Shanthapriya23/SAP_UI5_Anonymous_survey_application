sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/ui/core/UIComponent",
    "sap/ui/model/json/JSONModel"
], function(Controller, MessageToast, UIComponent, JSONModel) {
    "use strict";

    return Controller.extend("loginuserproject.controller.View2", {
        onInit: function() {
            var oView = this.getView();
            var oModel = new JSONModel({
                questions: [
                    {
                        id: "Q1",
                        text: "Choose your MVP for the First Quarter of this year:",
                        options: [
                            { id: "Q1_Opt1", text: "employee1", vote: 2 },
                            { id: "Q1_Opt2", text: "employee2", vote: 7 },
                            { id: "Q1_Opt3", text: "employee3", vote: 6 },
                            { id: "Q1_Opt4", text: "employee4", vote: 4 },
                            { id: "Q1_Opt5", text: "employee5", vote: 7 },
                            { id: "Q1_Opt6", text: "employee6", vote: 2 },
                            { id: "Q1_Opt7", text: "employee7", vote: 10 }
                        ]
                    },
                    {
                        id: "Q2",
                        text: "Which new initiative would you like to see at SAP?",
                        options: [
                            { id: "Q2_Opt1", text: "More Remote Work Opportunities", vote: 2 },
                            { id: "Q2_Opt2", text: "Enhanced Employee Wellness Programs", vote: 8 },
                            { id: "Q2_Opt3", text: "Increased Diversity and Inclusion Efforts", vote: 9 },
                            { id: "Q2_Opt4", text: "Professional Development and Training", vote: 5 },
                            { id: "Q2_Opt5", text: "Sustainability and Green Initiatives", vote: 4 },
                            { id: "Q2_Opt6", text: "Flexible Working Hours", vote: 7 },
                            { id: "Q2_Opt7", text: "More Team Building Activities", vote: 3 }
                        ]
                    }
                ]
            });
            oView.setModel(oModel);
        },

        onNavBack: function() {
            var oRouter = UIComponent.getRouterFor(this);
            oRouter.navTo("RouteView1");
        },

        onSubmit: function() {
            var oView = this.getView();
            var oModel = oView.getModel();
            var aQuestions = oModel.getProperty("/questions");
            var oResponses = {};

            aQuestions.forEach(function(oQuestion, i) {
                var oRadioButtonGroup = oView.byId("radioGrp" + (i + 1));
                var iSelectedIndex = oRadioButtonGroup.getSelectedIndex();

                if (iSelectedIndex !== -1) {
                    var sSelectedText = oQuestion.options[iSelectedIndex].text;

                    oResponses[oQuestion.id] = {
                        selectedOption: iSelectedIndex,
                        selectedText: sSelectedText
                    };
                }
            });

            sessionStorage.setItem("responses", JSON.stringify(oResponses));
            sessionStorage.setItem("questions", JSON.stringify(oModel.getData()));
            MessageToast.show("Response Recorded Successfully");

            var oRouter = UIComponent.getRouterFor(this);
            oRouter.navTo("RouteView3");
        }
    });
});
