// Filtro de favoritos
(function() {
    angular
        .module('whatapop')
        .component('favoriteSelector', {
            templateUrl: 'src/components/favorite_selector/favorite_selector.tmpl.html',
            controller: FavoriteSelectorComponent
        })

        FavoriteSelectorComponent.$inject = ['FavoritesService']

        function FavoriteSelectorComponent(FavoritesService) {
            var $ctrl = this
            
            // Enlazamos el objeto favoriteFilter 
            //  Cuando cambiemos el valor con el switch se actualizarán el resto de 
            //  componentes que usen el mismo objeto FavoriteService.favoriteFilter
            $ctrl.favoriteFilter = FavoritesService.favoriteFilter
            
        }
})()