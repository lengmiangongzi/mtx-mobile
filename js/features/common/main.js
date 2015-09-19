/**
 *  Entrance of common service
 *
 *
 *  @author  Hao.Zuo
 *  @date    Apr 28th, 2015
 *
 */
(function(define) {
    'use strict';

    define([
        'lodash'
    ], function() {
        return _.flatten([].slice.call(arguments, 1));
    });

}(define));
