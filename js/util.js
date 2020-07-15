'use strict';
(function () {
  var randomInteger = function (min, max) {
    var rand = min + Math.random() * (max - min);
    return Math.floor(rand);
  };

  var getRandomArray = function (arr) {
    var newArray = [];
    for (var i = 0; i < randomInteger(0, arr.length); i++) {
      newArray.push(arr[i]);
    }
    return newArray;
  };

  window.MathModule = {
    randomInteger: randomInteger,
    getRandomArray: getRandomArray
  };
})();
