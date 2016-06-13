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
            templateUrl : 'src/app/app.tmpl.html'
        })
})()