(function() {
    angular
        .module('whatapop')
        .value('CONF', {
            "API_BASE" : "http://localhost:8000/api/",
            "API_ENDPOINT_PRODUCTS": "products/"
        })
    
})();