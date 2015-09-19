/**
 *  SSOConfig set authorised configuration.
 *
 *  @author  jiang.liu
 *  @date    Jul 2, 2015
 *
 */
(function(define) {
    'use strict';

    define(['ConfiguratorBase'], function(Base) {

        var Configurator = Base.extend(function() {

            this.constructor = function(features, app) {
                this.super(features, app);
            };

            this.run = function() {
                this.app.config(['$httpProvider', function($httpProvider) {
                    $httpProvider.defaults.headers.common.Accept = 'application/json;charset=utf-8';
                    $httpProvider.defaults.withCredentials = true;
                }]);
            };
        });

        return Configurator;

    });

}(define));
