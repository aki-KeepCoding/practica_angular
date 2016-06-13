(function() {
    angular
        .module('whatapop')
        .service('ProductService', ProductService)

        ProductService.$inject = ['$http', '$q', '$log', 'CONF']

        function ProductService ($http, $q, $log, CONF) {
            return {
                getAll: getAll
            }

            function getAll(){
                return $http
                    .get(CONF.API_BASE + CONF.API_ENDPOINT_PRODUCTS)
                    .then(function (response) {
                        return $q.when(response.data)
                    })
                    .catch(function (err) {
                        $log.error("Cannot obtain product list from remote server. Try again later...")
                        return  $q.when([])
                    })
                
            }
        }
})();