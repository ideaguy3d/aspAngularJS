/**
 * Created by JHernandezAlvarado on 2/9/2017.
 */
(function(){
    'use strict';

    var controllerId = "DistrictProgressCtrl",
        app = angular.module('app');

    app.controller(controllerId, ['common', 'datacontext', DistrictProgressClass]);

    function DistrictProgressClass(common, datacontext) {
        var vm = this,
            getLogFn = common.logger.getLogFn,
            log = getLogFn(controllerId);


        vm.viewTitle = 'District Progress';

        activate();

        function activate() {
            common.activateController([], controllerId).then(function(){
                log('District Progress Module Activated')
            });
        }
    }
})();