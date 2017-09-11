'use strict';

(function () {

  var AVATAR_NUMBERS_ARRAY = [
    '01',
    '02',
    '03',
    '04',
    '05',
    '06',
    '07',
    '08'
  ];
  var TITLES_ARRAY = [
    'Большая уютная квартира',
    'Маленькая неуютная квартира',
    'Огромный прекрасный дворец',
    'Маленький ужасный дворец',
    'Красивый гостевой домик',
    'Некрасивый негостеприимный домик',
    'Уютное бунгало далеко от моря',
    'Неуютное бунгало по колено в воде'
  ];
  var HOUSE_TYPE = {
    flat: 'Квартира',
    house: 'Дом',
    bungalo: 'Бунгало'
  };
  var TIME = ['12:00', '13:00', '14:00'];
  var FEATURES_ARRAY = [
    'wifi',
    'dishwasher',
    'parking',
    'washer',
    'elevator',
    'conditioner'
  ];
  var AD_TEMPLATE_AMOUNT = 8;
  var adTemplateArray = [];

  for (var i = 0; i < AD_TEMPLATE_AMOUNT; i++) {
    adTemplateArray.push(createRandomAd());
  }

  function getRandomArrayLength(array) {

    return Math.floor(Math.random() * array.length);
  }

  function getAvatarNumber() {
    var index = getRandomArrayLength(AVATAR_NUMBERS_ARRAY);
    var number = AVATAR_NUMBERS_ARRAY[index];
    AVATAR_NUMBERS_ARRAY.splice(index, 1);

    return 'img/avatars/user' + number + '.png';
  }

  function getTitle() {
    var index = getRandomArrayLength(TITLES_ARRAY);
    var titleName = TITLES_ARRAY[index];
    TITLES_ARRAY.splice(index, 1);

    return titleName;
  }

  function getRandom(max, min) {

    return Math.floor(Math.random() * (max - min) + min);
  }

  function getRandomType() {
    var type = Object.keys(HOUSE_TYPE);
    var randomType = Math.floor(Math.random() * type.length);

    return '' + type[randomType];
  }

  function shuffle(arr) {
    for (var j = arr.length - 1; j > 0; j--) {
      var rand = Math.floor(Math.random() * (j + 1));
      var temp = arr[j];
      arr[j] = arr[rand];
      arr[rand] = temp;
    }

    return arr;
  }

  function createRandomAd() {
    var adTemplate = {};
    var shuffleFeaturesArr = shuffle(FEATURES_ARRAY);
    var newFeatures = shuffleFeaturesArr.slice(1, getRandom(shuffleFeaturesArr.length, 1));

    adTemplate.author = {};
    adTemplate.author.avatar = getAvatarNumber();
    adTemplate.location = {};
    adTemplate.location.x = getRandom(900, 300);
    adTemplate.location.y = getRandom(500, 300);
    adTemplate.offer = {};
    adTemplate.offer.title = getTitle();
    adTemplate.offer.adress = (adTemplate.location.x - 10) + ',' + (adTemplate.location.y - 15);
    adTemplate.offer.price = getRandom(1000000, 1000).toLocaleString();
    adTemplate.offer.type = getRandomType();
    adTemplate.offer.rooms = getRandom(5, 1);
    adTemplate.offer.guests = adTemplate.offer.rooms * 2;
    adTemplate.offer.checkin = TIME[getRandom(3, 0)];
    adTemplate.offer.checkout = adTemplate.offer.checkin;
    adTemplate.offer.features = newFeatures;
    adTemplate.offer.description = '';
    adTemplate.offer.photos = [];

    return adTemplate;
  }

  window.data = {

    time: TIME,

    adTemplateArrayObj: adTemplateArray,

    createNewOfferCard: function (item) {
      document.querySelector('#lodge-template').classList.remove('hidden');

      var cardTemplate = document.querySelector('#lodge-template').content;
      var newCard = cardTemplate.querySelector('.dialog__panel').cloneNode(true);
      var dialogTitle = document.querySelector('.dialog__title');

      newCard.querySelector('.lodge__title').textContent = item.offer.title;
      newCard.querySelector('.lodge__address').textContent = item.offer.adress;
      newCard.querySelector('.lodge__price').textContent = item.offer.price + '/ночь';
      newCard.querySelector('.lodge__type').textContent = HOUSE_TYPE[item.offer.type];
      newCard.querySelector('.lodge__rooms-and-guests').textContent = 'Для ' + item.offer.guests + ' гостей в ' + item.offer.rooms + ' комнатах';
      newCard.querySelector('.lodge__checkin-time').textContent = 'Заезд после ' + item.offer.checkin + ', выезд до ' + item.offer.checkout;

      item.offer.features.forEach(function (feature) {
        var featureImage = document.createElement('span');
        featureImage.className = 'feature__image feature__image--' + feature;
        newCard.querySelector('.lodge__features').appendChild(featureImage);
      });

      newCard.querySelector('.lodge__description').textContent = item.offer.description;
      dialogTitle.firstChild.src = item.author.avatar;

      return newCard;
    },

    createNewPin: function (offer) {
      var pin = document.createElement('div');
      var newImg = document.createElement('img');

      pin.className = 'pin';
      pin.style.left = offer.location.x + 'px';
      pin.style.top = offer.location.y + 'px';
      pin.tabIndex = 0;

      newImg.className = 'rounded';
      newImg.src = offer.author.avatar;
      newImg.width = 40;
      newImg.height = 40;

      pin.appendChild(newImg);

      return pin;
    }
  };


})();
