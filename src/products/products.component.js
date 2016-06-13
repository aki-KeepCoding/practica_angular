(function() {
    angular
        .module('whatapop')
        .component('products', {
            templateUrl: 'src/products/products.tmpl.html',
            controller: products
        })

        products.$inject = []

        function products () {

        }
})()