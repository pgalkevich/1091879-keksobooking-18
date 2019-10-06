'use strict';

(function () {
  var KEY_CODES = {
    ENTER: 13,
    ESC: 27,
    SPACE: 32,
  };

  var getRandomNumber = function (min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  };

  window.utils = {
    KEY_CODES: KEY_CODES,
    getRandomNumber: getRandomNumber
  };
})();
