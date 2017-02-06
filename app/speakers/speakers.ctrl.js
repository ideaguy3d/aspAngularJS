/**
 * Created by Julius Alvarado on 2/4/2017.
 */

(function () {
    "use strict";

    var controllerId = 'speakers';

    angular.module('app').controller(controllerId, ['common', 'config', 'datacontext', SpeakersClass]);

    function SpeakersClass(common, config, datacontext) {
        var vm = this,
            getLogFn = common.logger.getLogFn,
            log = getLogFn(controllerId),
            keyCodes = config.keyCodes;

        vm.title = 'Speakers';
        vm.filteredSpeakers = [];
        vm.speakerInput = '';
        vm.speakerSearch = '';
        vm.search = searchFn;
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
        
        function searchFn($event) {
            if($event.keyCode === keyCodes.esc) {
                vm.speakerSearch = '';
            }
            applyFilter();
        }

        function applyFilter() {
            vm.filteredSpeakers = vm.speakers.filter(speakerFilter);
        }

        function speakerFilter(speaker) {
            var fullname = (speaker.firstName+" "+speaker.lastName);
            return vm.speakerSearch ?
                common.textContains(fullname, vm.speakerSearch) : true;
        }

        function getSpeakers() {
            return datacontext.getSpeakerPartials().then(function (data) {
                vm.speakers = data;
                applyFilter();
                return vm.speakers;
            })
        }
        // #endregion
    }
}());

//