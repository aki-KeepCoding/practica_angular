(function() {
    angular
        .module('whatapop')
        .component('app', {
            $routeConfig: [
                {
                    name: 'Products',
                    path: '/products/...',
                    component: 'products',
                }
            ],
            controller: AppController,
            templateUrl : 'src/components/app/app.tmpl.html'
        })
    AppController.$inject = ['GeolocationService']

    function AppController (GeolocationService) {
        $ctrl = this
        $ctrl.isGeolocationAvailable = false
        $ctrl.$onInit = function () {
            if (GeolocationService.isAvailable) {
                GeolocationService.getCurrentPosition().then(function (value) {
                    $ctrl.isGeolocationAvailable = true
                }).catch (function () {
                    $ctrl.isGeolocationAvailable = false
                })
            } else {
                return false
            }
        }
        

    }
})()