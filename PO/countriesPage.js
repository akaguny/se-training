var AdminPage = require('./adminPage.js'),
    util = require('util'),

    /**
     *
     * @constructor
     */
    CountriesPage = function () {
    };

/**
 * Открыть странице страны администраторской части
 */
CountriesPage.prototype.get = function () {
  wd.get('http://litecart/admin/?app=countries&doc=countries');
  wd.waitElement(wd.driver.findElements(wd.by.name('countries_form')));
};

util.inherits(AdminPage, CountriesPage);

module.exports = CountriesPage;