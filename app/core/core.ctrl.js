/**
 * Created by JHernandezAlvarado on 2/9/2017.
 */

(function(){
    'use strict';

    var controllerId = "CoreCtrl",
        app = angular.module('app');

    app.controller(controllerId, ['common', 'datacontext', CoreClass]);

    function CoreClass(common, datacontext) {
        var vm = this;

        vm.coreCtrlMessage = 'This is the Core Class Ctrl';
        vm.ccIsLoggedIn = false;

        vm.ccLogInFn = function(){
            vm.ccIsLoggedIn = !vm.ccIsLoggedIn;
        }
    }
})();