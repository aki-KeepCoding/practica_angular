(function() {
    angular
        .module('whatapop')
        .component('searchProduct', {
            templateUrl: 'src/search/search.tmpl.html',
            controller: SearchProductsComponent
        })

        SearchProductsComponent.$inject = ['$log', 'ProductService']

        function SearchProductsComponent($log, ProductService) {
            var $ctrl = this

           
            // Interface
            $ctrl.categories = {}
            
            // Init

            this.$routerOnActivate = function (next, previous) {
                
            }


            //======IMPL======
            
        }
})()



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
        appCtrl.$inject = ['$timeout', '$q', '$log']
        
        function appCtrl ($timeout, $q, $log) {
            var $ctrl = this;
            // 
            $ctrl.products = loadAllProducts();
            
            // Interface
            $ctrl.querySearch   = querySearch;
            $ctrl.selectedItemChange = selectedItemChange;
            $ctrl.searchTextChange   = searchTextChange;
            
            // Implementation
            function querySearch (query) {
                if (query) {
                    var lowercaseQuery = angular.lowercase(query);
                    return $ctrl.products.filter( function (product) {
                        return 
                            (product.name.indexOf(lowercaseQuery) === 0 ||
                            product.description.indexOf(lowercaseQuery) === 0);
                    })
                }
            }
            function searchTextChange(text) {
              $log.info('Text changed to ' + text);
            }
            function selectedItemChange(item) {
              $log.info('Item changed to ' + JSON.stringify(item));
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
        }
})()