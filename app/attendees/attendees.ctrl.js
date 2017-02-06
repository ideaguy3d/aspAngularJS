/**
 * Created by Julius Alvarado on 2/5/2017.
 */

(function(){
    "use strict"; 
    
    var ctrlId = "attendees";
    
    angular.module('app').controller(ctrlId, ['common', 'datacontext', AttendeesClass]);
    
    function AttendeesClass(common, datacontext) {
        // internal variables
        var vm = this,
            getLogFn = common.logger.getLogFn,
            log = getLogFn(ctrlId);
        
        // view model bindings
        vm.title = 'Attendees';
        vm.attendees = [];

        activate();

        function activate() {
            common.activateController([getAttendees()], ctrlId).then(function(){
                log('Attendees View Activated (:');
            });
        }     
        
        function getAttendees() {
            return datacontext.getAttendees().then(function(data){
                vm.attendees = data;
                return data;
            });
        }
    } //
    
})();
