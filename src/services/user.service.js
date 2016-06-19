(function() {
    angular
        .module('whatapop')
        .service('UserService', UserService)

        UserService.$inject = ['$http', '$q', '$log', 'CONF']

        function UserService ($http, $q, $log, CONF) {
            // Interface
            return {
                getAll: getAll,
                get: get
            }
            // Implementation
            function getAll(){
                return $http
                    .get(CONF.API_BASE + CONF.API_ENDPOINT_USERS)
                    .then(function (response) {
                        return $q.when(response.data)
                    })
                    .catch(function (err) {
                        $log.error("Cannot obtain users list from Whatapop. Try again later...", err)
                        return  $q.when([])
                    })
                
            }

            function get (id) {
                if (!id) return $q.when({})
                return $http
                    .get(CONF.API_BASE + CONF.API_ENDPOINT_USERS + id)
                    .then(function (response) {
                        return $q.when(response.data)
                    })
                    .catch(function (err) {
                        $log.error("Cannot obtain category data from Whatapop. Try again later...", err)
                        return $q.when({})
                    })
            }
        }
})();