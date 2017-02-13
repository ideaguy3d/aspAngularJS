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
            // jUserAccount.register.user()
            register: $resource(jAppSettings.serverPath + 'api/Account/Register', null,
                {
                    'registerUser': {
                        method: 'POST'
                    }
                }
            ),
            login: $resource(jAppSettings.localPath + 'Token', null,
                {
                    'loginUser': {
                        method: 'POST',
                        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                        transformRequest: function (data, headersGetter) {
                            var str = [];
                            console.log(jAppSettings.serverPath + 'Token');
                            console.log(data);
                            for (var d in data) {
                                str.push(encodeURIComponent(d) + "=" + encodeURIComponent(data[d]));
                            }
                            return str.join('&');
                        }
                    }
                }
            ),
            logout: $resource(jAppSettings.localPath + 'api/Account/Logout', null,
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