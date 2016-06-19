(function() {
    angular
        .module('whatapop')
        .component('productDetail', {

            templateUrl: 'src/components/products/product_detail.tmpl.html',
            bindings: { $router: '<' },
            controller: ProductDetailComponent
        })

        ProductDetailComponent.$inject = ['CONF', '$log', '$sanitize','ProductService', 'UserService']

        function ProductDetailComponent(CONF, $log, $sanitize,ProductService, UserService) {
            var $ctrl = this

           
            // Interface
            $ctrl.serverBase = CONF.API_SERVER_BASE
            $ctrl.product = {}
            $ctrl.user = {}
            $ctrl.staticMapUrl = "#"
            $ctrl.loadProduct = loadProduct
            $ctrl.gotoProducts = gotoProducts

            // Init

            this.$routerOnActivate = function (next) {
                // El id que nos han pasado desde la lista de productos está en next.params.id
                return loadProduct(next.params.id)
            }

           
            //======IMPL======
            function loadProduct (id) {
                // 1. Cargo el producto
                // 2. obtengo la url del mapa estático de google para la imagen de localización
                return ProductService
                    .get(id)
                    .then(function (product) {
                        $ctrl.product = product
                        UserService
                            .get($ctrl.product.seller.id)
                            .then(function (user) {
                                // Necesito el user para obtener lon lat
                                $ctrl.user = user

                                // Conformamos la url de petición de imagen estática a Gooble StaticMaps API
                                // ToDo => pasar esta lógica a un servicio o una directiva
                                $ctrl.staticMapUrl = CONF.GOOGLE_MAPS_BASE +
                                    "center=" + user.latitude + "," + user.longitude + "&" +
                                    "zoom=13&" +
                                    "markers=color:red|" + user.latitude + "," + user.longitude + "&" +
                                    "size=200x200&" +
                                    "key=" + CONF.GOOGLE_MAPS_KEY
                            })
                    })
            }
            // Funcionalidad para el botón de "vuelta atrás"
            function gotoProducts () {
                this.$router.navigate(['ProductList'])
            }
        }
})()