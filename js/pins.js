'use strict';

(function () {
  var pinsContainer = document.querySelector('.map__pins');
  var pinsContainerWidth = pinsContainer.clientWidth;

  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var renderPin = function (obj) {
    var pinElement = pinTemplate.cloneNode(true);
    pinElement.setAttribute('tabindex', 0);
    var pinElementImg = pinElement.querySelector('img');
    pinElement.style.left = (obj.location.x - (pinElementImg.width / 2)) + 'px';
    pinElement.style.top = (obj.location.y - pinElementImg.height) + 'px';
    pinElementImg.src = obj.author.avatar;
    pinElementImg.alt = obj.offer.title;

    return pinElement;
  };

  var addPinClickListener = function (index, el) {
    el.addEventListener('click', function () {
      window.cards.openCard(index);
    });
  };
  var addPinKeydownListener = function (index, el) {
    el.addEventListener('keydown', function (evt) {
      if (evt.keyCode === window.utils.KEY_CODES.ENTER || evt.keyCode === window.utils.KEY_CODES.SPACE) {
        window.cards.openCard(index);
      }
    });
  };

  var pinsFragment = document.createDocumentFragment();
  for (var i = 0; i < window.offers.length; i++) {
    var pinElement = renderPin(window.offers[i]);
    addPinClickListener(i, pinElement);
    addPinKeydownListener(i, pinElement);
    pinsFragment.appendChild(pinElement);
  }

  pinsContainer.appendChild(pinsFragment);

  window.pins = {
    pinsContainerWidth: pinsContainerWidth
  };
})();
