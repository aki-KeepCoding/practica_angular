(function() {
    angular
        .module('whatapop')
        .component('products', {
            templateUrl: 'src/products/products.tmpl.html',
            controller: products
        })

        products.$inject = ['$log', 'ProductService']

        function products ($log, ProductService) {
            var $ctrl = this

            // Interface
            $ctrl.products = []
            $ctrl.loadProducts = loadProducts

            // Init
            $ctrl.$onInit = function () {
                $ctrl.loadProducts();
            }

            //======IMPL======
            function loadProducts () {
                ProductService
                    .getAll()
                    .then(function (products) {
                        $ctrl.products = products;
                    }) 
            }
        }
})()