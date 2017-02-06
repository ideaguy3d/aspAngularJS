/**
 * Created by Julius Alvarado on 2/4/2017.
 */

(function () {
    "use strict";

    var controllerId = 'speakers';

    angular.module('app').controller(controllerId, ['common', 'datacontext', SpeakersClass]);

    function SpeakersClass(common, datacontext) {
        var vm = this,
            getLogFn = common.logger.getLogFn,
            log = getLogFn(controllerId);

        vm.title = 'Speakers';
        vm.speakers = [];

        activate();

        // #region utility methods
        function activate() {
            common.activateController([getSpeakers(), controllerId])
                .then(function () {
                    log('Speakers View Activated');
                }
            );
        }

        function getSpeakers() {
            return datacontext.getSpeakerPartials().then(function (data) {
                vm.speakers = data;
            })
        }
        // #endregion
    }
}());

//