/**
 *  Entrance of config
 *
 *
 *  @author  jiang.liu
 *  @date    Jul 2, 2015
 *
 */
(function(define) {
    'use strict';

    define([
        './AppConfig',
        './LoadingBarConfig',
        './RouterConfig',
        './SSOConfig'
    ], function() {
        return [].slice.call(arguments, 0);
    });

}(define));
