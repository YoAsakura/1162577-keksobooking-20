'use strict';
(function () {

  var successHandler = function (author) {
    var pinListElement = document.querySelector('.map__pins');
    var fragment = document.createDocumentFragment();

    for (var c = 0; c < 8; c++) {
      fragment.appendChild(window.renderPin(author[c]));
    }

    pinListElement.appendChild(fragment);
  };

  window.load('https://javascript.pages.academy/keksobooking/data', successHandler, window.errorHandler);
})();
