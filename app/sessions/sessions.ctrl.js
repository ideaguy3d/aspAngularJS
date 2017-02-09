/**
 * Created by Julius Alvarado on 2/4/2017.
 */
(function(){
    "use strict";

    // Controller name is handy for logging
    var controllerId = 'sessions';

    // Define the controller on the module.
    // Inject the dependencies.
    // Point to the controller definition function.
    angular.module('app').controller(controllerId,
        ['common', 'datacontext', SessionsClass]);

    function SessionsClass(common, datacontext) {
        // Using 'Controller As' syntax, so we assign this to the vm variable (for viewmodel).
        var vm = this;
        var getLogFn = common.logger.getLogFn;
        var log = getLogFn(controllerId);

        // Bindable properties and functions are placed on vm.
        vm.sessions = [];
        vm.title = 'Application Manager';
        vm.refresh = refresh;
        
        activate();

        //#region internal and utility methods
        function activate() {
            common.activateController([getSessions()], controllerId)
                .then(function () { log('Activated Sessions View'); });
        }

        function getSessions(forceRefresh) {
            return datacontext.getSessionPartials(forceRefresh).then(function (data) {
                return vm.sessions = data;
            });
        }
        
        function refresh() {
            getSessions(true);
        }

        //#endregion
    } // END OF: SessionsClass; ^_^/
}());