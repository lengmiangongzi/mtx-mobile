/**
/**
 *  Defines the ListService
 *
 *  @author  jiang.liu
 *  @date    Jul 2, 2015
 *
 */
(function(define) {
    'use strict';

    /**
     * Register the HomeService class with RequireJS
     */
    define([], function() {

        /**
         * @constructor
         */
        var ListService = function($http, utils) {

            this.getProducts = function(data) {
                return $http.get(utils.getapi('/list'), {
                    params: data
                });
            };


        };

        return ['$http', 'utils', ListService];

    });

})(define);
