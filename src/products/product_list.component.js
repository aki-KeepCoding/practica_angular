(function() {
    angular
        .module('whatapop')
        .component('productList', {
            templateUrl: 'src/products/product_list.tmpl.html',
            controller: ProductListComponent
        })

        ProductListComponent.$inject = ['$log', 'ProductService']

        function ProductListComponent($log, ProductService) {
            var $ctrl = this

            $ctrl.productFilter = {
                category : {
                    name: ''
                }
            }
            // Interface
            $ctrl.products = []
            $ctrl.loadProducts = loadProducts

            // Init
            $ctrl.$routerOnActivate = function () {
                $ctrl.loadProducts();
            }

            //======IMPL======
            function loadProducts () {
                return ProductService
                    .getAll()
                    .then(function (products) {
                        $ctrl.products = products;
                    }) 
            }
        }
})()