'use strict';

(function () {
  var adForm = document.querySelector('.ad-form');
  var priceInput = adForm.querySelector('#price');
  var typeInput = adForm.querySelector('#type');
  var timeInInput = adForm.querySelector('#timein');
  var timeOutInput = adForm.querySelector('#timeout');

  // Валидация стоимости жилья в зависимости от типа
  var typeInputHandler = function () {
    var inputValue = typeInput.value;
    var min = 0;
    switch (inputValue) {
      case 'bungalo':
        min = 0;
        break;
      case 'flat':
        min = 1000;
        break;
      case 'house':
        min = 5000;
        break;
      case 'palace':
        min = 10000;
        break;
    }
    priceInput.min = min;
    priceInput.placeholder = min;
  };
  typeInput.addEventListener('change', typeInputHandler);
  // <-- Валидация стоимости жилья в зависимости от типа -->

  // Валидация времени въезда и выезда
  var timeInputHandler = function (value) {
    timeInInput.value = timeOutInput.value = value;
  };
  timeInInput.addEventListener('change', function (evt) {
    timeInputHandler(evt.target.value);
  });
  timeOutInput.addEventListener('change', function (evt) {
    timeInputHandler(evt.target.value);
  });
  // <-- Валидация времени въезда и выезда -->

  // Валидация комнат и гостей
  var roomsInput = adForm.querySelector('#room_number');
  var capacityInput = adForm.querySelector('#capacity');

  var roomsInputHandler = function (val) {
    var maxCapacity = +val;
    var options = capacityInput.querySelectorAll('option');
    var optionsSortedArr = [];

    for (var i = 0; i < options.length; i++) {
      optionsSortedArr.push(capacityInput.querySelector('option[value="' + i + '"]'));
    }

    if (maxCapacity === 100) {
      for (i = 1; i < options.length; i++) {
        optionsSortedArr[i].disabled = true;
      }
      capacityInput.value = 0;
      optionsSortedArr[0].disabled = false;
      return;
    }

    capacityInput.value = maxCapacity;

    options.forEach(function (item) {
      item.disabled = false;
    });

    for (i = maxCapacity; i < options.length - 1; i++) {
      optionsSortedArr[i + 1].disabled = true;
    }
    optionsSortedArr[0].disabled = true;
  };

  roomsInput.addEventListener('change', function (evt) {
    roomsInputHandler(evt.target.value);
  });
  // <-- Валидация комнат и гостей -->

  window.form = {
    adForm: adForm
  };
})();
