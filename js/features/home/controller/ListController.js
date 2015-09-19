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

    var getPageIndex = function(pageIndex) {
        if (!/^[1-9]\d*$/.test(pageIndex)) {
            return 1;
        }
        return parseInt(pageIndex);
    };

    define(['lodash'], function(_) {

        /**
         * @constructor
         */
        var ListController = function($scope, events, utils, HomeService, $alert, $location, CONF) {


            $scope.STRATEGYS = [{
                value: '不限',
                key: '0'
            }, {
                value: '股票策略',
                key: '1'
            }, {
                value: '宏观策略',
                key: '2'
            }, {
                value: '期货策略',
                key: '3'
            }, {
                value: '事件驱动',
                key: '4'
            }, {
                value: '相对价值',
                key: '5'
            }, {
                value: '债券策略',
                key: '6'
            }, {
                value: '组合基金',
                key: '7'
            }, {
                value: '复合策略',
                key: '8'
            }];
            $scope.NETVALUES = [{
                value: '不限',
                key: '0'
            }, {
                value: '10%-30%',
                key: '1'
            }, {
                value: '30%-50%',
                key: '2'
            }, {
                value: '50%-100%',
                key: '3'
            }, {
                value: '100%以上',
                key: '4'
            }];
            $scope.FUNDCREATETIMES = [{
                value: '不限',
                key: '0'
            }, {
                value: '今年',
                key: '1'
            }, {
                value: '2014年',
                key: '2'
            }, {
                value: '2013年',
                key: '3'
            }, {
                value: '2012年',
                key: '4'
            }, {
                value: '2012年之前',
                key: '5'
            }];
            $scope.showWrong = false;
            $scope.subSuccess = false;

            $scope.popData = {};
            $scope.popData.isShow = false;
            $scope.searchInfo = {};
            $scope.searchInfo.strategy = HomeService.getSearchParam('strategy');
            $scope.searchInfo.netValue = HomeService.getSearchParam('netValue');
            $scope.searchInfo.searchTx = HomeService.getSearchParam('searchTx');
            $scope.searchInfo.pageIndex = HomeService.getSearchParam('pageIndex') ? getPageIndex(HomeService.getSearchParam('pageIndex')) : 1;
            $scope.searchInfo.fundCreateTime = HomeService.getSearchParam('fundCreateTime');

            $scope.infos = [];
            $scope.setInputInfo = function() {
                $scope.inputInfo = {
                    'strategy': HomeService.getSearchParam('strategy'),
                    'netValue': HomeService.getSearchParam('netValue'),
                    'fundCreateTime': HomeService.getSearchParam('fundCreateTime'),
                    'searchTx': HomeService.getSearchParam('searchTx')
                };

                $scope.setInputText();
            };

            $scope.setInputText = function() {
                $scope.infos = [];
                if ($scope.searchInfo.searchTx !== "")
                    $scope.infos.push($scope.searchInfo.searchTx);

                _.mapKeys($scope.inputInfo, function(value, key) {
                    if (key === 'strategy') {
                        if (Number(value) !== 0) {
                            var str = _.result(_.find($scope.STRATEGYS, function(item) {
                                return item.key === value;
                            }), 'value');

                            $scope.infos.push(str);
                        }
                    }
                    if (key === 'netValue') {
                        if (Number(value) !== 0) {
                            var str2 = _.result(_.find($scope.NETVALUES, function(item) {
                                return item.key === value;
                            }), 'value');

                            $scope.infos.push(str2);
                        }
                    }

                    if (key === 'fundCreateTime') {
                        if (Number(value) !== 0) {
                            var str3 = _.result(_.find($scope.FUNDCREATETIMES, function(item) {
                                return item.key === value;
                            }), 'value');

                            $scope.infos.push(str3);
                        }
                    }

                });
            };

            $scope.setInputInfo();
            $scope.showStrag = function() {
                $scope.strag = !$scope.strag;
                $scope.time0 = false;
                $scope.profit = false;
            };
            $scope.showTime = function() {
                $scope.strag = false;
                $scope.time0 = !$scope.time0;
                $scope.profit = false;
            };
            $scope.showProfit = function() {
                $scope.strag = false;
                $scope.time0 = false;
                $scope.profit = !$scope.profit;
            };


            HomeService.getProducts('/m/list', $scope.searchInfo).success(function(data) {
                $scope.listDatas = data;
                $scope.searchInfo.pageIndex = data.pageIndex;
            });

            $scope.setSearchStrategy = function(value) {
                $scope.searchInfo.strategy = value;
                $scope.inputInfo.strategy = value;
                $scope.setInputText();
                HomeService.updateSearchParam('strategy', value);
                HomeService.updateSearchParam('pageIndex', 1);
            };

            $scope.setSearchNetvalue = function(value) {
                $scope.searchInfo.netValue = value;
                $scope.inputInfo.netValue = value;
                $scope.setInputText();
                HomeService.updateSearchParam('netValue', value);
                HomeService.updateSearchParam('pageIndex', 1);
            };

            $scope.setSearchFundtime = function(value) {
                $scope.searchInfo.fundCreateTime = value;
                $scope.inputInfo.fundCreateTime = value;
                $scope.setInputText();
                HomeService.updateSearchParam('fundCreateTime', value);
                HomeService.updateSearchParam('pageIndex', 1);
            };

            $scope.getListData = function() {
                $scope.strag = false;
                $scope.profit = false;
                $scope.time0 = false;
                $scope.inputInfo.searchTx = $scope.searchInfo.searchTx;
                $scope.setInputText();
                HomeService.updateSearchParam('searchTx', $scope.searchInfo.searchTx);
                HomeService.updateSearchParam('pageIndex', 1);
            };

            $scope.nexPage = function() {
                if ($scope.searchInfo.pageIndex < $scope.listDatas.totalPage) {
                    $scope.searchInfo.pageIndex = Number($scope.searchInfo.pageIndex) + 1;
                    HomeService.updateSearchParam('pageIndex', $scope.searchInfo.pageIndex);
                }

            };

            $scope.prePage = function() {
                if ($scope.searchInfo.pageIndex > 1) {
                    $scope.searchInfo.pageIndex = Number($scope.searchInfo.pageIndex) - 1;
                    HomeService.updateSearchParam('pageIndex', $scope.searchInfo.pageIndex);
                }

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
                            _czc.push(['_trackPageview', '/dianji']);
                        }
                    });
            };

            $scope.gotoDetail = function(detail) {
                $location.url('/detail/' + detail.fundCode);
            };

            $scope.$on('$destroy', function() {});
        };

        return ['$scope', 'events', 'utils', 'HomeService', '$alert', '$location', 'CONF', ListController];

    });

})(define);
