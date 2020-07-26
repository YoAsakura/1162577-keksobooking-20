'use strict';
(function () {
  var cardTemplate = document.querySelector('#card').content;

  window.renderCard = function (data) {
    var cardElement = cardTemplate.cloneNode(true);
    cardElement.querySelector('.popup__title').textContent = data.offer.title;
    cardElement.querySelector('.popup__text--address').textContent = data.offer.address;
    cardElement.querySelector('.popup__text--price').textContent = data.offer.price + 'Р/ночь';
    cardElement.querySelector('.popup__type').textContent = window.ConstModule.TYPE_HOUSES[data.offer.type];
    cardElement.querySelector('.popup__text--capacity').textContent = data.offer.rooms + ' комнаты для ' + data.offer.guests + ' гостей';
    cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + data.offer.checkin + ', выезд до ' + data.offer.checkout;
    cardElement.querySelector('.popup__description').textContent = data.offer.description;
    cardElement.querySelector('.popup__avatar').src = data.author.avatar;
    cardElement.querySelector('.popup__features').innerHTML = '';
    cardElement.querySelector('.popup__photo').remove();


    data.offer.photos.forEach(function (photo) {
      cardElement.querySelector('.popup__photos').insertAdjacentHTML('beforeend', '<img  class="popup__photo"' + ' src="' + photo + '"' + 'width="45"' + 'height="40"' + 'alt="Фотография жилья"' + '>');
    });

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

  // функция показа карточки при нажатии на пин.
  var serverCard = function (author) {
    var allPins = window.ConstModule.pinListElement.querySelectorAll('.map__pin:not(.map__pin--main)');

    allPins.forEach(function (pin, i) {
      pin.addEventListener('click', function () {
        if (!window.ConstModule.pinListElement.querySelector('.map__card')) {
          window.ConstModule.pinListElement.prepend(window.renderCard(author[i]));
          cardDelete();
        } else {
          var card = window.ConstModule.pinListElement.querySelector('.map__card');
          card.remove();
          window.ConstModule.pinListElement.prepend(window.renderCard(author[i]));
          cardDelete();
        }
      });
    });
  };

  window.load('https://javascript.pages.academy/keksobooking/data', serverCard, window.errorHandler);
})();
