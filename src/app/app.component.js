(function() {
    angular
        .module('whatapop')
        .component('app', {
            $routeConfig: [
                {
                    name: 'Products',
                    path: '/products/...',
                    component: 'products'
                }
            ],
            controller: appCtrl,
            templateUrl : 'src/app/app.tmpl.html'
        })
        appCtrl.$inject = ['$timeout', '$q', '$log', 'ProductService']
        
        function appCtrl ($timeout, $q, $log, ProductService) {
            var $ctrl = this
            $ctrl.image = "http://lorempixel.com/400/200/"
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
                        return ProductService.productContainsText(product, query)
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