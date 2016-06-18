(function() {
    angular
        .module('whatapop')
        .component('app', {
            $routeConfig: [
                {
                    name: 'Products',
                    path: '/products/...',
                    component: 'products'
                }
            ],
            controller: appCtrl,
            templateUrl : 'src/app/app.tmpl.html'
        })
        appCtrl.$inject = ['$scope', '$q', '$log', 'CategoryService', 'lodash']
        
        function appCtrl ($scope, $q, $log, CategoryService, _) {
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
                // return (category)
                // if (CategoryService.isCategorySelected(category)) {
                //     CategoryService.removeSelectedCategory(category)
                    
                // } else {
                //     CategoryService.addSelectedCategory(category)
                // }
            }

            // function categoryState (category) {
            //     return CategoryService.isCategorySelected(category)
            // }
        }
})()