(function() {
    angular
        .module('whatapop')
        .component('searchProduct', {
            templateUrl: 'src/search/search_products.tmpl.html',
            controller: SearchProductsComponent
        })

        SearchProductsComponent.$inject = ['$log', 'ProductService']

        function SearchProductsComponent($log, ProductService) {
            var $ctrl = this
            // 
            $ctrl.products = loadAllProducts()
            
            // Interface
            $ctrl.querySearch   = querySearch
            $ctrl.selectedItemChange = selectedItemChange
            $ctrl.searchTextChange   = searchTextChange
            $ctrl.search = search
            $ctrl.searchText = ""
            // Implementation
            function querySearch (query) {
                if (query) {
                    var res = $ctrl.products.filter( function (product) {
                        return ProductService.applyFilter(product, query)
                    })
                    return $q.when(res)
                }
            }
            function searchTextChange(text) {
               $ctrl.searchText = text
               if ($ctrl.searchText === "" ) {
                    loadAllProducts();
               }
            }
            function selectedItemChange(item) {
              search()
            }
            /**
             * Build `states` list of key/value pairs
             */
            function loadAllProducts() {
              return ProductService
                    .getAll()
                    .then(function (products) {
                        $ctrl.products = products;
                    }) 
            }

            function search () {
                ProductService.search($ctrl.searchText)
            }
        }
})()