'use strict';

(function () {
  var DATA_COUNT = 8;
  var TYPES = ['palace', 'flat', 'house', 'bungalo'];
  var CHECK_TIMES = ['12:00', '13:00', '14:00'];
  var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var PHOTOS_LINKS = [
    'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
  ];
  var pinsContainer = document.querySelector('.map__pins');
  var pinsContainerWidth = pinsContainer.clientWidth;

  var getRandomNumber = function (min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  };

  var generateOffersData = function (n) {
    var arr = [];

    for (var i = 1; i <= n; i++) {
      var obj = {};
      var objFeaturesArr = FEATURES.slice();
      var objFeatures = [];
      var featuresCount = getRandomNumber(1, objFeaturesArr.length);

      for (var k = 0; k < featuresCount; k++) {
        var feature = objFeaturesArr.splice(getRandomNumber(0, objFeaturesArr.length), 1);
        objFeatures.push(feature);
      }

      obj.author = {};
      obj.author.avatar = 'img/avatars/user0' + i + '.png';
      obj.offer = {};
      obj.offer.title = 'Квартира №' + i;
      obj.offer.address = getRandomNumber(1, 999) + ', ' + getRandomNumber(1, 999);
      obj.offer.price = getRandomNumber(1, 9) * 100;
      obj.offer.type = TYPES[getRandomNumber(0, TYPES.length)];
      obj.offer.rooms = getRandomNumber(1, 5);
      obj.offer.guests = getRandomNumber(1, 10);
      obj.offer.checkin = CHECK_TIMES[getRandomNumber(0, CHECK_TIMES.length)];
      obj.offer.checkout = CHECK_TIMES[getRandomNumber(0, CHECK_TIMES.length)];
      obj.offer.features = objFeatures;
      obj.offer.description = 'Описание №' + i;
      obj.offer.photos = PHOTOS_LINKS;
      obj.location = {};
      obj.location.x = getRandomNumber(0, pinsContainerWidth);
      obj.location.y = getRandomNumber(130, 630);
      arr.push(obj);
    }
    return arr;
  };

  var offers = generateOffersData(DATA_COUNT);
  document.querySelector('.map').classList.remove('map-faded');

  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var renderPin = function (obj) {
    var pinElement = pinTemplate.cloneNode(true);
    var pinElementImg = pinElement.querySelector('img');
    pinElement.style.left = (obj.location.x - (pinElementImg.width / 2)) + 'px';
    pinElement.style.top = (obj.location.y - pinElementImg.height) + 'px';
    pinElementImg.src = obj.author.avatar;
    pinElementImg.alt = obj.offer.title;

    return pinElement;
  };

  var pinsFragment = document.createDocumentFragment();
  for (var i = 0; i < offers.length; i++) {
    pinsFragment.appendChild(renderPin(offers[i]));
  }

  pinsContainer.appendChild(pinsFragment);

  // тут начинается код для карточек
  var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');
  var renderCard = function (obj) {
    var cardElement = cardTemplate.cloneNode(true);

    cardElement.querySelector('.popup__title').textContent = obj.offer.title;
    cardElement.querySelector('.popup__text--address').textContent = obj.offer.address;
    cardElement.querySelector('.popup__text--price').textContent = obj.offer.price + '₽/ночь';

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
    for (var i = 0; i < offerFeatures.length; i++) {
      featuresTags += '<li class="popup__feature popup__feature--' + offerFeatures[i] + '"></li>';
    }
    featuresContainer.innerHTML = featuresTags;

    // вывод фотографий в блоке через <img>
    var imgTags = '';
    var objPhotos = obj.offer.photos;
    for (var i = 0; i < objPhotos.length; i++) {
      imgTags += '<img src="' + objPhotos[i] + '" class="popup__photo" width="45" height="40" alt="Фотография жилья">';
    }
    cardElement.querySelector('.popup__photos').innerHTML = imgTags;

    return cardElement;
  };

  var cardsFragment = document.createDocumentFragment();
  for (var i = 0; i < offers.length; i++) {
    cardsFragment.appendChild(renderCard(offers[i]));
  }

  var cards = document.createElement('div');
  cards.classList.add('map-cards');
  cards.appendChild(cardsFragment);
  document.querySelector('.map__filters-container').insertAdjacentElement('beforeBegin', cards);
})();
