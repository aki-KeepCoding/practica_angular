(function() {
    angular
        .module('whatapop')
        .service('DistanceService', DistanceService)

        DistanceService.$inject = ['$http', '$q', '$log', 'CONF', 'lodash']

        function DistanceService ($http, $q, $log, CONF, _) {
            var distance = {
                enabled: false,
                km: 500
            }
            
            // Interface
            return {
                distance: distance
            }
        }
})();