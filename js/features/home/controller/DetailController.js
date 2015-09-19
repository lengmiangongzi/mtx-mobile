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
     * Register the ListController class with RequireJS
     */
    define([], function() {

        /**
         * @constructor
         */
        var DetailController = function($scope, events, utils, HomeService, $location, $routeParams, CONF) {
            $scope.popData = {};
            $scope.popData.isShow = false;
            HomeService.getDetailProduct('/m/detailProduct', {
                fundCode: $routeParams.fundCode
            }).success(function(data) {
                $scope.detail = data;
                $scope.beginDate = data.yieldCurve[0].dateString;
                $scope.endDate = data.yieldCurve[data.yieldCurve.length - 1].dateString;
            });

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

        return ['$scope', 'events', 'utils', 'HomeService', '$location', '$routeParams', 'CONF',
            DetailController
        ];

    });

})(define);
