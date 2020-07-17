'use strict';
(function () {
  var cardTemplate = document.querySelector('#card').content;

  window.renderCard = function (data) {
    var cardElement = cardTemplate.cloneNode(true);
    cardElement.querySelector('.popup__title').textContent = data.offer.title;
    cardElement.querySelector('.popup__title').textContent = data.offer.title;
    cardElement.querySelector('.popup__text--address').textContent = data.offer.adress;
    cardElement.querySelector('.popup__text--price').textContent = data.offer.price + 'Р/ночь';
    cardElement.querySelector('.popup__type').textContent = window.ConstModule.TYPE_HOUSES[data.offer.type];
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

  // Функция удаления карточки.
  var cardDelete = function () {
    var card = window.ConstModule.pinListElement.querySelector('.map__card');
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

  var allPins = window.ConstModule.pinListElement.querySelectorAll('.map__pin:not(.map__pin--main)');

  // функция показа карточки при нажатии на пин.
  allPins.forEach(function (pin, i) {
    pin.addEventListener('click', function () {
      if (!window.ConstModule.pinListElement.querySelector('.map__card')) {
        window.ConstModule.pinListElement.prepend(window.renderCard(window.offerModule.offer[i]));
        cardDelete();
      } else {
        var card = window.ConstModule.pinListElement.querySelector('.map__card');
        card.remove();
        window.ConstModule.pinListElement.prepend(window.renderCard(window.offerModule.offer[i]));
        cardDelete();
      }
    });
  });
})();
