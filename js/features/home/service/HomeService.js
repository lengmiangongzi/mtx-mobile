/**
 *  Defines the HomeService
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
        var HomeService = function($http, utils, $location) {

            this.getProducts = function(inUrl, data) {
                return $http.get(utils.getapi(inUrl), {
                    params: data
                });
            };

            this.getDetailProduct = function(inUrl, data) {
                return $http.get(utils.getapi(inUrl), {
                    params: data
                });
            };

            this.callUs = function(data) {
                return $http.get(utils.getapi('/subscription'), {
                    params: data
                });
            };

            this.callMTX = function(data) {
                return $http.post(utils.getapi('/submit'), data);
            };

            this.getSearchParam = function(key) {
                return $location.search()[key] ? $location.search()[key] : '';
            };

            this.updateSearchParam = function(key, value) {
                $location.search(key, value ? value : undefined);
            };
        };

        return ['$http', 'utils', '$location',
            HomeService
        ];

    });

})(define);
