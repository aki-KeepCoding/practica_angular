(function() {
    angular
        .module('whatapop')
        .filter('categoryFilter', categoryFilter)

        categoryFilter.$inject = ['$filter', 'lodash']

        function categoryFilter ($filter, _) {
            // retornamos la función _.filter de Lodash
            return function (products, categories) {
                var selectedCategories = _.filter(categories.items, {selected: true})
                return _.filter(products, function (product) {
                    return _.find(selectedCategories, product.category)
                })
            }
        }
})();