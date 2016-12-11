var _anyPage = require('./anyPage.js'),
    util = require('util');

/**
 * Конструктор
 */
function LoginPage() {
}

util.inherits(LoginPage, _anyPage);

/**
 * Открыть страницу логина в администраторскую часть
 */
LoginPage.prototype.get = function () {
  wd.get('http://litecart/admin/login.php');
  wd.waitElement(wd.driver.findElements(wd.by.id('box-login')));
};

/**
 * Залогиниться
 * @param {String} [user='admin'] имя пользователя
 * @param {String} [pass='admin'] пароль
 */
LoginPage.prototype.login = function (user, pass) {
  wd.driver.findElement(wd.by.name('username')).sendKeys(pass || 'admin');
  wd.driver.findElement(wd.by.name('password')).sendKeys(user || 'admin');
  wd.driver.findElement(wd.by.name('login')).click();
  wd.waitElement(wd.driver.findElement(wd.by.id('sidebar')));
};

module.exports = LoginPage;