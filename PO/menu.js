var adminPage = require('./adminPage.js'),
    util = require('util'),
    menu = function () {
      this.b = 'b';
    };

util.inherits(menu, adminPage);

/**
 * Получить все элементы меню
 * @returns {webdriver[]} все элементы меню
 */
menu.prototype.getAllMenuItems = function () {
  return this.getElementOnCurrentPage('menu')
      .findElements(wd.by.css('#box-apps-menu > li'));
};

/**
 * Получить раскрытый элемент меню
 * @returns {webdriver[]} раскрытый элемент меню
 */
menu.prototype.getOpenedMenuItem = function () {
  var openedMenuItem;

  openedMenuItem = this.getElementOnCurrentPage('menu')
      .findElements(wd.by.css('#box-apps-menu > li.selected'));

  return wd.wait(openedMenuItem[0]).then(function () {
    return openedMenuItem;
  });
};

/**
 * Получить все элементы меню
 * @returns {Promise.webdriver[]} все подэлементы меню
 */
menu.prototype.getAllMenuSubItems = function () {
  return this.getOpenedMenuItem().then(function (_openedMenuItem) {
    if (_openedMenuItem.length > 0) {
      return _openedMenuItem[0].findElements(wd.by.css('li'));
    } else {
      return [];
    }
  });
};

module.exports = menu;