(function() {
    angular
        .module('whatapop')
        .component('productList', {
            templateUrl: 'src/products/product_list.tmpl.html',
            controller: ProductListComponent
        })

        ProductListComponent.$inject = ['$log', 
                                        '$sanitize', 
                                        '$mdMedia',
                                        'ProductService', 
                                        'CategoryService', 
                                        'UserService', 
                                        'FavoritesService', 
                                        'DistanceService', 
                                        'GeolocationService', 
                                        'lodash']

        function ProductListComponent($log, 
                                    $sanitize, 
                                    $mdMedia, 
                                    ProductService, 
                                    CategoryService, 
                                    UserService, 
                                    FavoritesService, 
                                    DistanceService, 
                                    GeolocationService, _) {
            var $ctrl = this


            $ctrl.$onInit = function() {
                
                // Lista de Productos Filtrados (se 'almacena' en ProductService)
                $ctrl.filteredList = ProductService.filteredList
                
                // Lista de Categorías Seleccionadas (se 'almacena' en CategoryService)
                $ctrl.selectedCategories = CategoryService.filteredList
                
                // Obtenemos los datos de los usuarios
                UserService.getAll().then(function(users) {
                    $ctrl.users = users
                })
                
                // Obtenermos la geolocalización del usuario (si se puede)
                GeolocationService.getCurrentPosition().then( function (position) {
                    console.log("c")
                    $ctrl.location = {
                        "latitude" : position.latitude,
                        "longitude" : position.longitude
                    }                    
                })

                // Obtenemos la distancia 'almacenada' en DistanceService
                $ctrl.distance = DistanceService.distance
            };
            

            /* INTERFACE */
            // Gestión de interfaz
            // customLgLayout => Para ajustar mejor el grid Material a 4 columnas en tamaños de pantalla >=1750px 
            $ctrl.customLgLayout = customLgLayout

            // Gestion de favoritos
            // toggleFav => gestiona el click sobre el botón favorito
            // isFavorite => comprueba si un 
            $ctrl.toggleFav = toggleFav
            $ctrl.isFavorite = isFavorite

            function customLgLayout () {
                // Ajuste fino para tamaños de pantalla LG
                // $mdMedia => helper de angular-material para cálculos de tamaños de pantalla
                if ($mdMedia('(min-width: 1750px)')) {
                    // 4 columnas para tamaños de pantalla >=1750
                    return 4
                } else {
                    // Para LG menor que 1750 seguimos con 3 columnas en el grid
                    return 3
                }
            }

            function toggleFav (product) {    
                product.favorite = FavoritesService.toggleFavorite(product.id)
            }
            
            function isFavorite (product) {
                if (typeof(product.favorite) === 'undefined') {
                    product.favorite = FavoritesService.getFavorite(product.id)
                }
                return product
                
                
            }

        }
})()