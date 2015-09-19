(function(define, require) {
    'use strict';

    var features = require.toUrl('features');

    define(['angular', 'lodash'], function(angular, _) {

        var dir = function(HomeService, CONF) {

            return {
                restrict: 'A',
                scope: {
                    data: '='
                },
                link: function($scope, element, attributes) {
                    $scope.isSubmit = false; //请输入姓名
                    $scope.errorName = ''; //电话号码输入错误,
                    $scope.errorPhone = '';

                    $scope.close = function() {
                        $scope.isSubmit = false;
                        $scope.data.isShow = false;
                        $scope.data.fundCode = '';
                        $scope.data.fundName = '';
                        // $scope.showWrong = false;
                        $scope.inName = '';
                        $scope.inPhone = '';
                    };

                    $scope.onOK = function() {
                        $scope.close();
                        // $scope.showWrong = false;
                        $scope.inName = '';
                        $scope.inPhone = '';
                        $scope.errorName = '';
                        $scope.errorPhone = '';
                    };
                    $scope.onSubmit = function() {
                        if (!$scope.inName || $scope.inName === '') {
                            $scope.errorName = '请输入姓名';
                            $scope.isSubmit = false;
                            return;
                        } else
                            $scope.errorName = '';

                        var rePhone = new RegExp(/(^0\d{2,3}-?\d{7,8}$)|(^1[3|4|5|6|7|8|9][0-9]{1}[0-9]{8}$)/);
                        var isPhone = rePhone.test($scope.inPhone);
                        if (isPhone) {

                            HomeService.callMTX({
                                    fundCode: $scope.data.fundCode,
                                    fundName: $scope.data.fundName,
                                    name: $scope.inName,
                                    phone: $scope.inPhone
                                })
                                .success(function(data) {
                                    if (CONF.isProduct) {
                                        _hmt.push(['_trackPageview', '/yuyue']);
                                        _czc.push(["_trackPageview", '/yuyue']);
                                    }
                                    $scope.isSubmit = true;
                                    // $scope.showWrong = false;
                                });
                        } else {
                            $scope.isSubmit = false;
                            $scope.errorPhone = '电话号码输入错误';
                            // $scope.showWrong = true;
                        }
                    };
                },
                templateUrl: features + '/home/directive/popView.html'
            };
        };

        return ['HomeService', 'CONF', dir];

    });

})(define, require);
