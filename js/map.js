'use strict';
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
var TIME_IN = ['12:00', '13:00', '14:00'];
var TIME_OUT = ['13:00', '14:00', '15:00'];
var FEATURES_ARRAY = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner'
];
var AD_TEMPLATE_AMOUNT = 8;
var INDEX = Math.floor(Math.random() * (3 - 1) + 1);

var pinMap = document.querySelector('.tokyo__pin-map');
var dialogHidden = document.querySelector('.dialog');
var closeIcon = dialogHidden.querySelector('.dialog__close');

var adTemplateArray = [];
var pinsToRendering = [];

for (var i = 0; i < AD_TEMPLATE_AMOUNT; i++) {
  adTemplateArray.push(createRandomAd());
}

adTemplateArray.forEach(function (offer) {
  pinsToRendering.push(createNewPin(offer));
});

renderPins(pinsToRendering);

initListeners();

function initListeners() {
  pinMap.addEventListener('click', onPinClick);
  pinMap.addEventListener('keydown', onPinKeydown);
  closeIcon.addEventListener('click', onCloseButtonClick);
  pinMap.addEventListener('keydown', onCloseButtonKeydown);
}

function onPinClick(evt) {
  var currentElement = evt.target;
  var selectedPin;
  var selectedImage;
  var activePin = document.querySelector('.pin--active');

  if (currentElement.classList.contains('pin__main') ||
      currentElement.parentNode.classList.contains('pin__main')) {

    return;
  }

  if (currentElement.classList.contains('pin')) {
    selectedPin = currentElement;
    selectedImage = currentElement.firstChild;
  } else {
    selectedImage = currentElement;
    selectedPin = currentElement.parentNode;
  }

  var imagePath = selectedImage.getAttribute('src');
  var offerObject = getOfferByImageSourcePath(imagePath);
  var newOfferCard = createNewOfferCard(offerObject);

  if (activePin) {
    activePin.classList.remove('pin--active');
  }

  dialogHidden.classList.remove('hidden');
  selectedPin.classList.add('pin--active');

  renderOfferCard(newOfferCard);

}

function getOfferByImageSourcePath(path) {
  // TODO. Переписать на find || every
  for (var j = 0; j < adTemplateArray.length; j++) {

    if (adTemplateArray[j].author.avatar === path) {

      return adTemplateArray[j];
    }
  }
}

function onPinKeydown(evt) {
  if (evt.keyCode === 13) {
    onPinClick(evt);
  }
}

function onCloseButtonClick() {
  var activePin = document.querySelector('.pin--active');

  dialogHidden.classList.add('hidden');
  activePin.classList.remove('pin--active');
}

function onCloseButtonKeydown(evt) {
  if (evt.keyCode === 27) {
    onCloseButtonClick();
  }
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
  adTemplate.offer.adress = adTemplate.location.x + ',' + adTemplate.location.y;
  adTemplate.offer.price = getRandom(1000000, 1000).toLocaleString();
  adTemplate.offer.type = getRandomType();
  adTemplate.offer.rooms = getRandom(5, 1);
  adTemplate.offer.guests = adTemplate.offer.rooms * 2;
  adTemplate.offer.checkin = TIME_IN[INDEX];
  adTemplate.offer.checkout = TIME_OUT[INDEX];
  adTemplate.offer.features = newFeatures;
  adTemplate.offer.description = '';
  adTemplate.offer.photos = [];

  return adTemplate;
}

function createNewPin(offer) {
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

function renderPins(pins) {
  var pinsContainer = document.querySelector('.tokyo__pin-map');
  var fragment = document.createDocumentFragment();

  pins.forEach(function (pin) {
    fragment.appendChild(pin);
  });

  pinsContainer.appendChild(fragment);
}

function createNewOfferCard(item) {
  document.getElementById('lodge-template').classList.remove('hidden');

  var cardTemplate = document.getElementById('lodge-template').content;
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
}

function renderOfferCard(newCard) {

  var dialog = document.querySelector('.dialog');
  var dialogPanel = dialog.querySelector('.dialog__panel');
  var newDocFragment = document.createDocumentFragment();
  newDocFragment.appendChild(newCard);

  dialog.replaceChild(newDocFragment, dialogPanel);
}

