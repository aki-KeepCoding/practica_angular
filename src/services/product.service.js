(function() {
    angular
        .module('whatapop')
        .service('ProductService', ProductService)

        ProductService.$inject = ['$http', '$q', '$log', 'CONF', 'lodash']

        function ProductService ($http, $q, $log, CONF, _) {

            // Guarda el estado del filtro de productos para usarlo en distintos componentes
            var filteredList = {
                items: null
            }
            
            /* ==== INTERFACE ==== */
            return {
                getAll: getAll,
                get: get,
                filteredList: filteredList,
                search: search,
                applyFilter: applyFilter
            }


            /* ==== IMPLEMENTATION ==== */

            // getAll => obtiene la lista completa de productos del BD
            function getAll(){
                return $http
                    .get(CONF.API_BASE + CONF.API_ENDPOINT_PRODUCTS)
                    .then(function (response) {
                        // Almacena la lista de productos en filteredList.items
                        filteredList.items = response.data
                        return $q.when(response.data)
                    })
                    .catch(function (err) {
                        $log.error("Cannot obtain product list from Whatapop. Try again later...", err)
                        return  $q.when([])
                    })
                
            }

            // get(id) => dado un ID recuperamos el producto desde BD
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

            // getFilteredList => Devuelve el objeto filteredList que almacena el estado del filtro de productos
            function getFilteredList () {
                return filteredList
            }

            // search(text) => dado un texto realiza el filtro sobre la lista de productos en filteredList.items
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

            // applyFilter(product, text) => dado un producto y un texto realiza una búsqueda del texto
            //    sobre las propiedades .name y .description del producto
            //    Devuelve true si se cumple alguna de las comparativa
            function applyFilter (product, text) {
                var lowercaseQuery = angular.lowercase(text)
                var lowercaseProductName = angular.lowercase(product.name)
                var lowercaseProductDesc = angular.lowercase(product.description)
                var comp1 = lowercaseProductName.indexOf(lowercaseQuery) >= 0;
                var comp2 = lowercaseProductDesc.indexOf(lowercaseQuery) >= 0
                return  comp1 || comp2
            }
        }
})();