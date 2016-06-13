(function() {
    angular
        .module('whatapop')
        .component('productDetail', {
            templateUrl: 'src/products/product_detail.tmpl.html',
            controller: ProductDetailComponent
        })

        ProductDetailComponent.$inject = ['$log', 'ProductService']

        function ProductDetailComponent($log, ProductService) {
            var $ctrl = this

           
            // Interface
            $ctrl.product = {}
            $ctrl.loadProduct = loadProduct

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
        }
})()