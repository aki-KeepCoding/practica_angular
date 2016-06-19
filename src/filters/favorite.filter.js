(function() {
    angular
        .module('whatapop')
        .filter('favoriteFilter', favoriteFilter)

        favoriteFilter.$inject = ['$filter', 'lodash']

        function favoriteFilter ($filter, _) {
            // retornamos la función _.filter de Lodash
            return function (products, favoriteFilter) {
                if (favoriteFilter.enabled) {
                    return _.filter(products, {favorite : true})
                } else {
                    return products
                }
            }
        }
})();