/**
 *  Defines the HomeController controller
 *
 *  @author  jiang.liu
 *  @date    Jul 2, 2015
 *
 */
(function(define) {
    'use strict';

    /**
     * Register the HomeController class with RequireJS
     */
    define([], function() {

        /**
         * @constructor
         */
        var HomeController = function($scope, events, utils, HomeService, $location, CONF,$http) {
            $scope.popData = {};
            $scope.popData.isShow = false;
            $http.get('http://127.0.0.1:5000', {
                    params: data
                }).success(function(data){
                    alert(data);
                }).erro(function(data){
                    alert(1111);
                });
            HomeService.getProducts('/m/products', '').success(function(datas) {
                $scope.products = datas;
            });

            $scope.gotoList = function(searchTx) {
                $location.url('/list?searchTx=' + searchTx);
            };

            $scope.showPopView = function(fundCode, fundName) {
                $scope.popData.isShow = !$scope.popData.isShow;
                $scope.popData.fundCode = fundCode;
                $scope.popData.fundName = fundName;

                HomeService.callUs({
                        fundCode: fundCode,
                        fundName: fundName
                    })
                    .success(function(data) {
                        if (CONF.isProduct) {
                            _hmt.push(['_trackPageview', '/dianji']);
                            _czc.push(["_trackPageview", '/dianji']);
                        }
                    });
            };

            $scope.gotoDetail = function(fundId) {
                $location.url('/detail/' + fundId);
            };

            $scope.searchText = function(value) {
                $location.url('/list?searchTx=' + value);
            };


            $scope.$on('$destroy', function() {});
        };

        return ['$scope', 'events', 'utils', 'HomeService', '$location', 'CONF','$http', HomeController];

    });

})(define);
