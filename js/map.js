'use strict';
(function () {
  var pinListElement = document.querySelector('.map__pins');

  var offer = [];
  var NUMBER_PIN = 8;
  for (var c = 0; c < NUMBER_PIN; c++) {
    offer.push(window.ConstModule.selectObject());
    pinListElement.appendChild(window.renderPin(offer[c]));
  }

  window.offerModule = {
    offer: offer
  };
})();
