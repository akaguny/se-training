var _wdPromise = require('./../utils/wdPromise.js'),
    promise = new _wdPromise;

/**
 * Конструктор
 */
function AnyPage() {
};

/**
 * Получить текст h1
 * @return {Promise.<String>} текст h1
 */
AnyPage.prototype.getH1TitleText = function() {
  var h1,
      text;

  return wd.driver.findElements(wd.by.css('h1')).then(function (_h1) {
    h1 = _h1;
  }).then(function () {
    if (h1.length > 0){
      text = h1[0].getText().then(function (_text) {
        return _text;
      });
    } else {
      text = promise.anyToPromise(undefined);
    }
  }).then(function () {
    return text;
  });
};

/**
 * Открыть страницу, описанную данным PO
 * Метод переопределяется в наследниках
 */
AnyPage.prototype.get = function () {

};

module.exports = AnyPage;
