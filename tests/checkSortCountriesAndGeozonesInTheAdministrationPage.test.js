var _wd = require('./../utils/wd.js'),
    wd = new _wd(),
    _countriesPage = require('./../PO/countriesPage'),
    countriesPage,
    _loginPage = require('./../PO/loginPage'),
    loginPage;

wd.describe('Проверка на наличие стикеров у товаров на главной странице', function () {

  wd.before(function () {
    loginPage = new _loginPage();
    countriesPage = new _countriesPage();
    wd.init('chrome');
  });

  wd.after(function () {
    wd.quit();
  });

  wd.it('1. Отрыть страницу логина в административную часть', function () {
    loginPage.get();
  });

  wd.it('2. Залогиниться', function () {
    loginPage.login();
  });

  wd.it('3. Открыть страницу страны административной части', function () {
    countriesPage.get();
  });


});