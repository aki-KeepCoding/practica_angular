(function() {
    angular
        .module('whatapop')
        .service('FavoritesService', FavoritesService)

        FavoritesService.$inject = ['$http', '$q', '$log', 'CONF', 'lodash']

        function FavoritesService ($http, $q, $log, CONF, _) {
            var favorites = null
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

            return {
                favorites : favorites,
                toggleFavorite: toggleFavorite,
                setFavorite: setFavorite,
                getFavorite: getFavorite
            }

            function toggleFavorite (productId) {
                var val = getFavorite(productId)
                favorites.setItem(productId + '', !val)
                return !val
            }
            function setFavorite (productId, val) {
                favorites.setItem(productId + '', val)
            }

            function getFavorite (productId) {
                var val = strToBool(favorites.getItem(productId + ''))
                return val
            }

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