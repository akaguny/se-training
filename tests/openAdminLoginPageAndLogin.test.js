
var _wd = require('./../utils/wd.js'),

    wd = new _wd();

wd.before(function () {
  wd.init('chrome');
});

wd.describe('Открыть браузер', function () {

  wd.it('Открыть url формы логина', function () {
    wd.get('http://litecart/admin/');
  });

  wd.it('Залогиниться', function () {
    wd.driver.findElement(wd.by.name('username')).sendKeys('admin');
    wd.driver.findElement(wd.by.name('password')).sendKeys('admin');
    wd.driver.findElement(wd.by.name('login')).click();
  });

  wd.it('Закрыть браузер', function () {
    wd.quit();
  });
});