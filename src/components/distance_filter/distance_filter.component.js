/*
Componente de filtro de distancia
*/

(function() {
    angular
        .module('whatapop')
        .component('distanceFilter', {
            templateUrl: 'src/components/distance_filter/distance_filter.tmpl.html',
            controller: DistanceFilterComponent
        })

        DistanceFilterComponent.$inject = ['CONF','DistanceService', 'GeolocationService']

        function DistanceFilterComponent(CONF, DistanceService, GeolocationService) {
            var $ctrl = this
            // Objeto DistanceService.distance
            //   Otros componentes que enlacen este objeto serán actualizados cuando realicemos cambios 
            $ctrl.distance = DistanceService.distance
            $ctrl.staticMapUrl = "#"
            $ctrl.$onInit = function () {
                // Obtener imagen de nuestra posición actual
                // Obtenemos la url de la imagen estática de Google Static Maps API
                //   Para ello necesitamos la localización actual
                GeolocationService
                    .getCurrentPosition()
                    .then(function (location) {
                        $ctrl.staticMapUrl = CONF.GOOGLE_MAPS_BASE +
                                            "center=" + location.latitude + "," + location.longitude + "&" +
                                            "zoom=14&" +
                                            "markers=color:red|" + location.latitude + "," + location.longitude + "&" +
                                            "size=300x100&" +
                                            "key=" + CONF.GOOGLE_MAPS_KEY
                    })
                    .catch (function () {
                        $ctrl.staticMapUrl = "#"
                    })
            }
            
        }
})()