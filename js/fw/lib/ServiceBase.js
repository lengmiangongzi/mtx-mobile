/**
 *  ServiceBase class
 *
 *
 *  @author  jiang.liu
 *  @date    Jul 2, 2015
 *
 */
(function(define) {
    'use strict';

    define(['extend'], function() {

        var ServiceBase = Class.extend(function() {

            this.constructor = function(features, app) {
                this.features = features;
                this.app = app;
            };

            this.run = function() {};
        });

        return ServiceBase;

    });

}(define));
