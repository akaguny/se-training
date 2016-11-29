var _anyPage = require('./anyPage.js'),
    util = require('util');

/**
 * Конструктор
 */
function AdminPage() {
}

util.inherits(AdminPage, _anyPage);

/**
 * Получить элемент на текущей станице
 * @param {String} name имя элемента
 * ('sidebar' | 'menu' | 'header')
 * @returns {webdriver} элемент
 */
AdminPage.prototype.getElementOnCurrentPage = function (name) {
  var elem;

  switch (name){
    case 'sidebar':
      elem = wd.driver.findElement(wd.by.id('sidebar'));
      break;
    case 'menu':
      elem = wd.driver.findElement(wd.by.id('box-apps-menu-wrapper'));
      break;
    case 'header':
      elem = this.getElementOnCurrentPage('sidebar')
          .wd.driver.findElement(wd.by.css('.header'));
      break;
    default:
      throw new Error('Получение элемента ' + name + 'не поддерживается, только \n' +
          '"menu", "header"');
  }
  return elem;
};


module.exports = AdminPage;
