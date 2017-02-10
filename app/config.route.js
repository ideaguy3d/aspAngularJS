(function () {
    'use strict';

    var app = angular.module('app');

    // Collect the routes
    app.constant('routes', getRoutes());
    
    // Configure the routes and route resolvers
    app.config(['$routeProvider', 'routes', jhaRouteConfiguratorClass]);

    function jhaRouteConfiguratorClass($routeProvider, routes) {

        /*
         // example allow resolve:
         $routeProvider.when('/pass', {
         templateUrl: 'app/speakers/speakers.tem.html',
         resolve: {
         fake: fakeAllow
         }
         });

         fakeAllow.$inject = ['$q'];
         function fakeAllow($q) {
         var data = { x: 1 };
         var defer = $q.defer();
         defer.resolve(data);
         return defer.promise;
         }

         // example reject resolve:
         $routeProvider.when('/fail', {
         templateUrl: 'app/attendees/attendees.tem.html',
         resolve: {fake: fakeReject}
         });

         fakeReject.$inject = ['$q'];
         function fakeReject($q) {
         var defer = $q.defer();
         defer.reject({msg: 'jha - Practicing Route Rejection.'});
         return defer.promise;
         }
        */

        routes.forEach(function (r) {
            // $routeProvider.when(r.url, r.config);
            setRoute(r.url, r.config);
        });

        $routeProvider.otherwise( { redirectTo: '/' } );
        
        function setRoute(url, definition) {
            // set resolvers for all the routes by extending any existing resolver or creating a new one.
            definition.resolve = angular.extend(definition.resolve || {}, {
                prime: PrimeClass
            });
            $routeProvider.when(url, definition);
            return $routeProvider;
        }
    }

    // this is how I'm injecting data into all the routes b4they resolve.
    PrimeClass.$inject = ['datacontext'];
    function PrimeClass(dc) {
        return dc.prime();
    }

    // Define the routes 
    function getRoutes() {
        return [
             {
                url: '/',
                config: {
                    title: 'district-progress',
                    templateUrl: 'app/district-progress/district.progress.tem.html',
                    settings: {
                        nav: 1,
                        content: '<i class="icon-lock"></i> District Progress'
                    }
                }
            }, {
                url: '/dashboard',
                config: {
                    templateUrl: 'app/dashboard/dashboard.html',
                    title: 'dashboard',
                    settings: {
                        nav: 2,
                        content: '<i class="icon-dashboard"></i> Site Visits'
                    }
                }
            }, {
                url: '/sessions',
                config: {
                    title: 'sessions',
                    templateUrl: 'app/sessions/sessions.tem.html',
                    settings: {
                        nav: 3,
                        content: '<i class="icon-calendar"></i> People'
                    }
                }
            }, {
                url: '/speakers',
                config: {
                    title: 'speakers',
                    templateUrl: 'app/speakers/speakers.tem.html',
                    settings: {
                        nav: 4,
                        content: '<i class="icon-user"></i> IM'
                    }
                }
            }
        ];
    }
})();