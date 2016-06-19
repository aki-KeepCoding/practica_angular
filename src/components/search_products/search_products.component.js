(function() {
    angular
        .module('whatapop')
        .component('searchProduct', {
            templateUrl: 'src/components/search_products/search_products.tmpl.html',
            controller: SearchProductsComponent
        })

        // ProductService
        SearchProductsComponent.$inject = ['$log', 'ProductService']

        function SearchProductsComponent($log, ProductService) {
            var $ctrl = this
            // Lista de productos para sugerencias del autocompletador
            $ctrl.products = loadAllProducts()
            
            /* ==== INTERFACE ==== */
            $ctrl.querySearch = querySearch
            $ctrl.searchOnKeyUp = searchOnKeyUp
            $ctrl.selectedItemChange = selectedItemChange
            $ctrl.searchTextChange   = searchTextChange
            $ctrl.searchBD = searchBD
            $ctrl.searchText = ""


            /* ==== IMPLEMENTATION ==== */
            // Buscador de sugerencias
            function querySearch (query) {
                if (query) {
                    var res = $ctrl.products.filter( function (product) {
                        return ProductService.applyFilter(product, query)
                    })
                    return res
                } else {
                    return []
                }
            }
            //Busca sugerencias cuando cambia el texto (ver template y md-search-text-change)
            function searchTextChange(text) {
               $ctrl.searchText = text
               if ($ctrl.searchText === "" ) {
                    loadAllProducts()
                    querySearch("")
               }
            }
            // Si seleccionamos un elemento sugerido llamamos a buscar en BD 
            function selectedItemChange() {
                searchBD()
            }

            // Cargamos todos los productos (para las sugerencias del autocompletador)
            function loadAllProducts() {
              return ProductService
                    .getAll()
                    .then(function (products) {
                        $ctrl.products = products
                    }) 
            }

            // Buscar en BD
            function searchBD () {
                ProductService.search($ctrl.searchText)
            }

            // Buscar en BD cuando se pulsa Enter
            function searchOnKeyUp ($event) {
                if ($event.keyCode === 13){
                    searchBD()
                }
            }
        }
})()