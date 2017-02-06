/**
 * Created by Julius Alvarado on 2/5/2017.
 */

(function () {
    "use strict";

    var serviceId = 'jhaRouteMediator';

    angular.module('app').factory(serviceId, ['$rootScope', '$location', 'logger', 'config',
        RouteMediatorClass]);

    function RouteMediatorClass($rootScope, $location, logger, config) {
        var service = {
                setRoutingHandlers: setRoutingHandlers
            },
            handleRouteChangeError = false;

        return service;

        function setRoutingHandlers() {
            updateDocTitle();
            handleRoutingErrors();
        }

        // this will basically happen if the route I go to doesn't have a template file to render
        function handleRoutingErrors() {
            $rootScope.$on('$routeChangeError', function (event, current, previous, rejection) {
                if(handleRouteChangeError) return;
                handleRouteChangeError = true;
                var msg = 'Error routing: ' + (current && current.name) +
                    '... '+(rejection.msg || 'unknown error');
                logger.logWarning(msg, current, serviceId, true);
                $location.path('/');
            });
        }

        function updateDocTitle() {
            $rootScope.$on('$routeChangeSuccess', function (event, current, previous) {
                handleRouteChangeError = false;
                var title = config.docTitle + ' ' + (current.title || '');
                $rootScope.title = title;
            });
        }
    } // END OF: RouteMediatorClass; ^_^/
}());