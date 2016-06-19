(function() {
    angular
        .module('whatapop')
        .component('favoriteSelector', {
            templateUrl: 'src/components/favorite_selector/favorite_selector.tmpl.html',
            controller: FavoriteSelectorComponent
        })

        FavoriteSelectorComponent.$inject = ['$log', 'FavoritesService', 'lodash']

        function FavoriteSelectorComponent($log, FavoritesService, _) {
            var $ctrl = this
             
            $ctrl.favoriteFilter = FavoritesService.favoriteFilter
            
        }
})()