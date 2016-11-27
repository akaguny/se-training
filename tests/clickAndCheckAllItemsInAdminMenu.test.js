
var _wd = require('./../utils/wd.js'),
    _wdPromise = require('./../utils/wdPromise.js'),
    _menu = require('./../PO/menu'),
    wd = new _wd(),
    promise = new _wdPromise,
    menu,
    menuItemsCount,
    menuSubItemsCount;

wd.before(function () {
  menu = new _menu();
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

  wd.it('При переходе по пунктам меню меняется заголовок', function () {
    var countItems,
        countSubitems;

    this.timeout(150000);

    /**
     * Кликнуть по элементу
     * @param {webdriver} numItem номер элемента
     * @param {number} numSubItem номер подЭлемента
     */
    function clickOnElementAndCheckReaction(numItem, numSubItem) {
      var savedh1, menuItems;

      getH1TitleText().then(function (_text) {
        savedh1 = _text;
      }).then(function () {
        menu.getAllMenuItems().then(function (_menuItems) {
          menuItems = _menuItems;
        });
      }).then(function () {
        // Проход по подительским элементам
        if (numSubItem === undefined){
          if (menuItems.length !== 0 && (numItem === undefined || numItem === false)){
            menuItems.forEach(function (item, _num) {
              clickOnElementAndCheckReaction(_num);
            });
          } else {
            menuItems[numItem].click();
          }
        }
      }).then(function () {
        // Проход по дочерним элементам
        menu.getAllMenuSubItems().then(function (_subItems) {
          if (_subItems.length !== 0){
            if (numSubItem === undefined){
              _subItems.forEach(function (subItem, __num) {
                clickOnElementAndCheckReaction(false, __num);
              });
            } else {
              _subItems[numSubItem].getAttribute('class').then(function (_class) {
                if (!(_class.indexOf('selected') >= 0)){
                  _subItems[numSubItem].click();
                }
              });
            }
          }
        });
      }).then(function () {
        getH1TitleText().then(function (_h1Text) {
          try {
            wd.expect(_h1Text).to.not.be.undefined;
          } catch (e){
            console.log(e);
          }
        });
      });
    }

    /**
     * Получить текст h1
     * @return {Promise.<String>} текст h1
     */
    function getH1TitleText() {
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
    }
    clickOnElementAndCheckReaction();
  });

  wd.after(function () {
    wd.quit();
  });
});