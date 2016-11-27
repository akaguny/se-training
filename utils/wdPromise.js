var promiseString = function () {
  /**
   * Функция для преобразования чего-либо в promise
   * @param {*} obj объект, который необходимо вернуть как promise
   * @return {Promise} разрешённый promise, содержаший переданный в качестве
   * аргумента объект
   */
  this.anyToPromise = function (obj){
    return new Promise(function(resolve, reject) {
      return resolve(obj);
    });
  };
};

module.exports = promiseString;