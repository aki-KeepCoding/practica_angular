(function() {
    angular
        .module('whatapop')
        .component('productList', {
            templateUrl: 'src/products/product_list.tmpl.html',
            controller: ProductListComponent
        })

        ProductListComponent.$inject = ['$log', '$sanitize', '$mdMedia','ProductService', 'CategoryService', 'FavoritesService', 'lodash']

        function ProductListComponent($log, $sanitize, $mdMedia, ProductService, CategoryService, FavoritesService, _) {
            var $ctrl = this

            // Interface
            $ctrl.filteredList = ProductService.filteredList
            
            $ctrl.selectedCategories = CategoryService.filteredList
            $ctrl.customLgLayout = customLgLayout

            $ctrl.toggleFav = toggleFav
            $ctrl.isFavorite = isFavorite

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