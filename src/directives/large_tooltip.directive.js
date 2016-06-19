// Directiva para mostrar un tooltip

(function() {
    angular
        .module("whatapop")
        .directive("largeTooltip", largeTooltip)

        largeTooltip.$inject = ['$sanitize', '$timeout']
        
        function largeTooltip ($sanitize, $timeout) {
            return {
                restrict: 'EA',
                templateUrl: "src/directives/large_tooltip.tmpl.html",
                scope: {
                    text: "@",
                    delay: "@"

                },
                //  * text = El texto que se desea mostrar
                //  * delay = el tiempo que deseamos retrasar la muestra del tooltip (por defecto 1000)
                link: function (scope, element) {
                    // El tooltip se muestra cuando el ratón está sobre el elemento padre del tooltip
                    var parentElement = element.parent()
                    // El child element es el div que vamos a mostrar/ocultar
                    var childElement = element.children()

                    // Si no nos han pasado un delay aplicamos 1000 ms
                    if (!scope.delay) scope.delay = 1000
                    
                    var promise = null
                    parentElement.on('mouseover', function () {
                        // realicamos un delay (tenemos que estar sobre el elemento padr durante el delay)
                        //   para mostrar el tooltip
                        // Guardamos la promesa para saber posteriormente si había un $timoeut en marcha 
                        //   y así poder cancelarlo
                        promise = $timeout(function () {
                            childElement.removeClass('ng-hide').addClass('ng-shoe')
                        }, scope.delay)
                    })
                    parentElement.on('mouseout', function () {
                        // Si hay una $timeout en marcha, lo cancelamos con $timeout.cancel
                        if (promise) $timeout.cancel(promise)
                        // Ocultamos de nuevo el tooltip
                        childElement.removeClass('ng-show').addClass('ng-hide')
                    })
                }
            }
        }
})();