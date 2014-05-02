'use strict';

angular.module( 'ngTextTruncate', [] )



.directive( "ngTextTruncate", function( $compile, ValidationServices, CharBasedTruncation, WordBasedTruncation ) {
    return {
        restrict: "A",
        scope: {
            text: "=ngTextTruncate",
            charsThreshould: "@ngTtCharsThreshold",
            wordsThreshould: "@ngTtWordsThreshold"
        },
        controller: function( $scope, $element, $attrs ) {
            $scope.toggleShow = function() {
                $scope.open = !$scope.open;
            };
        },
        link: function( $scope, $element, $attrs ) {
            $scope.open = false;

            ValidationServices.failIfWrongThreshouldConfig( $scope.charsThreshould, $scope.wordsThreshould );
            
            var CHARS_THRESHOLD = parseInt( $scope.charsThreshould );
            var WORDS_THRESHOLD = parseInt( $scope.wordsThreshould );
            
            if( CHARS_THRESHOLD ) {
                console.log( "Truncando pelo numero de caracteres" );
                if( $scope.text && CharBasedTruncation.truncationApplies( $scope.text, CHARS_THRESHOLD ) ) {
                    CharBasedTruncation.applyTruncation( $scope.text, CHARS_THRESHOLD, $scope, $element );
                    
                } else {
                    $element.append( $scope.text );
                }
                
            } else {
                console.log( "Truncando pelo numero de palavras" );
                if( $scope.text && WordBasedTruncation.truncationApplies( $scope.text, WORDS_THRESHOLD ) ) {
                    WordBasedTruncation.applyTruncation( $scope.text, WORDS_THRESHOLD, $scope, $element );
                    
                } else {
                    $element.append( $scope.text );
                }
                
            }
        }
    };
} )



.factory( "ValidationServices", function() {
    return {
        failIfWrongThreshouldConfig: function( firstThreshould, secondThreshould ) {
            if( (! firstThreshould && ! secondThreshould) || (firstThreshould && secondThreshould) ) {
                throw "You must specify one, and only one, type of threshould (chars or words)";
            }
        }
    }
})



.factory( "CharBasedTruncation", function( $compile ) {
    return {
        truncationApplies: function( originalText, threshould ) {
            return originalText.length > threshould;
        },
        
        applyTruncation: function( originalText, threshould, $scope, $element ) {
            var el = angular.element(    "<span>" + 
                                            originalText.substr( 0, threshould ) + 
                                            "<span ng-show='!open'>...</span>" +
                                            "<span class='btn-link csTruncateToggleText' " +
                                                "ng-click='toggleShow()'" +
                                                "ng-show='!open'>" +
                                                " More" +
                                            "</span>" +
                                            "<span ng-show='open'>" + 
                                                originalText.substring( threshould ) + 
                                                "<span class='btn-link csTruncateToggleText'" +
                                                      "ng-click='toggleShow()'>" +
                                                    " Less" +
                                                "</span>" +
                                            "</span>" +
                                        "</span>" );
            $compile( el )( $scope );
            $element.append( el );
        }
    }
})



.factory( "WordBasedTruncation", function( $compile ) {
    return {
        truncationApplies: function( originalText, threshould ) {
            return originalText.split( " " ).length > threshould;
        },
        
        applyTruncation: function( originalText, threshould, $scope, $element ) {
            var splitText = originalText.split( " " );
            var el = angular.element(    "<span>" + 
                                            splitText.slice( 0, threshould ).join( " " ) + " " + 
                                            "<span ng-show='!open'>...</span>" +
                                            "<span class='btn-link csTruncateToggleText' " +
                                                "ng-click='toggleShow()'" +
                                                "ng-show='!open'>" +
                                                " More" +
                                            "</span>" +
                                            "<span ng-show='open'>" + 
                                                splitText.slice( threshould, splitText.length ).join( " " ) + 
                                                "<span class='btn-link csTruncateToggleText'" +
                                                      "ng-click='toggleShow()'>" +
                                                    " Less" +
                                                "</span>" +
                                            "</span>" +
                                        "</span>" );
            $compile( el )( $scope );
            $element.append( el );
        }
    }
});
