


(function() {
    angular
        .module('whatapop')
        .service('GeolocationService', GeolocationService)

        GeolocationService.$inject = ['$http', '$q', '$log', 'CONF']

        function GeolocationService ($http, $q, $log, CONF) {
            var currentPosition = {
                longitude: 0,
                latitude: 0
            }
            /* ==== INTERFACE ==== */
            return {
                isAvailable: isAvailable,
                getCurrentPosition: getCurrentPosition
            }
            /* ==== IMPLEMENTATION ==== */
            function isAvailable () {
                // Comprueba si el browser soporta la geolocalización
                if ("geolocation" in navigator){
                    return true
                } else {
                    return false
                }
            }
            // Obtener la posiión actual 
            function getCurrentPosition(){
                var deferred = $q.defer()
                if (!isAvailable()) {
                    $log.error("No geolocation available in your browser")
                    deferred.reject({})
                }
                navigator.geolocation.getCurrentPosition(function(position) {
                    deferred.resolve(position.coords)
                });
                return deferred.promise
            }
        }
})();