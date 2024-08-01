sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/suite/ui/microchart/InteractiveBarChartBar"
], function (Controller, JSONModel, InteractiveBarChartBar) {
    "use strict";

    return Controller.extend("loginuserproject.controller.View4", {
        onInit: function () {
            var oView = this.getView();
            var sComb_res = sessionStorage.getItem("comb_responses");
            if (sComb_res) {
                var oCResponses = JSON.parse(sComb_res);
                console.log("Combined Responses in View4:", oCResponses);
                var oCRModel = new JSONModel(oCResponses);
                oView.setModel(oCRModel, "cResponses");

                this._updateCharts();
            } else {
                console.log("No data available.");
            }
        },

        _updateCharts: function () {
            var oView = this.getView();
            var oModel = oView.getModel("cResponses");
            if (!oModel) {
                console.error("Model not found.");
                return;
            }
            var oData = oModel.getData();
            if (!oData) {
                console.error("No data found in model.");
                return;
            }

            console.log("Data:", oData);
            console.log("Data for Q1:", oData.Q1);
            console.log("Data for Q2:", oData.Q2);
            var aBarsQ1 = [];
            var aBarsQ2 = [];

            // Processing Question 1
            if (oData.Q1) {
                var sQuestionTextQ1 = oData.Q1.QuestionText;
                console.log("Question 1 Data:", oData.Q1.votes);

                var maxVoteQ1 = Math.max(...oData.Q1.votes.map(v => v.vote));

                oData.Q1.votes.forEach(function (vote) {
                    var oBar = new InteractiveBarChartBar({
                        label: vote.text,
                        value: vote.vote,
                        color: vote.vote === maxVoteQ1 ? "Good" : "Neutral" 
                    });

                    aBarsQ1.push(oBar);
                });

                var oChartQ1 = this.byId("chartQ1");
                if (oChartQ1) {
                    oChartQ1.destroyBars();
                    aBarsQ1.forEach(function (oBar) {
                        oChartQ1.addBar(oBar);
                    });
                    this.byId("questionTextQ1").setText(sQuestionTextQ1);
                } else {
                    console.error("Chart for Question 1 not found.");
                }
            } else {
                console.log("No data for Q1.");
            }


            if (oData.Q2) {
                var sQuestionTextQ2 = oData.Q2.QuestionText;
                console.log("Question 2 Data:", oData.Q2.votes);

                var maxVoteQ2 = Math.max(...oData.Q2.votes.map(v => v.vote));

                oData.Q2.votes.forEach(function (vote) {
                    var oBar = new InteractiveBarChartBar({
                        label: vote.text,
                        value: vote.vote,
                        color: vote.vote === maxVoteQ2 ? "Good" : "Neutral" // Highlight highest bar
                    });

                    aBarsQ2.push(oBar);
                });

                var oChartQ2 = this.byId("chartQ2");
                if (oChartQ2) {
                    oChartQ2.destroyBars();
                    aBarsQ2.forEach(function (oBar) {
                        oChartQ2.addBar(oBar);
                    });
                    this.byId("questionTextQ2").setText(sQuestionTextQ2);
                } else {
                    console.error("Chart for Question 2 not found.");
                }
            } else {
                console.log("No data for Q2.");
            }
        },

        onBackToPoll: function () {
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.navTo("RouteView2");
        },

        onSwitchToPieCharts: function () {
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.navTo("RouteView5");
        },
        
        onLogout: function () {
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.navTo("RouteView1");
        }
    });
});
            // Processing Question 2