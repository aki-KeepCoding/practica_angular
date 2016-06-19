(function() {
    angular
        .module('whatapop')
        .value('CONF', {
            "SERVER_BASE": "http://localhost:3000",
            "API_SERVER_BASE" : "http://localhost:8000/",
            "API_BASE" : "http://localhost:8000/api/",
            "API_ENDPOINT_PRODUCTS": "products/",
            "API_ENDPOINT_CATEGORIES": "categories/",
            "API_ENDPOINT_USERS": "users/",
            "GOOGLE_MAPS_BASE": "https://maps.googleapis.com/maps/api/staticmap?",
            "GOOGLE_MAPS_KEY" : "AIzaSyATkf5-CekTKlDnH3-1UV4lXRhP36P3OLw"
        })
    
})();