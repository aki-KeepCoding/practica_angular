(function() {
    angular
        .module('whatapop')
        .component('app', {
            $routeConfig: [
                {
                    /* RUTA /PRODUCTS */
                    name: 'Products',
                    path: '/products/...',
                    component: 'products',
                    useAsDefault: true /* Por defecto se carga esta ruta */
                }
            ],
            controller: AppController,
            templateUrl : 'src/components/app/app.tmpl.html'
        })

    /* Injección de dependencias */
    // GeolocationService => se usa para Saber si tenemos que cargar 
    //   el filtro de distancia en el menú de la izquierda
    AppController.$inject = ['GeolocationService']

    function AppController (GeolocationService) {
        $ctrl = this

        // Variables
        $ctrl.isGeolocationAvailable = false

        // Inicializar
        $ctrl.$onInit = function () {
            if (GeolocationService.isAvailable) {
                // Si la geolocalización está disponible 
                $ctrl.isGeolocationAvailable = true
            } else {
                $ctrl.isGeolocationAvailable = false
            }
        }
        

    }
})()