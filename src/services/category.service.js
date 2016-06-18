(function() {
    angular
        .module('whatapop')
        .service('CategoryService', CategoryService)

        CategoryService.$inject = ['$http', '$q', '$log', 'CONF', 'lodash']

        function CategoryService ($http, $q, $log, CONF, _) {
            var filteredList = {
                items: null
            }
            
            // Interface
            return {
                getAll: getAll,
                get: get,
                addSelectedCategory: addSelectedCategory,
                removeSelectedCategory: removeSelectedCategory,
                filteredList: filteredList
                
            }




            // Implementation
            function getAll(){
                return $http
                    .get(CONF.API_BASE + CONF.API_ENDPOINT_CATEGORIES)
                    .then(function (response) {
                        filteredList.items = response.data
                        return $q.when(response.data)
                    })
                    .catch(function (err) {
                        $log.error("Cannot obtain category list from Whatapop. Try again later...", err)
                        return  $q.when([])
                    })
                
            }

            function get (id) {
                if (!id) return $q.when({})
                return $http
                    .get(CONF.API_BASE + CONF.API_ENDPOINT_CATEGORIES + id)
                    .then(function (response) {
                        return $q.when(response.data)
                    })
                    .catch(function (err) {
                        $log.error("Cannot obtain category data from Whatapop. Try again later...", err)
                        return $q.when({})
                    })

            }

            function addSelectedCategory (category) {
                var cat = _.find(filteredList.items, category)
                cat.selected = true
            }

            function removeSelectedCategory (category) {
                var cat = _.find(filteredList.items, category)
                cat.selected = false
            }

            function getSelectedCategories () {
                var filtered = _.filter(filteredList.items, {selected: true})
                return filtered
            }


        }
})();