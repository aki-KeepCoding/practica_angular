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
            $ctrl.distance = DistanceService.distance
            $ctrl.staticMapUrl = "#"
            $ctrl.$onInit = function () {
                GeolocationService
                    .getCurrentPosition()
                    .then(function (location) {
                        $ctrl.staticMapUrl = CONF.GOOGLE_MAPS_BASE +
                                            "center=" + location.latitude + "," + location.longitude + "&" +
                                            "zoom=14&" +
                                            "markers=color:red|" + location.latitude + "," + location.longitude + "&" +
                                            "size=300x100&" +
                                            "key=" + CONF.GOOGLE_MAPS_KEY;
                        console.log($ctrl.staticMapUrl)
                    })
                    .catch (function () {
                        $ctrl.staticMapUrl = "#"
                    })
            }
            
        }
})()