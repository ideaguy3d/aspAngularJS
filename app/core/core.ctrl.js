/**
 * Created by JHernandezAlvarado on 2/9/2017.
 */

(function () {
    'use strict';

    var controllerId = "CoreCtrl",
        app = angular.module('app');

    app.controller(controllerId, ['common', 'datacontext', 'jUserAccount', 'jCurrentUser',
        CoreClass]);

    function CoreClass(common, datacontext, jUserAccount, jCurrentUser) {
        var vm = this;

        vm.coreCtrlMessage = 'This is the Core Class Ctrl';
        vm.loginError = '';
        vm.authIsLoading = false;
        vm.ccIsLoggedIn = function () {
            return jCurrentUser.getProfile().isLoggedin;
        };
        vm.userData = {
            username: '',
            email: '',
            password: '',
            confirmPassword: ''
        };

        vm.ccLoginFn = function () {
            vm.authIsLoading = true;
            vm.userData.grant_type = 'password';
            vm.userData.username = vm.userData.email;

            jUserAccount.login.loginUser(vm.userData, function (data) {
                vm.authIsLoading = false;
                console.log(data);
                vm.userData.password = '';
                vm.loginError = '';
                jCurrentUser.setProfile(vm.userData.username, data.access_token);
                vm.userData.get_username = function () {
                    return jCurrentUser.getProfile().username;
                }
            }, function (err) {
                vm.authIsLoading = false;
                vm.loginError = 'There has been a login error: \n' + err.statusText;
                var errProps = "";
                for (var prop in err) errProps += (' - ' + prop);
                console.log('errProps = ' + errProps);
                if (err.data.exceptionMessage) {
                    vm.loginError += " " + err.data.exceptionMessage;
                }

                if (err.data.error) {
                    vm.loginError += " " + err.data.error;
                }
            });
        };

        vm.ccLogoutFn = function () {
            console.log("jha - logout function invoked.");
            jUserAccount.logout.logoutUser(vm.userData, function () {
                console.log("jha - successfully logged out.");
            })
        };

        vm.ccRegisterFn = function () {
            vm.authIsLoading = true;
            vm.userData.confirmPassword = vm.userData.password;
            console.log("The register button was pressed, now to make the request...");
            jUserAccount.register.registerUser(vm.userData, function(data){
                vm.authIsLoading = false;
                vm.userData.confirmPassword = "";
                vm.loginError = "Registration success. No errors.";
                vm.ccLoginFn();
            }, function(err){
                vm.authIsLoading = false;
                vm.loginError = "response.statusText = " + err.statusText;
                if(err.data.exceptionMessage) {
                    vm.loginError += " - exception message: " + err.data.exceptionMessage;
                }

                if(err.data.modelState) {
                    for (var prop in err.data.modelState) {
                        vm.loginError += "modelState.prop = " + err.data.modelState[prop];
                    }
                }
            });
        };
    }
})();