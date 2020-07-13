'use strict';
(function () {
  var pinListElement = document.querySelector('.map__pins');

  var offer = [];
  var NUMBER_PIN = 8;
  for (var c = 0; c < NUMBER_PIN; c++) {
    offer.push(window.selectObject());
    pinListElement.appendChild(window.renderPin(offer[c]));
  }

  var allPins = pinListElement.querySelectorAll('.map__pin:not(.map__pin--main)');

  // функция показа карточки при нажатии на пин.
  allPins.forEach(function (pin, i) {
    pin.addEventListener('click', function () {
      if (!pinListElement.querySelector('.map__card')) {
        pinListElement.prepend(window.renderCard(offer[i]));
        cardDelete();
      } else {
        var card = pinListElement.querySelector('.map__card');
        card.remove();
        pinListElement.prepend(window.renderCard(offer[i]));
        cardDelete();
      }
    });
  });

  // Функция удаления карточки.
  var cardDelete = function () {
    var card = pinListElement.querySelector('.map__card');
    var buttonClose = card.querySelector('.popup__close');
    buttonClose.addEventListener('click', function () {
      card.remove();
    });

    var onPopupEscPress = function (evt) {
      if (evt.key === 'Escape') {
        evt.preventDefault();
        card.remove();
        document.removeEventListener('keydown', onPopupEscPress);
      }
    };

    document.addEventListener('keydown', onPopupEscPress);
  };
})();
