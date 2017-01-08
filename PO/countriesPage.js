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

/**
 * Получить все значения свойств стран
 * @params {String} имя свойства, значение которого необходимо узнать
 * ('name'|'zones')
 * @return {Promise.<webdriver[]>} список элементов значений всех стран на странице
 */
CountriesPage.prototype.getAllCountriesPropertyValues = function (propertyName) {
  var countryTable = this.getCountryTable(),
    allCountriesRecords,
    that = this,
    countriesProperties = [];

  return this.getAllCountriesRecords().then(function (_allCountriesRecords) {
    allCountriesRecords = _allCountriesRecords;
  }).then(function () {
    allCountriesRecords.forEach(function (item) {
      that.getCountryPropertyByPropertyName(item, propertyName).then(function (property) {
        countriesProperties.push(property);
      });
    });
  }).then(function () {
    return countriesProperties;
  });
};

/**
 * Получить все текстовые значения свойств стран
 * @params {String} имя свойства, значение которого необходимо узнать
 * ('name'|'zones')
 * @return {Promise.<webdriver[]>} список элементов значений всех стран на странице
 */
CountriesPage.prototype.getAllCountriesPropertyText = function (propertyName) {
  var countriesPropertiesTextValues = [],
    propertyText;

  return this.getAllCountriesPropertyValues(propertyName).then(function (_propArray) {
    _propArray.forEach(function (_prop) {
      _prop.getText().then(function (_text) {
        countriesPropertiesTextValues.pop(_text);
      });
    });
  }).then(function () {
    return countriesPropertiesTextValues;
  });
};

/**
 * Получить все записи стран
 * @return {Promise.<webdriver[]>} все записи стран, содержащие информацию о них
 */
CountriesPage.prototype.getAllCountriesRecords = function () {
  var countryTable = this.getCountryTable(),
    countryRecords;

  countryRecords = countryTable.findElements(wd.by.css('tr.row'));

  return countryRecords;
};

/**
 * Получить таблицу старан
 * @return {webdriver} таблица стран
 */
CountriesPage.prototype.getCountryTable = function () {
  var countryTable = wd.driver.findElement(wd.by.name('countries_form'));

  return countryTable;
};

/**
 * Проверка на правильность сортировки стран
 * @param {String} [sort=По возрастанию] ('По возрастанию'|'По убыванию')
 */
CountriesPage.prototype.checkSortingOfCountriesByName = function (sort) {
  this.getAllCountriesPropertyText('name').then(function (names) {
    if (sort !== 'По убыванию') {
      names.forEach(function (item, i, array) {
        if (i !== 0) {
          wd.assert.isAtLeast(item, array[i - 1], 'Имена: ' + array[i - 1] + '; ' + item +
            ' расположены не по возрастанию');
        }
      });
    } else {
      names.forEach(function (item, i, array) {
        if (i !== 0) {
          wd.assert.isAtLeast(array[i - 1], item, 'Имена: ' + array[i - 1] + '; ' + item +
            ' расположены не по убыванию');
        }
      });
    }
  });
};

/**
 * Есть ли у страны зоны
 * @param {webElement} countryItem
 * @return {Promise.<boolean>} есть ли у страны зоны
 */
CountriesPage.prototype.isCountryHaveZones = function (countryItem) {
  var countryHaveZones,
    zoneText;

  return this.getCountryPropertyByPropertyName(countryItem, 'zones').then(function (zone) {
    zone.getText().then(function (_zoneText) {
      zoneText = _zoneText;
    });
  }).then(function () {
    if (parseInt(zoneText, 10) > 0) {
      countryHaveZones = true;
    } else {
      countryHaveZones = false;
    }
  }).then(function () {
    return countryHaveZones;
  });
};

/**
 * Открыть страницу редактирования страны
 * @param countryItem
 */
CountriesPage.prototype.openCountryPageEditPage = function (countryItem) {
  return this.getCountryPropertyByPropertyName(countryItem, 'name').then(function (_item) {
    _item.findElement(wd.by.css('a')).click();
  }).then(function () {
    return wd.waitElement(wd.driver.findElement(wd.by.id('table-zones')));
  });
};

/**
 * Получить свойство страны по имени свойства
 * @param {String} countryItem
 * @param {String} propertyName
 * @return {*}
 */
CountriesPage.prototype.getCountryPropertyByPropertyName = function (countryItem, propertyName) {
  var propertyNumber,
    countriesProperties = [];

  /* Получение значение свойства, TODO: хардкод индекса - плохо, т.к. если поменять порядок колонок, то всё
   * сломается
   */
  switch (propertyName) {
    case 'name':
      propertyNumber = 4;
      break;
    case 'zones':
      propertyNumber = 5;
      break;
    default:
      throw new Error('Свойство <' + propertyName + '> не поддерживается, только: name; zones');
  }

  // Получение всех значений для страны(ID,...,Name)
  return countryItem.findElements(wd.by.css('td')).then(function (_el) {
    countriesProperty = _el[propertyNumber];
  }).then(function () {
    return countriesProperty;
  });
};

/**
 * Проверка сортировки зон
 * @param sort
 */
CountriesPage.prototype.checkZoneSorting = function (sort) {
  var table = this.getZoneTable(),
    // FixMe: нужно вынести функции работы с таблицами в отдельный класс
    zonesElements,
    zonesNames = [];

  table.findElements(wd.by.css('tr')).then(function (_allTr) {
    zonesElements = _allTr.filter(function (_tr) {
      return _tr.getAttribute('class').then(function (_trClass) {
        return _trClass !== 'header';
      });
    });
  }).then(function () {
    zonesElements.forEach(function (_zoneElement) {
      _zoneElement.findElements(wd.by.css('td')).then(function (_zoneProperty) {
        if (_zoneProperty.length !== 0) {
          _zoneProperty[2].getText().then(function (_zonePropertyText) {
            if (_zonePropertyText.length > 0) {
              zonesNames.push(_zonePropertyText);
            }
          });
        }
      });
    });
  }).then(function () {
    zonesNames.forEach(function (item, i, array) {
      if (i !== 0) {
        if (sort !== 'По убыванию') {
          wd.assert.isAtLeast(item, array[i - 1], 'Имена: ' + array[i - 1] + '; ' + item +
            ' расположены не по возрастанию');
        } else {
          wd.assert.isAtLeast(array[i - 1], item, 'Имена: ' + array[i - 1] + '; ' + item +
            ' расположены не по убыванию');
        }
      }
    });
  });
};

/**
 * Получить таблицу зон
 * @return {*}
 */
CountriesPage.prototype.getZoneTable = function () {
  return wd.driver.findElement(wd.by.id('table-zones'));
};

/**
 * Проверка на правильность сортировки стран
 * @param {String} [sort=По возрастанию] ('По возрастанию'|'По убыванию')
 */
CountriesPage.prototype.checkSortingOfZonesByName = function (sort) {
  this.getAllCountriesPropertyText('name').then(function (names) {
    if (sort !== 'По убыванию') {
      names.forEach(function (item, i, array) {
        if (i !== 0) {
          wd.assert.isAtLeast(item, array[i - 1], 'Имена: ' + array[i - 1] + '; ' + item +
            ' расположены не по возрастанию');
        }
      });
    } else {
      names.forEach(function (item, i, array) {
        if (i !== 0) {
          wd.assert.isAtLeast(array[i - 1], item, 'Имена: ' + array[i - 1] + '; ' + item +
            ' расположены не по убыванию');
        }
      });
    }
  });
};

util.inherits(CountriesPage, AdminPage);

module.exports = CountriesPage;