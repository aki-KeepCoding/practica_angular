(function() {
    angular
        .module('whatapop')
        .component('categorySelector', {
            templateUrl: 'src/components/category_selector/category_selector.tmpl.html',
            controller: CategorySelectorComponent
        })

        CategorySelectorComponent.$inject = ['$log', 'CategoryService', 'lodash']

        function CategorySelectorComponent($log, CategoryService, _) {
            var $ctrl = this
             
            $ctrl.categories = {
                items : []
            }
            // Interface
            $ctrl.loadCategories = loadCategories
            $ctrl.categoryFilterChanged = categoryFilterChanged
            // Init
            $ctrl.loadCategories();

            //======IMPL======
            function loadCategories () {
                return CategoryService
                    .getAll()
                    .then(function (categories) {
                        $ctrl.categories.items = categories;
                        _.forEach($ctrl.categories.items, function (item) {
                            item.selected = true
                        })
                    }) 
            }

            function categoryFilterChanged (category) {
                category.selected = !category.selected
            }
        }
})()