'use strict';
(function () {
  var pinTemplate = document.querySelector('#pin').content;

  window.renderPin = function (data) {
    var pinElement = pinTemplate.cloneNode(true);
    pinElement.querySelector('.map__pin').style.display = 'none';
    pinElement.querySelector('img').src = data.author.avatar;
    pinElement.querySelector('img').alt = data.offer.title;
    pinElement.querySelector('.map__pin').style.left = data.location.x + 'px';
    pinElement.querySelector('.map__pin').style.top = data.location.y + 'px';

    return pinElement;
  };
})();
