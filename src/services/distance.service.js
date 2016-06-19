(function() {
    angular
        .module('whatapop')
        .service('DistanceService', DistanceService)

        DistanceService.$inject = ['$http', '$q', '$log', 'CONF', 'lodash']

        function DistanceService ($http, $q, $log, CONF, _) {

            // El objeto distance almacena el estado del filtro de distancia
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