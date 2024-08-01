sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/viz/ui5/data/FlattenedDataset",
    "sap/ui/model/json/JSONModel"
], function (Controller, FlattenedDataset, JSONModel) {
    "use strict";

    return Controller.extend("loginuserproject.controller.View5", {
        onInit: function () {
            var oView = this.getView();
            var sComb_res = sessionStorage.getItem("comb_responses");
            if (sComb_res) {
                var oCResponses = JSON.parse(sComb_res);
                console.log("Combined Responses in View5:", oCResponses);
                var oCRModel = new JSONModel(oCResponses);
                oView.setModel(oCRModel, "cResponses");

                this._updateDonutCharts();
            } else {
                console.log("No data available.");
            }
        },
        onAfterRendering: function () {
            var oView = this.getView();
            var oModel = oView.getModel("cResponses");

            var sQ1Title = oModel.getProperty("/Q1/QuestionText");
            var sQ2Title = oModel.getProperty("/Q2/QuestionText");

            var oVizFrameQ1 = oView.byId("donutChartQ1");
            var oVizFrameQ2 = oView.byId("donutChartQ2");

            var oVizPropertiesQ1 = oVizFrameQ1.getVizProperties() || {};
            var oVizPropertiesQ2 = oVizFrameQ2.getVizProperties() || {};

            // Set the title dynamically
            oVizPropertiesQ1.title = { text: sQ1Title };
            oVizPropertiesQ2.title = { text: sQ2Title };

            oVizFrameQ1.setVizProperties(oVizPropertiesQ1);
            oVizFrameQ2.setVizProperties(oVizPropertiesQ2);
        },
        _updateDonutCharts: function () {
            
        },

        onBackToBarCharts: function () {
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.navTo("RouteView4");
        },
        onBackToPoll: function () {
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.navTo("RouteView2");
        },
        onLogout: function () {
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.navTo("RouteView1");
        }
    });
});
