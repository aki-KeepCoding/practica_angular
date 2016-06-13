(function() {
    angular
        .module('whatapop')
        .service('ProductService', ProductService)

        ProductService.$inject = ['$http', '$q', '$log', 'CONF']

        function ProductService ($http, $q, $log, CONF) {
            return {
                getAll: getAll,
                get: get
            }

            function getAll(){
                return $http
                    .get(CONF.API_BASE + CONF.API_ENDPOINT_PRODUCTS)
                    .then(function (response) {
                        return $q.when(response.data)
                    })
                    .catch(function (err) {
                        $log.error("Cannot obtain product list from Whatapop. Try again later...")
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
                        $log.error("Cannot obtain product data from Whatapop. Try again later...")
                        return $q.when({})
                    })

            }
        }
})();