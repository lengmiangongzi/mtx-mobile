/**
 *  Entrance of common ui
 *
 *  @author  jiang.liu
 *  @date    Jul 2, 2015
 *
 */
(function(define) {
    'use strict';

    define([
        './Alerts',
        './Autofocus',
        './Confirm',
        './Error',
        './Info',
        './Modal',
        './RouteIndicator',
        './StRatio'
    ], function() {
        return [].slice.call(arguments);
    });

}(define));
