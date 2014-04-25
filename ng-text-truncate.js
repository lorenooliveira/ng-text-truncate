'use strict';

angular.module( 'ngTextTruncate', [] )



.directive( "csTextTruncate", function( $compile ) {
    return {
        restrict: "A",
        scope: {
            text: "=csTruncate",
            threshold: "@csTruncateThreshold"
        },
        controller: function( $scope, $element, $attrs ) {
            $scope.toggleShow = function() {
                $scope.open = !$scope.open;
            };
        },
        link: function( $scope, $element, $attrs ) {
            $scope.open = false;

            var THRESHOLD = parseInt( $scope.threshold );

            if( $scope.text && $scope.text.length > THRESHOLD ) {
                var el = angular.element(    "<span>" + 
                                                $scope.text.substr( 0, THRESHOLD ) + 
                                                "<span ng-show='!open'>...</span>" +
                                                "<span class='btn-link csTruncateToggleText' " +
                                                    "ng-click='toggleShow()'" +
                                                    "ng-show='!open'>" +
                                                    " More" +
                                                "</span>" +
                                                "<span ng-show='open'>" + 
                                                    $scope.text.substring( THRESHOLD ) + 
                                                    "<span class='btn-link csTruncateToggleText'" +
                                                          "ng-click='toggleShow()'>" +
                                                        " Less" +
                                                    "</span>" +
                                                "</span>" +
                                            "</span>" );
                $compile( el )( $scope );
                $element.append( el );

            } else {
                $element.append( $scope.text );

            }
        }
    };
} );
