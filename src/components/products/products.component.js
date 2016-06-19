(function() {
    /*
    El componente de productos contiene la lista de productos 
        y el detalle de producto (productList y productDetail)
    */
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
            // El template contiene la vista dinámica donde se renderizan ProductList y ProductDetail
            template: '<ng-outlet></ng-outlet>'
        })
})()