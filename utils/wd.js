var webdriver = require('selenium-webdriver'),
    test = require('selenium-webdriver/testing'),
    chai = require('chai'),

    Wd = function () {
      this.it = test.it;
      this.describe = test.describe;
      this.before = test.before;
      this.after = test.after;
      this.driver = {};
      this.by = webdriver.By;
      this.until = webdriver.until;
      this.expect = chai.expect;
    },

    that = this;

/**
 * Инициализация webdriver
 * @param {String} browser браузер, с которым будет работать инстанс класса
 */
Wd.prototype.init = function (browser) {
  this.driver = new webdriver.Builder()
      .forBrowser(browser)
      .build();
  global.wd = this;

  this.driver.manage().timeouts().implicitlyWait(1000);
};

/**
 * Открыть заданный url
 * @param {String} url адрес страницы, которую необходимо открыть
 */
Wd.prototype.get = function (url) {
  this.driver.get(url);
};

/**
 * Завершить сессию браузера
 */
Wd.prototype.quit = function () {
  this.driver.quit();
};

/**
 * подождать элемента
 * @param {webdriver} element элемент, который нужно подождать
 * @param {number} [timeout = 1000] период ожидания
 * @return {webdriver} элемент
 */
Wd.prototype.waitElement = function (element, timeout) {
  return this.driver.waitElement(function (element) {
    return element;
  }, timeout || 1000);
};


module.exports = Wd;