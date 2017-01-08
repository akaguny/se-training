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

  wd.it('4. Проверить, что страны расположены в алфавитном порядке', function () {
    this.timeout(150000);
    countriesPage.checkSortingOfCountriesByName();
  });

  /**
   * Проверка сортировки
   * @param country
   * @param sort
   */
  function checkZoneSorting(country, sort) {
    countriesPage.openCountryPageEditPage(country).then(function () {
      countriesPage.checkZoneSorting(sort);
    });
    countriesPage.clickCancel();
  }

  wd.it('5. Для стран, у которых количество зон не 0 проверить сортировку зон', function () {
    this.timeout(150000);
    countriesPage.getAllCountriesRecords().then(function (_countriesRecords) {
      _countriesRecords.forEach(function (curr, i) {
        countriesPage.getAllCountriesRecords().then(function (countriesRecords) {
          countriesPage.isCountryHaveZones(countriesRecords[i]).then(function (have) {
            // Если у страны есть зоны, то проверить сортировку
            if (have){
              checkZoneSorting(countriesRecords[i], 'По возрастанию');
            }
          });
        });
      });
    });
  });


});