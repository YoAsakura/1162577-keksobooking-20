'use strict';
(function () {
  window.load = function (url, onLoad, onError) {
    var xhr = new XMLHttpRequest();

    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onLoad(xhr.response);
      } else {
        onError('Cтатус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = 10000; // 10s

    xhr.open('GET', url);
    xhr.send();
  };

  window.errorHandler = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  var link = 'https://javascript.pages.academy/keksobooking';
  var errorTemplate = document.querySelector('#error').content;
  var successTemplate = document.querySelector('#success').content;
  var mainElement = document.querySelector('main');

  window.save = function (data, onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';


    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        var successPopup = successTemplate.cloneNode(true);
        mainElement.append(successPopup);

        var successPopupElement = document.querySelector('.success');

        successPopupElement.addEventListener('click', function () {
          successPopupElement.remove();
        });

        var onSuccessPopupEscPress = function (evt) {
          if (evt.key === 'Escape') {
            evt.preventDefault();
            successPopupElement.remove();
            document.removeEventListener('keydown', onSuccessPopupEscPress);
          }
        };

        document.addEventListener('keydown', onSuccessPopupEscPress);

        onSuccess(xhr.response);
      } else {
        var errorPopup = errorTemplate.cloneNode(true);
        mainElement.append(errorPopup);

        var errorPopupElement = document.querySelector('.error');
        var errorCloseButton = errorPopupElement.querySelector('.error__button');

        errorPopupElement.addEventListener('click', function () {
          errorPopupElement.remove();
        });

        errorCloseButton.addEventListener('click', function () {
          errorPopupElement.remove();
        });

        var onErrorPopupEscPress = function (evt) {
          if (evt.key === 'Escape') {
            evt.preventDefault();
            errorPopupElement.remove();
            document.removeEventListener('keydown', onErrorPopupEscPress);
          }
        };

        document.addEventListener('keydown', onErrorPopupEscPress);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.open('POST', link);
    xhr.send(data);
  };

  var randomInteger = function (min, max) {
    var rand = min + Math.random() * (max - min);
    return Math.floor(rand);
  };

  var getRandomArray = function (arr) {
    var newArray = [];
    for (var i = 0; i < randomInteger(0, arr.length); i++) {
      newArray.push(arr[i]);
    }

    return newArray;
  };

  window.MathModule = {
    randomInteger: randomInteger,
    getRandomArray: getRandomArray
  };
})();
