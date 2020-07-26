'use strict';
(function () {
  var LEFT_MOUSE_BUTTON = 0;

  var activePin = document.querySelector('.map__pin--main');
  var map = document.querySelector('.map');
  var pinListElement = document.querySelector('.map__pins');
  var allFieldset = document.querySelectorAll('fieldset, select');

  allFieldset.forEach(function (fieldElement) {
    fieldElement.setAttribute('disabled', 'disabled');
  });

  var activePageFunc = function () {
    allFieldset.forEach(function (fieldElement) {
      fieldElement.removeAttribute('disabled');
    });

    map.classList.remove('map--faded');
    document.querySelector('.ad-form').classList.remove('ad-form--disabled');

    var allPins = pinListElement.querySelectorAll('.map__pin:not(.map__pin--main)');
    allPins.forEach(function (pin) {
      pin.style.display = 'block';
    });
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
})();
