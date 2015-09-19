(function(define) {
    'use strict';

    define(['angular', 'highcharts', 'lodash', 'jquery'], function(angular, Highcharts, _, $) {

        var dir = function($filter) {

            return {
                restrict: 'A',
                scope: {
                    data: '='
                },
                link: function($scope, element) {

                    var options = {
                        chart: {
                            type: 'line',
                            renderTo: element[0],
                            height: 300
                        },
                        title: {
                            text: null
                        },
                        credits: {
                            enabled: false
                        },
                        subtitle: {
                            text: null
                        },
                        xAxis: {
                            type: 'datetime',
                            gridLineWidth: 1,
                            gridLineDashStyle: 'dash',
                            title: {
                                enabled: false
                            },
                            labels: {
                                enabled: true,
                                format: '{value:%Y-%m}',
                                align: 'center'
                            },
                            tickLength: 0
                        },
                        legend: {
                            enabled: false
                        },
                        yAxis: {
                            gridLineWidth: 1,
                            gridLineDashStyle: 'dash',
                            labels: {
                                enabled: true,
                                format: '{value} %'
                            },
                            title: {
                                enabled: false
                            }
                        },
                        plotOptions: {
                            series: {
                                lineWidth: 2,
                                states: {
                                    hover: {
                                        lineWidth: 3
                                    }
                                },
                                marker: {
                                    enabled: false
                                }
                            },
                            line: {
                                turboThreshold: 5000,
                                shadow: {
                                    width: 3
                                }
                            },
                            spline: {
                                marker: {
                                    enabled: false,
                                    states: {
                                        hover: {
                                            enabled: false
                                        }
                                    }
                                }
                            }
                        },
                        tooltip: {
                            enabled: true,
                            crosshairs: [{
                                width: 1.5,
                                color: '#FF3131'
                            }],
                            shared: true,
                            useHTML: true,
                            borderWidth: 0,
                            style: {
                                padding: 0,
                            },

                            formatter: function() {
                                var html = '<span style="margin-left: 5px; margin-top: 5px; margin-bottom: 5px; font-weight: bold; display: block;">' + Highcharts.dateFormat('%Y-%m-%d', this.x) + '</span><table border="0" cellpadding="0" cellspacing="0">';

                                $.each(this.points, function() {
                                    var upColor = '#fe6869';
                                    var downColor = '#afbb25';
                                    html += '<tr><td style="padding: 3px;">' + this.series.name + '</td><td style="color: ' + (this.y >= 0 ? upColor : downColor) + ';">&nbsp;' + this.y + '%&nbsp;</td></tr>';
                                });
                                html += '</table>';

                                return html;
                            }
                        }
                    };

                    var chart;

                    $scope.$watch('data', function(newValue) {
                            var minimum;
                            if (newValue && !chart) {

                                var funds = {},
                                    hushen = {},
                                    item = [],
                                    item2 = [];
                                _.each(newValue, function(value) {
                                    item.push([value.date, value.yield]);
                                    item2.push([value.date, value.hushenIndex]);
                                });

                                funds = {
                                    name: "本基金",
                                    data: item
                                };
                                hushen = {
                                    name: "沪深300",
                                    data: item2
                                };


                                options.series = [];
                                options.series.push(funds);
                                options.series.push(hushen);


                                chart = new Highcharts.Chart(options);
                                return;
                            }



                        },
                        true);

                    $scope.$on('$destroy', function() {
                        if (chart) {
                            chart.destroy();
                        }
                    });
                }
            };
        };

        return ['$filter', dir];

    });

})(define);
