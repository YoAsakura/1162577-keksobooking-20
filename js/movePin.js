'use strict';

// Функция перетаскивания пина.
(function () {
  var adressInput = document.querySelector('#address');
  var activePin = document.querySelector('.map__pin--main');
  var LEFT_MOUSE_BUTTON = 0;
  var MAIN_PIN_WIDTH = 65;

  activePin.addEventListener('mousedown', function (evt) {
    if (evt.button === LEFT_MOUSE_BUTTON) {
      evt.preventDefault();

      var startCoords = {
        x: evt.clientX,
        y: evt.clientY
      };

      var dragged = false;
      var onMouseMove = function (moveEvt) {
        moveEvt.preventDefault();

        dragged = true;

        var shift = {
          x: startCoords.x - moveEvt.clientX,
          y: startCoords.y - moveEvt.clientY
        };

        startCoords = {
          x: moveEvt.clientX,
          y: moveEvt.clientY
        };

        if ((activePin.offsetTop - shift.y) >= window.ConstModule.COORDINATE_MIN_Y && (activePin.offsetTop - shift.y) <= window.ConstModule.COORDINATE_MAX_Y) {
          activePin.style.top = (activePin.offsetTop - shift.y) + 'px';
        } else {
          if ((activePin.offsetTop - shift.y) <= window.ConstModule.COORDINATE_MIN_Y) {
            activePin.style.top = window.ConstModule.COORDINATE_MIN_Y + 'px';
          } else {
            activePin.style.top = window.ConstModule.COORDINATE_MAX_Y + 'px';
          }
        }

        if ((activePin.offsetLeft - shift.x) >= window.ConstModule.COORDINATE_MIN_X - (MAIN_PIN_WIDTH / 2) && (activePin.offsetLeft - shift.x) <= (window.ConstModule.COORDINATE_MAX_X - (MAIN_PIN_WIDTH / 2))) {
          activePin.style.left = (activePin.offsetLeft - shift.x) + 'px';
        } else {
          if ((activePin.offsetLeft - shift.x) <= window.ConstModule.COORDINATE_MIN_X) {
            activePin.style.left = window.ConstModule.COORDINATE_MIN_X - (MAIN_PIN_WIDTH / 2) + 'px';
          } else {
            activePin.style.left = window.ConstModule.COORDINATE_MAX_X - (MAIN_PIN_WIDTH / 2) + 'px';
          }
        }
      };

      var onMouseUp = function (upEvt) {
        upEvt.preventDefault();
        adressInput.value = (parseInt(activePin.style.left, 10) + MAIN_PIN_WIDTH) + ', ' + (parseInt(activePin.style.top, 10) + window.ConstModule.PIN_HEIGHT);
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);

        if (dragged) {
          var onClickPreventDefault = function (clickEvt) {
            clickEvt.preventDefault();
            activePin.removeEventListener('click', onClickPreventDefault);
          };
          activePin.addEventListener('click', onClickPreventDefault);
        }
      };

      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    }
  });
})();
