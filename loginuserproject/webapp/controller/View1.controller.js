sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageBox"
], function (Controller, MessageBox) {
    "use strict";

    return Controller.extend("loginuserproject.controller.View1", {
        onInit: function () {},

        onLoginUser: function () {
            var username = this.getView().byId('inp_usernameId');
            var password = this.getView().byId('inp_passwordId');
            
            var users = {
                "user1": "pass1",
                "user2": "pass2",
                "user3": "pass3"
            };

            if (username.getValue() === '') {
                MessageBox.error("Please enter username!");
                return;
            } else if (password.getValue() === '') {
                MessageBox.error("Please enter password!");
                return;
            } else {
                var userPass = users[username.getValue()];
                if (userPass && userPass === password.getValue()) {
                    MessageBox.success("Login Successful!");
                    var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                    oRouter.navTo("RouteView2"); 
                } else {
                    MessageBox.error("Invalid Username or Password!");
                }
            }
        }
    });
});
