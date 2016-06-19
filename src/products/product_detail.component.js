(function() {
    angular
        .module('whatapop')
        .component('productDetail', {
            
            templateUrl: 'src/products/product_detail.tmpl.html',
            bindings: { $router: '<' },
            controller: ProductDetailComponent
        })

        ProductDetailComponent.$inject = ['CONF', '$log', '$sanitize','ProductService', 'UserService']

        function ProductDetailComponent(CONF, $log, $sanitize,ProductService, UserService) {
            var $ctrl = this

           
            // Interface
            $ctrl.product = {}
            $ctrl.user = {}
            $ctrl.staticMapUrl = "#"
            $ctrl.loadProduct = loadProduct
            $ctrl.gotoProducts = gotoProducts;

            // Init

            this.$routerOnActivate = function (next, previous) {
                return loadProduct(next.params.id)
            }

           
            //======IMPL======
            function loadProduct (id) {
                return ProductService
                    .get(id)
                    .then(function (product) {
                        $ctrl.product = product

                        UserService
                            .get($ctrl.product.seller.id)
                            .then(function (user) {
                                $ctrl.user = user
                                $ctrl.staticMapUrl = CONF.GOOGLE_MAPS_BASE +
                                    "center=" + user.latitude + "," + user.longitude + "&" +
                                    "zoom=13&" +
                                    "markers=color:red|" + user.latitude + "," + user.longitude + "&" +
                                    "size=200x200&" +
                                    "key=" + CONF.GOOGLE_MAPS_KEY;
                            })
                    })
            }
            function gotoProducts () {
                this.$router.navigate(['ProductList'])
            }
        }
})()