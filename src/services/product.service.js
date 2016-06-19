(function() {
    angular
        .module('whatapop')
        .service('ProductService', ProductService)

        ProductService.$inject = ['$http', '$q', '$log', 'CONF', 'lodash']

        function ProductService ($http, $q, $log, CONF, _) {
            var filteredList = {
                items: null
            }
            
            // Interface
            return {
                getAll: getAll,
                get: get,
                filteredList: filteredList,
                search: search,
                applyFilter: applyFilter
            }


            // Implementation
            function getAll(){
                return $http
                    .get(CONF.API_BASE + CONF.API_ENDPOINT_PRODUCTS)
                    .then(function (response) {
                        filteredList.items = response.data
                        return $q.when(response.data)
                    })
                    .catch(function (err) {
                        $log.error("Cannot obtain product list from Whatapop. Try again later...", err)
                        return  $q.when([])
                    })
                
            }

            function get (id) {
                if (!id) return $q.when({})
                return $http
                    .get(CONF.API_BASE + CONF.API_ENDPOINT_PRODUCTS + id)
                    .then(function (response) {
                        return $q.when(response.data)
                    })
                    .catch(function (err) {
                        $log.error("Cannot obtain product data from Whatapop. Try again later...", err)
                        return $q.when({})
                    })

            }

            function getFilteredList () {
                return filteredList
            }

            function search (text) {
                return getAll()
                    .then(function (products) {
                        filteredList.items = _.filter(products, function(product) {

                            var res = applyFilter(product, text)
                            return res
                        })
                        return $q.when(filteredList)
                    })
                    .catch(function (err) {
                        $log.error("Cannot obtain product data from Whatapop. Try again later...", err)
                        return $q.when(filteredList)
                    })
                
            }


            function applyFilter (product, text) {
                var lowercaseQuery = angular.lowercase(text)
                var lowercaseProductName = angular.lowercase(product.name)
                var lowercaseProductDesc = angular.lowercase(product.description)
                var comp1 = lowercaseProductName.indexOf(lowercaseQuery) >= 0;
                var comp2 = lowercaseProductDesc.indexOf(lowercaseQuery) >= 0
                

                var comp2 = lowercaseProductDesc.indexOf(lowercaseQuery) >= 0
                return  comp1 || comp2
            }


            
        }
})();