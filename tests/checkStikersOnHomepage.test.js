var _wd = require('./../utils/wd.js'),
    wd = new _wd(),
    _homepage = require('./../PO/homepage'),
    homepage;

wd.describe('Проверка на наличие стикеров у товаров на главной странице', function () {

  wd.before(function () {
    homepage = new _homepage();
    wd.init('chrome');
  });

  wd.after(function () {
    wd.quit();
  });

  wd.it('1. Отрыть главную страницу', function () {
    homepage.get();
  });

  wd.it('2. Проверить, что у всех мини карточек товаров есть стикер', function () {
    homepage.isAllProductsMiniCardHaveStickers(true);
  });

});