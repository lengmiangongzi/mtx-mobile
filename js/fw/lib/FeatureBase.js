/**
 *  FeatureBase class
 *
 *
 *  @author  jiang.liu
 *  @date    Jul 2, 2015
 *
 */
(function(define) {
    'use strict';

    define(['angular', 'extend'], function(angular) {

        var ConfiguratorBase = Class.extend(function() {

            this.initializer = function(name) {
                this.export = name;
                this.mod = angular.module(this.export, []);
            };

            this.constructor = function() {};

            this.beforeStart = function() {};

            this.run = function() {};
        });

        return ConfiguratorBase;

    });

}(define));
