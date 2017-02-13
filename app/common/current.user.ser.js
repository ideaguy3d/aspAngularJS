/**
 * Created by JHernandezAlvarado on 2/13/2017.
 */

(function(){
    'use strict';

    var app = angular.module('app'),
        serviceId = 'jCurrentUser';
    app.factory(serviceId, [CurrentUserClass]);
    
    function CurrentUserClass() {
        var profile = {
            isLoggedin: false,
            username: '',
            token: ''
        };

        var setProfile = function (username, token) {
            profile.isLoggedin = true;
            profile.username = username;
            console.log("profile.username: "+profile.username);
            profile.token = token;
        };

        var getProfile = function(){
            return profile;
        };

        return {
            setProfile: setProfile,
            getProfile: getProfile
        }
    }
})();

//