'use strict';

(function () {
  var pinsContainerWidth = document.querySelector('.map__pins').clientWidth;
  var DATA_COUNT = 8;
  var TYPES = ['palace', 'flat', 'house', 'bungalo'];
  var CHECK_TIMES = ['12:00', '13:00', '14:00'];
  var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var PHOTOS_LINKS = [
    'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel3.jpg',
  ];
  var i;
  var generateOffersData = function (n) {
    var arr = [];

    for (i = 1; i <= n; i++) {
      var obj = {};
      var objFeaturesArr = FEATURES.slice();
      var objFeatures = [];
      var featuresCount = window.utils.getRandomNumber(1, objFeaturesArr.length);

      for (var k = 0; k < featuresCount; k++) {
        var feature = objFeaturesArr.splice(window.utils.getRandomNumber(0, objFeaturesArr.length), 1);
        objFeatures.push(feature);
      }

      obj.author = {};
      obj.author.avatar = 'img/avatars/user0' + i + '.png';
      obj.offer = {};
      obj.offer.title = 'Квартира №' + i;
      obj.offer.address = window.utils.getRandomNumber(1, 999) + ', ' + window.utils.getRandomNumber(1, 999);
      obj.offer.price = window.utils.getRandomNumber(1, 9) * 100;
      obj.offer.type = TYPES[window.utils.getRandomNumber(0, TYPES.length)];
      obj.offer.rooms = window.utils.getRandomNumber(1, 5);
      obj.offer.guests = window.utils.getRandomNumber(1, 10);
      obj.offer.checkin = CHECK_TIMES[window.utils.getRandomNumber(0, CHECK_TIMES.length)];
      obj.offer.checkout = CHECK_TIMES[window.utils.getRandomNumber(0, CHECK_TIMES.length)];
      obj.offer.features = objFeatures;
      obj.offer.description = 'Описание №' + i;
      obj.offer.photos = PHOTOS_LINKS;
      obj.location = {};
      obj.location.x = window.utils.getRandomNumber(0, pinsContainerWidth);
      obj.location.y = window.utils.getRandomNumber(130, 630);
      arr.push(obj);
    }
    return arr;
  };

  window.offers = generateOffersData(DATA_COUNT);
})();
