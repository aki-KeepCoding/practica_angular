(function() {
    angular
        .module('whatapop', [
                'ngComponentRouter'
            ])

    angular
        .module('whatapop')
        .config( function ($locationProvider) {
            $locationProvider.html5Mode(true)
        })

    angular
        .module('whatapop')
        .value('$routerRootComponent', 'app')
})();