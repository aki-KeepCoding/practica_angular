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
                link: function (scope, element) {
                    var parentElement = element.parent()
                    var childElement = element.children()
                    var promise = null
                    if (!scope.delay) scope.delay = 1000
                    
                    parentElement.on('mouseover', function () {
                        promise = $timeout(function () {
                            childElement.removeClass('ng-hide').addClass('ng-shoe')
                        }, scope.delay)
                    })
                    parentElement.on('mouseout', function () {
                        if (promise) $timeout.cancel(promise)
                        childElement.removeClass('ng-show').addClass('ng-hide')
                    })
                    //scope.show = true
                }
            }
        }
})();