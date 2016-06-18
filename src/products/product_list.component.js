(function() {
    angular
        .module('whatapop')
        .component('productList', {
            templateUrl: 'src/products/product_list.tmpl.html',
            controller: ProductListComponent
        })

        ProductListComponent.$inject = ['$log', '$sanitize', '$mdMedia','ProductService', 'CategoryService']

        function ProductListComponent($log, $sanitize, $mdMedia, ProductService, CategoryService) {
            var $ctrl = this

            // Interface
            $ctrl.filteredList = ProductService.filteredList
            $ctrl.selectedCategories = CategoryService.filteredList
            $ctrl.customLgLayout = customLgLayout
            
            $ctrl.sanitize = function (text) {
                return $sanitize(text)

            }

           
            function customLgLayout () {
                if ($mdMedia('(min-width: 1750px)')) {
                    return 4
                } else {
                    return 3
                }
                
            }  

        }
})()