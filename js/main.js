'use strict';
var PIN_HEIGHT = 70;
var PIN_WIDTH = 50;
var TYPE_HOUSES = ['palace', 'flat', 'house', 'bungalo'];
var TYPE_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var TIMES = ['12:00', '13:00', '14:00'];
var OBJECT_PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var COORDINATE_MIN_X = 0 + PIN_WIDTH;
var COORDINATE_MAX_X = 1200 - PIN_WIDTH;
var COORDINATE_MIN_Y = 130 + PIN_HEIGHT;
var COORDINATE_MAX_Y = 620 - PIN_HEIGHT;

var pinListElement = document.querySelector('.map__pins');
var pinTemplate = document.querySelector('#pin').content;

var getRandomAvatar = function () {
  var randomNumber = '0' + (Math.floor(Math.random() * (9 - 1) + 1));
  var avatarAdress = 'img/avatars/user' + randomNumber + '.png';
  return avatarAdress;
};

var getRandomArray = function (arr) {
  var randomNumber = Math.floor(1 + Math.random() * ((arr.length - 1) - 1));
  var newArray = [];
  for (var i = 0; i < randomNumber; i++) {
    newArray.push(arr[i]);
  } return newArray;
};

var randomCoordinateSelectX = function () {
  var randomCoordinateX = Math.floor(Math.random() * (COORDINATE_MAX_X - COORDINATE_MIN_X) + COORDINATE_MIN_X) + 'px';

  return randomCoordinateX;
};

var randomCoordinateSelectY = function () {
  var randomCoordinateY = Math.floor(Math.random() * (COORDINATE_MAX_Y - COORDINATE_MIN_Y) + COORDINATE_MIN_Y) + 'px';

  return randomCoordinateY;
};

var selectTypeHouse = function () {
  var randomType = TYPE_HOUSES[Math.floor(Math.random() * TYPE_HOUSES.length)];

  return randomType;
};

var selectRandomTime = function () {
  var randomTime = TIMES[Math.floor(Math.random() * TIMES.length)];

  return randomTime;
};

var mapPins = [];

for (var i = 0; i < 8; i++) {
  mapPins.push({
    author: {
      avatar: getRandomAvatar()
    },

    offer: {
      tittle: 'Заголовок предложения',
      adress: 'Адресс проживания',
      price: 5000,
      type: selectTypeHouse(),
      rooms: Math.round(Math.random() * 4) + 1,
      guests: Math.round(Math.random() * 3) + 1,
      checking: selectRandomTime(),
      checkout: selectRandomTime(),
      features: getRandomArray[TYPE_FEATURES],
      description: 'Строка с описанием',
      photos: getRandomArray[OBJECT_PHOTOS]
    },
    location: {
      x: randomCoordinateSelectX(),
      y: randomCoordinateSelectY()
    }
  });
}

var renderPin = function (data) {
  var pinElement = pinTemplate.cloneNode(true);
  pinElement.querySelector('img').src = data.author.avatar;
  pinElement.querySelector('img').alt = data.offer.tittle;
  pinElement.querySelector('.map__pin').style.left = randomCoordinateSelectX();
  pinElement.querySelector('.map__pin').style.top = randomCoordinateSelectY();

  return pinElement;
};

var fragment = document.createDocumentFragment();
for (var b = 0; b < 8; b++) {
  fragment.appendChild(renderPin(mapPins[b]));
}

pinListElement.prepend(fragment);

document.querySelector('.map').classList.remove('map--faded');
