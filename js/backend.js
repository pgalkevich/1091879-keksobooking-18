'use strict';

(function () {
  var loadData = function (url, onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onSuccess(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Превышен лимит ожидания ответа от сервера');
    });
    xhr.timeout = 10000;
    xhr.open('GET', url);
    xhr.send();
  };

  window.backend = {
    loadData: loadData
  };
})();
