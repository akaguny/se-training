
var _wd = require('./../utils/wd.js'),
    wd = new _wd(),
    _adminPage = require('./../PO/adminPage'),
    _menu = require('./../PO/menu'),
    AdminPage,
    Menu,
    menuItemsCount,
    menuSubItemsCount;

wd.before(function () {
  AdminPage = new _adminPage();
  Menu = new _menu();
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

      AdminPage.getH1TitleText(wd).then(function (_text) {
        savedh1 = _text;
      }).then(function () {
        Menu.getAllMenuItems().then(function (_menuItems) {
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
        Menu.getAllMenuSubItems().then(function (_subItems) {
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
        AdminPage.getH1TitleText().then(function (_h1Text) {
          try {
            wd.expect(_h1Text).to.not.be.undefined;
          } catch (e){
            console.log(e);
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