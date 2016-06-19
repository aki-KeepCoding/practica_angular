(function() {
    angular
        .module('whatapop')
        .service('FavoritesService', FavoritesService)

        FavoritesService.$inject = []

        function FavoritesService () {
            var favorites = null // objeto localstorage

            // favoriteFilter almacena el estado del filtro de favoritos
            var favoriteFilter = {
                enabled : false
            }

            // Se comprueba si tenemos disponible localstorage
            //   Si no hay se ofrece una alternativa que lo simula durante una sesión
            //   (cuando se cierra el navegador se volatiliza...)
            if (typeof(Storage) !== "undefined") {
                favorites = localStorage
            } else {
                //Mock de localStorage...sólo funcionará durante la sesión...
                $log.info("El navegador no soporta locl storage. No se podremos memorizar tus favoritos")
                favorites = {
                    setItem : function (key, value) {
                        ls[key] = value
                    },
                    getItem : function (key) {
                        return ls[key]
                    }
                }

            }

            /* ==== INTERFACE ==== */
            return {
                favorites : favorites,
                favoriteFilter: favoriteFilter,
                toggleFavorite: toggleFavorite,
                setFavorite: setFavorite,
                getFavorite: getFavorite
            }

            // toggleFavorite = guardamos si producto.id = favorito (valor = !valor) siendo valor true o false
            function toggleFavorite (productId) {
                var val = getFavorite(productId)
                favorites.setItem(productId + '', !val)
                return !val
            }

            // setFAvorite => guardamos el favorito sobre producto.id = favorito (val)
            function setFavorite (productId, val) {
                favorites.setItem(productId + '', val)
            }

            // getFavorite => devuelve si un producto.id es favorito
            function getFavorite (productId) {
                var val = strToBool(favorites.getItem(productId + ''))
                return val
            }

            // Como en localstorage se almacena el valor true y false como string es necesario 
            //  reinterpretarlos como boolean
            function strToBool(val) {
                 if (val === "true") {
                    val = true
                } else if (val === "false") {
                    val = false
                } else {
                    val = false
                }
                return val
            }
        }
})();