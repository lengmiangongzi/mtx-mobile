/**
 *
 *  Defines `events` service which helps developer
 *  control EVENT system
 *
 *
 *  @author  jiang.liu
 *  @date    Jul 2, 2015
 *
 */
(function(define) {
    'use strict';

    define(['ServiceBase', 'angular', 'lodash'], function(Base, angular, _) {

        var Service = Base.extend(function() {

            this.constructor = function(features, app) {
                this.super(features, app);
            };

            this.run = function() {
                this.super.run();
                this.app.factory('events', ['$rootScope', function($rootScope) {
                    var factory = {};

                    var listeners = {};

                    factory.emit = function(eventName, data) {
                        if (!eventName) {
                            return;
                        }
                        $rootScope.$broadcast(eventName, data);
                    };

                    factory.on = function(eventName, callback) {
                        if (!listeners[eventName]) {
                            listeners[eventName] = [];
                            $rootScope.$on(eventName, function(event, data) {
                                _.each(listeners[eventName], function(listener) {
                                    listener(data);
                                });
                            });

                        }
                        if (angular.isFunction(callback)) {
                            listeners[eventName].push(callback);
                        }
                    };

                    return factory;
                }]);
            };

        });

        return Service;

    });

}(define));
