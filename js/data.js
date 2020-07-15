'use strict';
(function () {
  var PIN_HEIGHT = 70;
  var PIN_WIDTH = 50;
  var TYPE_HOUSES = {
    palace: 'Дворец',
    flat: 'Квартира',
    house: 'Дом',
    bungalo: 'Бунгало'
  };

  var TYPE_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var TIMES = ['12:00', '13:00', '14:00'];
  var OBJECT_PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
  var COORDINATE_MIN_X = 0 + PIN_WIDTH;
  var COORDINATE_MAX_X = 1200 - PIN_WIDTH;
  var COORDINATE_MIN_Y = 130 + PIN_HEIGHT;
  var COORDINATE_MAX_Y = 630 - PIN_HEIGHT;

  var pinListElement = document.querySelector('.map__pins');

  var getTypeHouse = function () {
    var arrObject = Object.keys(TYPE_HOUSES);
    var randomElementArr = arrObject[window.MathModule.randomInteger(0, arrObject.length)];
    return randomElementArr;
  };

  window.selectObject = function () {
    return {
      author: {
        avatar: 'img/avatars/user0' + window.MathModule.randomInteger(1, 8) + '.png'
      },
      offer: {
        title: 'Заголовок предложения',
        adress: 'Адресс проживания',
        price: window.MathModule.randomInteger(2000, 8000),
        type: getTypeHouse(),
        rooms: window.MathModule.randomInteger(2, 5),
        guests: window.MathModule.randomInteger(2, 5),
        checkin: TIMES[window.MathModule.randomInteger(0, TIMES.length)],
        checkout: TIMES[window.MathModule.randomInteger(0, TIMES.length)],
        features: window.MathModule.getRandomArray(TYPE_FEATURES),
        description: 'Строка с описанием',
        photos: OBJECT_PHOTOS[window.MathModule.randomInteger(0, OBJECT_PHOTOS.length)],
      },
      location: {
        x: window.MathModule.randomInteger(COORDINATE_MAX_X, COORDINATE_MIN_X),
        y: window.MathModule.randomInteger(COORDINATE_MAX_Y, COORDINATE_MIN_Y)
      }
    };
  };

  window.ConstModule = {
    PIN_HEIGHT: PIN_HEIGHT,
    PIN_WIDTH: PIN_WIDTH,
    TYPE_HOUSES: TYPE_HOUSES,
    TYPE_FEATURES: TYPE_FEATURES,
    TIMES: TIMES,
    OBJECT_PHOTOS: OBJECT_PHOTOS,
    COORDINATE_MIN_X: COORDINATE_MIN_X,
    COORDINATE_MAX_X: COORDINATE_MAX_X,
    COORDINATE_MIN_Y: COORDINATE_MIN_Y,
    COORDINATE_MAX_Y: COORDINATE_MAX_Y,
    pinListElement: pinListElement
  };

})();
