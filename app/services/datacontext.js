(function () {
    'use strict';

    var serviceId = 'datacontext';
    angular.module('app').factory(serviceId,
        ['common', datacontext]);

    function datacontext(common) {
        var $q = common.$q,
            getLogFn = common.logger.getLogFn,
            log = getLogFn(serviceId),
            primePromise;

        var storeMeta = {
            isLoaded: {
                sessions: false,
                attendees: false
            }
        };

        var entityNames = {
            attendee: 'Person',
            person: 'Person',
            speaker: 'Person',
            session: 'Session',
            room: 'Room',
            track: 'Track',
            timeslot: 'TimeSlot'
        };

        var service = {
            getPeople: getPeople,
            getMessageCount: getMessageCount,
            getSessionPartials: getSessionPartials,
            prime: prime,
            getSpeakerPartials: getSpeakerPartials,
            getAttendees: getAttendees
        };

        return service;

        //---------- data request functions ----------\\

        function getAttendees() {
            var attendeesData = [
                {firstName: 'Dave', lastName: 'Ward', age: 30, imageSource: 'dave_ward.jpg'},
                {firstName: 'Bred', lastName: 'Green', age: 31, imageSource: 'brad_green.jpg'},
                {firstName: 'John', lastName: 'Papa', age: 35, imageSource: 'john_papa.jpg'},
                {firstName: 'Julius', lastName: 'Alvarado', age: 28, imageSource: 'julius_alvarado.jpg'}
            ];

            return $q.when(attendeesData);
        }

        function getSpeakerPartials() {
            var speakersData = [
                { firstName: 'Dave', lastName: 'Ward', imageSource: 'dave_ward.jpg' },
                { firstName: 'Bred', lastName: 'Green', imageSource: 'brad_green.jpg' },
                { firstName: 'John', lastName: 'Papa', imageSource: 'john_papa.jpg' },
                { firstName: 'Julius', lastName: 'Alvarado', imageSource: 'julius_alvarado.jpg' }
            ];

            return $q.when(speakersData);
        }

        function getMessageCount() {
            return $q.when(72);
        }

        function getPeople() {
            var people = [
                { firstName: 'John', lastName: 'Papa', age: 25, location: 'Florida' },
                { firstName: 'Ward', lastName: 'Bell', age: 31, location: 'California' },
                { firstName: 'Colleen', lastName: 'Jones', age: 21, location: 'New York' },
                { firstName: 'Madelyn', lastName: 'Green', age: 18, location: 'North Dakota' },
                { firstName: 'Ella', lastName: 'Jobs', age: 18, location: 'South Dakota' },
                { firstName: 'Landon', lastName: 'Gates', age: 11, location: 'South Carolina' },
                { firstName: 'Haley', lastName: 'Guthrie', age: 35, location: 'Wyoming' }
            ];

            return $q.when(people);
        }

        function getSessionPartials(forceRemote) {
            var sessionsData = [
                    { // -- me -- \\
                        speaker: {
                            imageSource: 'julius_alvarado.jpg',
                            fullName: 'Julius Alvarado'
                        },
                        room: { name: 'Room: Ninja-1z' },
                        level: 5,
                        track: { name: 'JavaScript' },
                        code: 'cedr1',
                        tagsFormatted: '#javascript #typescript #node #es6',
                        title: 'Guru'
                    },  { // -- 1st data -- \\
                        speaker: {
                            imageSource: 'dave_ward.jpg',
                            fullName: 'Marcus Aurelius'
                        },
                        room: {name: 'Room: Ninja-1a'},
                        level: 3,
                        track: { name: 'JavaScript' },
                        code: 'cedr1',
                        tagsFormatted: '#javascript #typescript #node #es6',
                        title: 'Guru'
                    }, { // -- 2nd data -- \\
                        speaker: {
                            imageSource: 'brad_green.jpg',
                            fullName: 'Maximus Pious'
                        },
                        room: {name: 'Room: Ninja-2b'},
                        level: 2,
                        track: {name: 'JavaScript'},
                        code: 'cedr2',
                        tagsFormatted: '#javascript #typescript #node #es6',
                        title: 'Guru'
                    }, { // -- 3rd data -- \\
                        speaker: {
                            imageSource: 'john_papa.jpg',
                            fullName: 'Vitalius Pastourius'
                        },
                        room: {name: 'Room: Ninja-3c'},
                        level: 1,
                        track: {name: 'JavaScript'},
                        code: 'cedr3',
                        tagsFormatted: '#javascript #typescript #node #es6',
                        title: 'Guru'
                    }, { // -- 4th data -- \\
                        speaker: {
                            imageSource: 'rey_bango.jpg',
                            fullName: 'Julius Romulus'
                        },
                        room: {name: 'Room: Ninja-4d'},
                        level: 4,
                        track: {name: 'JavaScript'},
                        code: 'cedr4',
                        tagsFormatted: '#javascript #typescript #node #es6',
                        title: 'Guru'
                    }
                ],
                orderBy = {
                    level: ' the model level'
                };

            console.log("jha - forceRemote = "+forceRemote, " _areSessionsLoaded = "+_areSessionsLoaded());
            if (_areSessionsLoaded() && !forceRemote) {
                console.log("jha - forcing a remote call");
                sessionsData = _getAllLocal(entityNames.session, orderBy);
                return $q.when(sessionsData);
            }

            // request is successful
            _areSessionsLoaded(true);
            log('Retrieved [Session Partials] from remote data source');
            return $q.when(sessionsData);
        }

        function _areSessionsLoaded(val) {
            return _areItemsLoaded('sessions', val);
        }

        function _areAttendeesLoaded(val) {
            return _areItemsLoaded('attendees', val);
        }
        
        function _areItemsLoaded(key, val) {
            if(val === undefined) {
                // will initially be false.
                return storeMeta.isLoaded[key]; // get
            }
            return storeMeta.isLoaded[key] = val; // set
        }

        function prime() {
            console.log("jha - prime invoked.");
            if (primePromise) return primePromise;

            // since I'm not pulling from a real db I just return an empty array.
            primePromise = [];

            return $q.when(primePromise);
        }

        function _getAllLocal(resourceName, ordering) {
            console.log("jha - hit the backend for "+resourceName+" then order it by"+ordering["level"]);
            /*
             return resourceName.sort(function (a, b) {
             return (a.level+ordering.level) - (b.level+ordering.level);
             });
            */

        }
    }
})();