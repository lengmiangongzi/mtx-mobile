/**
 * ******************************************************************************************************
 *
 *   Defines a home feature
 *
 *  @author  jiang.liu
 *  @date    Jul 2, 2015
 *
 * ******************************************************************************************************
 */
(function(define) {
    'use strict';

    define([
        'FeatureBase',
        './Routes',
        './controller/HomeController',
        './controller/ListController',
        './controller/DetailController',
        './service/HomeService',
        './directive/popView',
        './directive/TrendChart'
    ], function(Base,
        Routes,
        HomeController,
        ListController,
        DetailController,
        HomeService,
        popView,
        TrendChart) {
        var Feature = Base.extend(function() {

            this.initializer = function() {
                this.super.initializer('home');
            };

            this.constructor = function() {
                this.routes = Routes;
            };

            this.run = function() {
                this.mod.controller('HomeController', HomeController);
                this.mod.controller('ListController', ListController);
                this.mod.controller('DetailController', DetailController);
                this.mod.service('HomeService', HomeService);
                this.mod.directive('popView', popView);
                this.mod.directive('trendChart', TrendChart);
            };

        });
        return Feature;

    });

}(define));
