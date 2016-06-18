(function() {
    angular
        .module('whatapop')
        .component('productDetail', {
            templateUrl: 'src/products/product_detail.tmpl.html',
            bindings: { $router: '<' },
            controller: ProductDetailComponent
        })

        ProductDetailComponent.$inject = ['$log', '$sanitize','ProductService']

        function ProductDetailComponent($log, $sanitize,ProductService) {
            var $ctrl = this

           
            // Interface
            $ctrl.product = {}
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
                        console.log(product)
                        $ctrl.product = product
                    })
            }
            function gotoProducts () {
                this.$router.navigate(['ProductList'])
            }
        }
})()