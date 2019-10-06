'use strict';

(function () {
  var PIN_SPIKE = 18;
  var PIN_SIZE = 65;

  var formDisabledFieldsets = window.form.adForm.querySelectorAll('fieldset[disabled]');
  var addressInput = window.form.adForm.querySelector('#address');
  var mapPinMain = document.querySelector('.map__pin--main');

  var getMapPinAddress = function (el) {
    var elX = Math.floor(+el.style.left.slice(0, -2) + (PIN_SIZE / 2) + PIN_SPIKE);
    var elY = Math.floor(+el.style.top.slice(0, -2) + PIN_SIZE + PIN_SPIKE);

    if (elY < 130) {
      elY = 130;
    } else if (elY > 630) {
      elY = 630;
    }

    if (elX < PIN_SIZE / 2) {
      elX = PIN_SIZE / 2;
    } else if (elX > (window.pins.pinsContainerWidth - PIN_SIZE / 2)) {
      elX = window.pins.pinsContainerWidth - PIN_SIZE / 2;
    }

    addressInput.value = elX + ', ' + elY;
  };
  getMapPinAddress(mapPinMain);

  var mapPinMainHandler = function () {
    document.querySelector('.map').classList.remove('map--faded');
    document.querySelector('.ad-form').classList.remove('ad-form--disabled');
    formDisabledFieldsets.forEach(function (item) {
      item.disabled = false;
    });
  };

  mapPinMain.addEventListener('mousedown', mapPinMainHandler);
  mapPinMain.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.utils.KEY_CODES.ENTER || evt.keyCode === window.utils.KEY_CODES.SPACE) {
      mapPinMainHandler();
    }
  });
})();
