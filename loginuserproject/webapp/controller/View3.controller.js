sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageToast",
    "sap/suite/ui/microchart/InteractiveBarChartBar",
    "sap/m/MessageBox"
], function(Controller, JSONModel, MessageToast, InteractiveBarChartBar) {
    "use strict";

    return Controller.extend("loginuserproject.controller.View3", {
        onInit: function() {
            var oView = this.getView();
            var sResponses = sessionStorage.getItem("responses");
            var sQuestions = sessionStorage.getItem("questions");
            if (sResponses && sQuestions) {
                var oResponses = JSON.parse(sResponses);
                var oQuestions = JSON.parse(sQuestions);
    
                this.oCombinedResponses = {
                    Q1: {
                        QuestionText: oQuestions.questions[0].text,
                        selectedText: oResponses.Q1.selectedText,
                        votes: oQuestions.questions[0].options.map(function(option) {
                            var incrementedVote = (option.text === oResponses.Q1.selectedText) ? option.vote + 1 : option.vote;
                            return {
                                text: option.text,
                                vote: incrementedVote,
                                selected: (option.text === oResponses.Q1.selectedText)
                            };
                        })
                    },
                    Q2: {
                        QuestionText: oQuestions.questions[1].text,
                        selectedText: oResponses.Q2.selectedText,
                        votes: oQuestions.questions[1].options.map(function(option) {
                            var incrementedVote = (option.text === oResponses.Q2.selectedText) ? option.vote + 1 : option.vote;
                            return {
                                text: option.text,
                                vote: incrementedVote,
                                selected: (option.text === oResponses.Q2.selectedText)
                            };
                        })
                    }
                };
                console.log("Combined Responses:", this.oCombinedResponses); 
                var oResponsesModel = new JSONModel(this.oCombinedResponses);             
                oView.setModel(oResponsesModel, "hellox");
            } else {
                MessageToast.show("No data");
            }
        },
        onClickAnalysis: function() {
            sessionStorage.setItem("comb_responses", JSON.stringify(this.oCombinedResponses));
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.navTo("RouteView4");
        },
        onSwitchToPieCharts: function () {
            sessionStorage.setItem("comb_responses", JSON.stringify(this.oCombinedResponses));
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.navTo("RouteView5");
        },
        onBackToPoll: function() {
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.navTo("RouteView2");
        }
    });
});
