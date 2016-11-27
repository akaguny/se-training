
var _wd = require('./../utils/wd.js'),
    _menu = require('./../PO/menu'),
    wd = new _wd(),
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
      menu.getAllMenuItems().then(function (_items) {
        // Проход по подительским элементам
        if (numSubItem === undefined){
          if (_items.length !== 0 && (numItem === undefined || numItem === false)){
            _items.forEach(function (item, _num) {
              clickOnElementAndCheckReaction(_num);
            });
          } else {
            _items[numItem].click();
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
      });
    }
    clickOnElementAndCheckReaction();
  });

  wd.after(function () {
    wd.quit();
  });
});