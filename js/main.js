'use strict';
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
var NUMBER_PIN = 8;
var MAX_PRICE = 1000000;
var MIN_PRICE = 0;
var LEFT_MOUSE_BUTTON = 0;
var allFieldset = document.querySelectorAll('fieldset, select');

allFieldset.forEach(function (fieldElement) {
  fieldElement.setAttribute('disabled', 'disabled');
});

var activePin = document.querySelector('.map__pin--main');
var pinListElement = document.querySelector('.map__pins');
var pinTemplate = document.querySelector('#pin').content;
// var cardTemplate = document.querySelector('#card').content;

var getRandomArray = function (arr) {
  var newArray = [];
  for (var i = 0; i < randomInteger(0, arr.length); i++) {
    newArray.push(arr[i]);
  }
  return newArray;
};

var randomInteger = function (min, max) {
  var rand = min + Math.random() * (max - min);
  return Math.floor(rand);
};

var getTypeHouse = function () {
  var arrObject = Object.keys(TYPE_HOUSES);
  var randomElementArr = arrObject[randomInteger(0, arrObject.length)];
  return randomElementArr;
};

var selectObject = function () {
  return {
    author: {
      avatar: 'img/avatars/user0' + randomInteger(1, 8) + '.png'
    },
    offer: {
      title: 'Заголовок предложения',
      adress: 'Адресс проживания',
      price: randomInteger(2000, 8000),
      type: getTypeHouse(),
      rooms: randomInteger(2, 5),
      guests: randomInteger(2, 5),
      checkin: TIMES[randomInteger(0, TIMES.length)],
      checkout: TIMES[randomInteger(0, TIMES.length)],
      features: getRandomArray(TYPE_FEATURES),
      description: 'Строка с описанием',
      photos: OBJECT_PHOTOS[randomInteger(0, OBJECT_PHOTOS.length)],
    },
    location: {
      x: randomInteger(COORDINATE_MAX_X, COORDINATE_MIN_X),
      y: randomInteger(COORDINATE_MAX_Y, COORDINATE_MIN_Y)
    }
  };
};

var renderPin = function (data) {
  var pinElement = pinTemplate.cloneNode(true);
  pinElement.querySelector('img').src = data.author.avatar;
  pinElement.querySelector('img').alt = data.offer.title;
  pinElement.querySelector('.map__pin').style.left = data.location.x + 'px';
  pinElement.querySelector('.map__pin').style.top = data.location.y + 'px';

  return pinElement;
};
/*
var renderCard = function (data) {
  var cardElement = cardTemplate.cloneNode(true);
  cardElement.querySelector('.popup__title').textContent = data.offer.title;
  cardElement.querySelector('.popup__text--address').textContent = data.offer.adress;
  cardElement.querySelector('.popup__text--price').textContent = data.offer.price + 'Р/ночь';
  cardElement.querySelector('.popup__type').textContent = TYPE_HOUSES[data.offer.type];
  cardElement.querySelector('.popup__text--capacity').textContent = data.offer.rooms + ' комнаты для ' + data.offer.guests + ' гостей';
  cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + data.offer.checkin + ', выезд до ' + data.offer.checkout;
  cardElement.querySelector('.popup__description').textContent = data.offer.description;
  cardElement.querySelector('.popup__photo').src = data.offer.photos;
  cardElement.querySelector('.popup__avatar').src = data.author.avatar;
  cardElement.querySelector('.popup__features').innerHTML = '';

  data.offer.features.forEach(function (feature) {
    cardElement.querySelector('.popup__features').insertAdjacentHTML('beforeend', '<li class="popup__feature popup__feature--' + feature + '"></li>');
  });

  return cardElement;
};
*/
var pinFragment = document.createDocumentFragment();
for (var c = 0; c < NUMBER_PIN; c++) {
  var offer = selectObject();
  /*  if (c === 0) {
      pinFragment.appendChild(renderCard(offer));
  }*/
  pinFragment.appendChild(renderPin(offer));
}

var adressInput = document.querySelector('#address');
var activePageFunc = function () {
  allFieldset.forEach(function (fieldElement) {
    fieldElement.removeAttribute('disabled');
  });
  document.querySelector('.map').classList.remove('map--faded');
  document.querySelector('.ad-form').classList.remove('ad-form--disabled');
  pinListElement.prepend(pinFragment);
  adressInput.value = (parseInt(activePin.style.left, 10) + PIN_WIDTH / 2) + ', ' + (parseInt(activePin.style.top, 10) + PIN_HEIGHT);
};

// Активация страницы
activePin.addEventListener('mousedown', function (evt) {
  if (evt.button === LEFT_MOUSE_BUTTON) {
    evt.preventDefault();
    activePageFunc();
  }
});

activePin.addEventListener('keydown', function (evt) {
  if (evt.key === 'Enter') {
    activePageFunc();
  }
});

// Валидация форм
var priceInput = document.querySelector('#price');
var typeHouseInput = document.querySelector('#type');
var roomInput = document.querySelector('#room_number');
var guestInput = document.querySelector('#capacity');
priceInput.addEventListener('input', function () {
  if (priceInput.value > MAX_PRICE) {
    priceInput.setCustomValidity('Цена не может превышать 1000000 руб.');
  } else if (priceInput.value <= MIN_PRICE) {
    priceInput.setCustomValidity('Цена не может меньше или равна 0 руб.');
  } else if (typeHouseInput.value === 'flat') {
    if (priceInput.value < 1000) {
      priceInput.setCustomValidity('При выборе типа жилья Квартира - цена не может быть меньше 1000руб.');
    } else {
      priceInput.setCustomValidity('');
    }
  } else if (typeHouseInput.value === 'house') {
    if (priceInput.value < 5000) {
      priceInput.setCustomValidity('При выборе типа жилья Дом - цена не может быть меньше 5000руб.');
    } else {
      priceInput.setCustomValidity('');
    }
  } else if (typeHouseInput.value === 'palace') {
    if (priceInput.value < 10000) {
      priceInput.setCustomValidity('При выборе типа жилья Дворец - цена не может быть меньше 10000руб.');
    } else {
      priceInput.setCustomValidity('');
    }
  } else {
    priceInput.setCustomValidity('');
  }
});

// значение placeholder
typeHouseInput.onchange = function () {
  if (typeHouseInput.value === 'bungalo') {
    priceInput.placeholder = 0;
  } else if (typeHouseInput.value === 'flat') {
    priceInput.placeholder = 1000;
  } else if (typeHouseInput.value === 'house') {
    priceInput.placeholder = 5000;
  } else if (typeHouseInput.value === 'palace') {
    priceInput.placeholder = 10000;
  }
};

// синхронизация поля комнат и гостей
roomInput.onchange = function () {
  if (roomInput.value === '1') {
    guestInput.options[2].removeAttribute('disabled');
    guestInput.options[0].setAttribute('disabled', '');
    guestInput.options[1].setAttribute('disabled', '');
    guestInput.options[3].setAttribute('disabled', '');
  } else if (roomInput.value === '2') {
    guestInput.options[0].setAttribute('disabled', '');
    guestInput.options[3].setAttribute('disabled', '');
    guestInput.options[1].removeAttribute('disabled');
    guestInput.options[2].removeAttribute('disabled');
  } else if (roomInput.value === '3') {
    guestInput.options[3].setAttribute('disabled', '');
    guestInput.options[0].removeAttribute('disabled');
    guestInput.options[1].removeAttribute('disabled');
    guestInput.options[2].removeAttribute('disabled');
  } else if (roomInput.value === '100') {
    guestInput.options[0].setAttribute('disabled', '');
    guestInput.options[1].setAttribute('disabled', '');
    guestInput.options[2].setAttribute('disabled', '');
    guestInput.options[3].removeAttribute('disabled');
  }
};
