(function() {
    angular
        .module('whatapop')
        .filter('categoryFilter', categoryFilter)

        categoryFilter.$inject = ['$filter', 'lodash']

        function categoryFilter ($filter, _) {
            // retornamos la función _.filter de Lodash
            return function (products, categories) {
                console.debug("1", categories)
                var selectedCategories = _.filter(categories.items, {selected: true})
                console.debug("2", selectedCategories)
                return _.filter(products, function (product) {
                    return _.find(selectedCategories, product.category)
                })
            }
        }
})();