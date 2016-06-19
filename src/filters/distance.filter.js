(function() {
    angular
        .module('whatapop')
        .filter('distanceFilter', distanceFilter)

        distanceFilter.$inject = ['$filter', '$haversine', 'lodash']

        function distanceFilter ($filter,  $haversine, _) {
            // retornamos la función _.filter de Lodash
            return function (products, users, location, distance) {
                if (!distance.enabled) return products
                console.log("1", users, location, distance)
                return _.filter(products, function(product) {

                    user = _.find(users, product.seller)
                    console.log("2", user)
                    productLocation = {
                        "latitude": user.latitude,
                        "longitude": user.longitude
                    }
                    productDistance = $haversine.distance(location, productLocation)
                    console.log("3", productDistance)
                    $ctrl.isGeolocationAvailable = true
                    if (productDistance <= distance.km * 1000) {
                        return true
                    } else {
                        return false
                    }
                })
            }
        }
})()