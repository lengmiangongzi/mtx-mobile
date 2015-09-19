/**
 *
 *  The stRatio.
 *
 *  @author  jiang.liu
 *  @date    Jul 2, 2015
 *
 **/
(function(define) {
    'use strict';

    define(['FeatureBase'], function(Base) {

        var Feature = Base.extend(function() {

            this.initializer = function() {
                this.super.initializer('StRatioModule');
            };

            this.run = function() {
                var dir = function() {
                    return {
                        restrict: 'A',
                        link: function($scope, element, attr) {
                            var ratio = +(attr.stRatio);
                            element.css('width', ratio + '%');
                        }
                    };
                };

                this.mod.directive('stRatio', [dir]);
            };

        });

        return Feature;

    });


})(define);