var _adminPage = require('./adminPage.js'),
    util = require('util'),
    AdminPage = new _adminPage();

/**
 * Конструктор PO меню
 * @constructor
 */
function Menu() {

}

/**
 * Получить все элементы меню
 * @returns {webdriver[]} все элементы меню
 */
Menu.prototype.getAllMenuItems = function () {
  return AdminPage.getElementOnCurrentPage('menu')
      .findElements(wd.by.css('#box-apps-menu > li'));
};

/**
 * Получить раскрытый элемент меню
 * @returns {webdriver[]} раскрытый элемент меню
 */
Menu.prototype.getOpenedMenuItem = function () {
  var openedMenuItem;

  openedMenuItem = AdminPage.getElementOnCurrentPage('menu')
      .findElements(wd.by.css('#box-apps-menu > li.selected'));

  return wd.waitElement(openedMenuItem[0]).then(function () {
    return openedMenuItem;
  });
};

/**
 * Получить все элементы меню
 * @returns {Promise.webdriver[]} все подэлементы меню
 */
Menu.prototype.getAllMenuSubItems = function () {
  var subElements;

  return this.getOpenedMenuItem().then(function (_openedMenuItem) {
    if (_openedMenuItem.length > 0) {
      subElements = _openedMenuItem[0].findElements(wd.by.css('li'));
    } else {
      subElements = [];
    }
    return subElements;
  });
};

module.exports = Menu;