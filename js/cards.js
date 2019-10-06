'use strict';

(function () {
  var openedCard = '';

  var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');
  var renderCard = function (obj, index) {
    var cardElement = cardTemplate.cloneNode(true);

    cardElement.querySelector('.popup__title').textContent = obj.offer.title;
    cardElement.querySelector('.popup__text--address').textContent = obj.offer.address;
    cardElement.querySelector('.popup__text--price').textContent = obj.offer.price + '₽/ночь';
    cardElement.setAttribute('data-id', index);

    // алгоритм вывода типа оффера на русском в карточку
    var objOfferType = obj.offer.type;
    var popupType;
    switch (objOfferType) {
      case 'flat':
        popupType = 'Квартира';
        break;
      case 'bungalo':
        popupType = 'Бунгало';
        break;
      case 'house':
        popupType = 'Дом';
        break;
      case 'palace':
        popupType = 'Дворец';
        break;
      default:
        popupType = 'Неизвестно';
    }
    cardElement.querySelector('.popup__type').textContent = popupType;

    cardElement.querySelector('.popup__text--capacity').textContent = obj.offer.rooms + ' комнаты для ' + obj.offer.guests + ' гостей';
    cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + obj.offer.checkin + ', выезд до ' + obj.offer.checkout;
    cardElement.querySelector('.popup__description').textContent = obj.offer.description;
    cardElement.querySelector('.popup__avatar').src = obj.author.avatar;

    // вывод доступных фич в соответствующие блоки
    var featuresContainer = cardElement.querySelector('.popup__features');
    var featuresTags = '';
    var offerFeatures = obj.offer.features;
    for (var k = 0; k < offerFeatures.length; k++) {
      featuresTags += '<li class="popup__feature popup__feature--' + offerFeatures[k] + '"></li>';
    }
    featuresContainer.innerHTML = featuresTags;

    // вывод фотографий в блоке через <img>
    var imgTags = '';
    var objPhotos = obj.offer.photos;
    for (k = 0; k < objPhotos.length; k++) {
      imgTags += '<img src="' + objPhotos[k] + '" class="popup__photo" width="45" height="40" alt="Фотография жилья">';
    }
    cardElement.querySelector('.popup__photos').innerHTML = imgTags;

    return cardElement;
  };

  var cardsFragment = document.createDocumentFragment();

  var cardEscHandler = function (evt) {
    if (evt.keyCode === window.utils.KEY_CODES.ESC) {
      closeCard(openedCard);
    }
  };

  var openCard = function (index) {
    if (openedCard) {
      openedCard.classList.add('hidden');
    }
    var card = document.querySelector('article[data-id="' + index + '"]');
    card.classList.remove('hidden');
    document.addEventListener('keydown', cardEscHandler);
    openedCard = card;
  };

  var closeCard = function (card) {
    card.classList.add('hidden');
    openedCard = '';
    document.removeEventListener('keydown', cardEscHandler);
  };

  for (var i = 0; i < window.offers.length; i++) {
    var cardElement = renderCard(window.offers[i], i);
    var cardElementCloseBtn = cardElement.querySelector('.popup__close');
    cardElementCloseBtn.addEventListener('click', function (evt) {
      var card = evt.target;
      closeCard(card.closest('article'));
    });
    cardsFragment.appendChild(cardElement);
  }

  var cards = document.createElement('div');
  cards.classList.add('map-cards');
  cards.appendChild(cardsFragment);
  document.querySelector('.map__filters-container').insertAdjacentElement('beforeBegin', cards);

  window.cards = {
    openCard: openCard,
  };
})();
