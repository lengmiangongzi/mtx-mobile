/**
 *  AppConfig is the configuration of the whole application, in case
 *  you have different stuff for each env
 *
 *
 *  @author  jiang.liu
 *  @date    Jul 2, 2015
 *
 */
(function(define) {
    'use strict';

    define(['ConfiguratorBase', 'tpl!etc/config.json'], function(Base, tpl) {

        var Configurator = Base.extend(function() {
            this.constructor = function(features, app) {
                this.super(features, app);
                this.config = {
    "appname": "募天下理财网 - 中国最大的线上理财服务平台",
    "base": "",
    "version": "1.0.0",
    "api": "http://mtx01.wmcloud-qa.com/",
    "isProduct":false
}
            };

            this.run = function() {
                this.super.run();
                this.app.constant('CONF', this.config);
            };
        });

        return Configurator;

    });

}(define));
