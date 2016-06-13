(function() {
    angular
        .module('whatapop')
        .component('products', {
            $routeConfig: [
                {
                    path: '/',
                    name: 'ProductList',
                    component: 'productList',
                    useAsDefault: true
                },
                {
                    path: '/:id',
                    name: 'ProductDetail',
                    component: 'productDetail'
                }
            ],
            template: '<h2>Products</h2><ng-outlet></ng-outlet>'
        })
})()