/**
 *  Entrance of features
 *
 *  @author  jiang.liu
 *  @date    Jul 2, 2015
 *
 */
(function(define) {
    'use strict';

    define([
        './home/main',
        './common/main'
    ], function(home, common) {
        return [home].concat(common);
    });

}(define));
