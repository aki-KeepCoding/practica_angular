(function() {
    angular
        .module('whatapop')
        .component('productList', {
            templateUrl: 'src/products/product_list.tmpl.html',
            controller: ProductListComponent
        })

        ProductListComponent.$inject = ['$log', '$sanitize','ProductService']

        function ProductListComponent($log, $sanitize, ProductService) {
            var $ctrl = this

            $ctrl.productFilter = {
                category : {
                    name: ''
                }
            }
            // Interface
            $ctrl.filteredList = ProductService.filteredList
            // $ctrl.loadProducts = loadProducts

            // Init
            $ctrl.$routerOnActivate = function () {
                // $ctrl.loadProducts();
            }

            $ctrl.sanitize = function (text) {
                return $sanitize(text)

            }
            //======IMPL======
            // function loadProducts () {
            //     return ProductService
            //         .getAll()
            //         .then(function (products) {
            //             $ctrl.products = products;
            //         }) 
            // }
        }
})()