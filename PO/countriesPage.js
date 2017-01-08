var AdminPage = require('./adminPage.js'),
    util = require('util'),

    /**
     *
     * @constructor
     */
    CountriesPage = function () {
    };

/**
 * Открыть странице страны администраторской части
 */
CountriesPage.prototype.get = function () {
  wd.get('http://litecart/admin/?app=countries&doc=countries');
  wd.waitElement(wd.driver.findElements(wd.by.name('countries_form')));
};

CountriesPage.prototype.getCountryCountOfZones = function (){

};

/**
 * Получить все имена стран
 * @return {Promise.<webdriver[]>} список имён всех стран на странице
 */
CountriesPage.prototype.getAllCountriesNames = function (){
  var countryTable = this.getCountryTable(),
      countryNames = [],
      allCountriesRecords;

  return this.getAllCountriesRecords().then(function(_allCountriesRecords){
    allCountriesRecords = _allCountriesRecords;
  }).then(function () {
    allCountriesRecords.forEach(function (item) {
      // Получение всех значений для страны(ID,...,Name)
      item.findElements(wd.by.css('td')).then(function (_el) {
        // Получение Name, TODO: хардкод индекса - плохо, т.к. если поменять порядок колонок, то всё сломается
        _el[4].getText().then(function (countryName) {
          // Сохраненеи Name в переменную
          countryNames.push(countryName);
        });
      });
    });
  }).then(function () {
    return countryNames;
  });
};

/**
 * Получить все записи стран
 * @return {Promise.<webdriver[]>} все записистран, содержащие информацию о них
 */
CountriesPage.prototype.getAllCountriesRecords = function (){
  var countryTable = this.getCountryTable(),
    countryRecords;

  countryRecords = countryTable.findElements(wd.by.css('tr.row'));

  return countryRecords;
};

/**
 * Получить таблицу старан
 * @return {webdriver} таблица стран
 */
CountriesPage.prototype.getCountryTable = function (){
  var countryTable = wd.driver.findElement(wd.by.name('countries_form'));

  return countryTable;
};

/**
 * Проверка на правильность сортировки стран
 * @param {String} [sort=По возрастанию] ('По возрастанию'|'По убыванию')
 */
CountriesPage.prototype.checkSortingOfCountriesByName = function (sort) {
  this.getAllCountriesNames().then(function (names) {
    if (sort !== 'По убыванию'){
      names.forEach(function (item, i, array) {
        if (i !== 0) {
          wd.assert.isAtLeast(item, array[i-1], 'Имена: ' + array[i-1] + '; ' + item +
            ' расположены не по возрастанию');
        }
      });
    } else {
      names.forEach(function (item, i, array) {
        if (i !== 0) {
          wd.assert.isAtLeast(array[i-1], item, 'Имена: ' + array[i-1] + '; ' + item +
            ' расположены не по убыванию');
        }
      });
    }
  });
};
util.inherits(AdminPage, CountriesPage);

module.exports = CountriesPage;