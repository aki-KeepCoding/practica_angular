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

            /* ==== IMPLEMENTATION ==== */
            // getAll => obtiene todas las categorías. Se almacenan en filteredList.items
            function getAll(){
                return $http
                    .get(CONF.API_BASE + CONF.API_ENDPOINT_CATEGORIES)
                    .then(function (response) {
                        filteredList.items = response.data
                        // usamos $q.when para devolver una promesa
                        return $q.when(response.data)
                    })
                    .catch(function (err) {
                        $log.error("Cannot obtain category list from Whatapop. Try again later...", err)
                        return  $q.when([])
                    })
                
            }

            // get (id) => dada una id obtiene una categoría desde la BD
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

            // addSelectedCategory (category) => dada una categoría activa una propiedad selected (= true)
            function addSelectedCategory (category) {
                var cat = _.find(filteredList.items, category)
                cat.selected = true
            }

            // removeSelectedCategory (category) => dada una categoría desactiva su propiedad selected (= false)
            function removeSelectedCategory (category) {
                var cat = _.find(filteredList.items, category)
                cat.selected = false
            }

            // getSelectedCategories => devuelve la lista de categorías que tienen selected = true
            function getSelectedCategories () {
                var filtered = _.filter(filteredList.items, {selected: true})
                return filtered
            }


        }
})();