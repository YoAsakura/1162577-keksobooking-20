'use strict';

// Валидация форм
(function () {
  var MAX_PRICE = 1000000;
  var MIN_PRICE = 0;
  var START_COORDS_ACTIVE_PIN_Y = 375;
  var START_COORDS_ACTIVE_PIN_X = 570;

  var priceInput = document.querySelector('#price');
  var typeHouseInput = document.querySelector('#type');
  var roomInput = document.querySelector('#room_number');
  var guestInput = document.querySelector('#capacity');

  var adressInput = document.querySelector('#address');
  var activePin = document.querySelector('.map__pin--main');
  adressInput.value = (parseInt(activePin.style.left, 10) + window.ConstModule.PIN_WIDTH / 2) + ', ' + (parseInt(activePin.style.top, 10) + window.ConstModule.PIN_HEIGHT);


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

  // синхронизация полей время заезда и выезда
  var timeInInput = document.querySelector('#timein');
  var timeOutInput = document.querySelector('#timeout');

  timeInInput.onchange = function () {
    if (timeInInput.value === '12:00') {
      timeOutInput.options[1].setAttribute('disabled', '');
      timeOutInput.options[2].setAttribute('disabled', '');
      timeOutInput.options[0].removeAttribute('disabled');
    } else if (timeInInput.value === '13:00') {
      timeOutInput.options[0].setAttribute('disabled', '');
      timeOutInput.options[2].setAttribute('disabled', '');
      timeOutInput.options[1].removeAttribute('disabled');
    } else if (timeInInput.value === '14:00') {
      timeOutInput.options[0].setAttribute('disabled', '');
      timeOutInput.options[1].setAttribute('disabled', '');
      timeOutInput.options[2].removeAttribute('disabled');
    }
  };

  // Отправка формы и возвращение страницы в исходное состояние
  var form = document.querySelector('.ad-form');
  var map = document.querySelector('.map');
  var allFieldset = document.querySelectorAll('fieldset, select');
  var pinListElement = document.querySelector('.map__pins');
  var formResetButton = document.querySelector('.ad-form__reset');

  var submitHandler = function (evt) {
    window.save(new FormData(form), function () {
      document.querySelector('.ad-form').classList.add('ad-form--disabled');
      allFieldset.forEach(function (fieldElement) {
        fieldElement.setAttribute('disabled', 'disabled');
      });
      map.classList.add('map--faded');
      var allPins = pinListElement.querySelectorAll('.map__pin:not(.map__pin--main)');
      allPins.forEach(function (pin) {
        pin.style.display = 'none';
      });
      form.reset();
      activePin.style.top = START_COORDS_ACTIVE_PIN_Y + 'px';
      activePin.style.left = START_COORDS_ACTIVE_PIN_X + 'px';
      activePin.reset();
    });
    evt.preventDefault();
  };

  formResetButton.addEventListener('click', function () {
    form.reset();
  });

  form.addEventListener('submit', submitHandler);
})();
