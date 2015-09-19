/**
 *
 *  Routes module expose route information used in home feature
 *
 *  @author  jiang.liu
 *  @date    Jul 2, 2015
 *
 */
(function(define) {
    'use strict';

    define(['tpl!./partials/home.html', 'tpl!./partials/list.html', 'tpl!./partials/detail.html'], function(tpl, listTpl, detailTpl) {
        return [{
            id: 'home',
            isDefault: true,
            when: '/home',
            controller: 'HomeController',
            template: tpl()
        }, {
            id: 'list',
            isDefault: false,
            when: '/list',
            controller: 'ListController',
            template: listTpl()
        }, {
            id: 'detail',
            isDefault: false,
            when: '/detail/:fundCode',
            controller: 'DetailController',
            template: detailTpl()
        }];
    });

}(define));
