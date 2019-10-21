'use strict';

(function () {
  var PIN_SPIKE = 18;
  var PIN_SIZE = 65;
  var OFFERS_LIMIT = 5;
  var allOffers = [];

  var formDisabledFieldsets = window.form.adForm.querySelectorAll('fieldset[disabled]');
  var addressInput = window.form.adForm.querySelector('#address');
  var mapPinMain = document.querySelector('.map__pin--main');
  var typeFilterSelect = document.querySelector('#housing-type');

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

  var updateMap = function (filter, value) {
    var filteredOffers = allOffers;

    // фильтрация по типу жилья
    if (filter === typeFilterSelect) {
      if (value === 'any') {
        filteredOffers = allOffers;
      } else {
        filteredOffers = allOffers.filter(function (item) {
          return item.offer.type === value;
        });
      }
    }

    window.cards.updateCards(filteredOffers.slice(0, OFFERS_LIMIT));
    window.pins.updatePins(filteredOffers.slice(0, OFFERS_LIMIT));
  };

  var successHandler = function (offers) {
    allOffers = offers;
    updateMap();
  };

  var errorHandler = function (message) {
    var body = document.querySelector('body');
    var errorTemplate = body.querySelector('#error').content.querySelector('.error');
    var errorDiv = errorTemplate.cloneNode(true);
    var errorMsg = errorDiv.querySelector('.error__message');
    var errorBtn = errorDiv.querySelector('.error__button');

    var errorBtnClickHandler = function () {
      getOffers();
      errorDiv.remove();
      errorBtn.removeEventListener('click', errorBtnClickHandler);
    };

    errorMsg.textContent = message;
    body.append(errorDiv);

    setTimeout(function () {
      errorDiv.remove();
    }, 5000);

    errorBtn.addEventListener('click', errorBtnClickHandler);
  };

  var getOffers = function () {
    var url = 'https://js.dump.academy/keksobooking/data';
    window.backend.loadData(url, successHandler, errorHandler);
  };

  var addFilterListeners = function () {
    var typeFilterSelectHandler = function (evt) {
      updateMap(evt.target, evt.target.value);
    };

    typeFilterSelect.addEventListener('change', typeFilterSelectHandler);
  };

  var mapPinMainHandler = function () {
    getOffers();
    document.querySelector('.map').classList.remove('map--faded');
    document.querySelector('.ad-form').classList.remove('ad-form--disabled');
    addFilterListeners();

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
  window.map = {
    errorHandler: errorHandler,
    updateMap: updateMap
  };
})();
