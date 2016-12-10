var _anyPage = require('./anyPage.js'),
    util = require('util');

/**
 * Конструктор
 */
function HomePage() {
  this.self = this;
}

util.inherits(HomePage, _anyPage);

HomePage.prototype.get = function () {
  wd.get('http://litecart/en/');
  wd.wait(wd.driver.findElements(wd.by.css('.box-most-popular')));
};

/**
 * Получить элемент на текущей станице
 * @param {String} name имя элемента
 * ('sidebar' | 'menu' | 'header')
 * @returns {webdriver|webdriver[]} элемент(ы)
 */
HomePage.prototype.getElementOnCurrentPage = function (name) {
  var elem;

  switch (name){
    case 'products':
      elem = wd.driver.findElements(wd.by.css('.product'));
      break;
    default:
      throw new Error('Получение элемента ' + name + 'не поддерживается, только \n' +
          '"menu", "header"');
  }
  return elem;
};

/**
 * Проверка, что продукт имеет label
 * @param {elementFinder} product элемент мини-карточка продукта
 * @param {boolean} [_isHaveSticker=true] что проверяем, есть ли стикер у товара?
 */
HomePage.prototype.isProductMiniCardHaveSticker = function (product, _isHaveSticker) {
  var isHaveSticker = _isHaveSticker !== false ? true : _isHaveSticker,
      _isProductMiniCardHaveSticker;

  product.findElements(wd.by.css('.sticker')).then(function (elArray) {
    _isProductMiniCardHaveSticker = elArray.length >= 1 ? true : false;
  }).then(function () {
    wd.expect(_isProductMiniCardHaveSticker).to.equal(isHaveSticker);
  });
};

/**
 * Проверка, что все продукты имеют label
 * @param {boolean} [_isHaveSticker=true] что проверяем, есть ли стикер у товара?
 */
HomePage.prototype.isAllProductsMiniCardHaveStickers = function (_isHaveSticker) {
  var that = this;

  this.getElementOnCurrentPage('products').then(function (_productsArray) {
    _productsArray.forEach(function (item, array) {
      that.isProductMiniCardHaveSticker(item, _isHaveSticker);
    });
  });
};

module.exports = HomePage;