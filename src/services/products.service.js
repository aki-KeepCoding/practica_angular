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
                getFilteredList: getFilteredList,
                search: search
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

            function search (criteria) {
                return 
                    getAll()
                    .then(function (products) {
                        filteredList.items = products
                        return $q.when(_.filter(products, criteria))
                    })
                    .catch(function (err) {
                        $log.error("Cannot obtain product data from Whatapop. Try again later...", err)
                        return $q.when([])
                    })
                
            }
        }
})();