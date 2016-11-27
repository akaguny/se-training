
var _wd = require('./../utils/wd.js'),

    wd = new _wd();

wd.before(function () {
  wd.init('chrome');
});

wd.describe('Открыть браузер', function () {

  wd.it('Первый it', function () {
    wd.get('http://litecart/admin/');
  });

  wd.it('Закрыть браузер', function () {
    wd.quit();
  });
});