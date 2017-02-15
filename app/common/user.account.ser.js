/**
 * Created by JHernandezAlvarado on 2/13/2017.
 */

(function () {
    'use strict';

    var app = angular.module('app'),
        serviceId = 'jUserAccount';

    app.factory(serviceId, ['$resource', 'jAppSettings', jUserAccountClass]);

    function jUserAccountClass($resource, jAppSettings) {
        var vm = this;
        vm.userAccountMessage = 'User Account Service wired up (:';

        return {
            // jUserAccount.register.registerUser()
            register: $resource(jAppSettings.cloudPath + '/api/Account/Register', null,
                {
                    'registerUser': {
                        method: 'POST'
                    }
                }
            ),
            login: $resource(jAppSettings.cloudPath + '/Token', null,
                {
                    'loginUser': {
                        method: 'POST',
                        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                        transformRequest: function (data, headersGetter) {
                            var str = [];
                            console.log(jAppSettings.cloudPath + 'Token');
                            console.log(data);
                            for (var d in data) {
                              console.log(d+"="+data[d]);
                                str.push(encodeURIComponent(d) + "=" + encodeURIComponent(data[d]));
                            }
                            return str.join('&');
                        }
                    }
                }
            ),
            logout: $resource(jAppSettings.cloudPath + 'api/Account/Logout', null,
                {
                    'logoutUser': {
                        method: 'POST'
                    }
                }
            )
        }
    } // END OF: jUserAccountClass ^_^/
})();

//