'use strict';
var avatarNumbersArray = [
  '01',
  '02',
  '03',
  '04',
  '05',
  '06',
  '07',
  '08'
];
var titlesArray = [
  'Большая уютная квартира',
  'Маленькая неуютная квартира',
  'Огромный прекрасный дворец',
  'Маленький ужасный дворец',
  'Красивый гостевой домик',
  'Некрасивый негостеприимный домик',
  'Уютное бунгало далеко от моря',
  'Неуютное бунгало по колено в воде'
];
var typesArray = [
  'flat',
  'house',
  'bungalo'
];
var timeIn = ['12:00', '13:00', '14:00'];
var timeOut = ['13:00', '14:00', '15:00'];
var featuresArray = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner'
];
var AD_TEMPLATE_AMOUNT = 8;
var FEATURES_ARRAY_LENGTH = 5;
var INDEX = Math.floor(Math.random() * (3 - 1) + 1);

function getAvatarNumber() {
  return 'img/avatars/user' + avatarNumbersArray[i] + '.png';
}
function getTitle() {
  var index = Math.floor(Math.random() * (titlesArray.length - 1));
  var titleName = titlesArray[index];
  titlesArray.splice(index, 1);
  return titleName;
}
function getRandom(max, min) {
  return Math.floor(Math.random() * (max - min) + min);
}
function getRandomFrom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}
function getFeaturesLength(arr) {
  var n = Math.floor(FEATURES_ARRAY_LENGTH * Math.random());
  arr.length = n;
  return arr;
}
function getRandomAd() {
  var adTemplate = {};
  adTemplate.author = {};
  adTemplate.author.avatar = getAvatarNumber();
  adTemplate.location = {};
  adTemplate.location.x = getRandom(900, 300);
  adTemplate.location.y = getRandom(500, 300);
  adTemplate.offer = {};
  adTemplate.offer.title = getTitle();
  adTemplate.offer.adress = adTemplate.location.x + ',' + adTemplate.location.y;
  adTemplate.offer.price = getRandom(1000000, 1000);
  adTemplate.offer.type = getRandomFrom(typesArray);
  adTemplate.offer.rooms = getRandom(5, 1);
  adTemplate.offer.guests = adTemplate.offer.rooms * 2;
  adTemplate.offer.checkin = timeIn[INDEX];
  adTemplate.offer.checkout = timeOut[INDEX];
  adTemplate.offer.features = getFeaturesLength(featuresArray);
  adTemplate.offer.description = '';
  adTemplate.offer.photos = [];
  return adTemplate;
}

var adTemplateArray = [];
for (var i = 0; i < AD_TEMPLATE_AMOUNT; i++) {
  adTemplateArray.push(getRandomAd());
}

function createNewPin(offer) {
  var pin = document.createElement('div');
  var newImg = document.createElement('img');
  pin.className = 'pin';
  pin.setAttribute('style', 'left: ' + offer.location.x + 'px; top: ' + offer.location.y + 'px');
  newImg.className = 'rounded';
  newImg.src = offer.author.avatar;
  newImg.width = 40;
  newImg.height = 40;
  pin.appendChild(newImg);
  return pin;
}

function renderPins() {
  var pinsContainer = document.querySelector('.tokyo__pin-map');
  var fragment = document.createDocumentFragment();
  adTemplateArray.forEach(function (offer) {
    fragment.appendChild(createNewPin(offer));
  });
  pinsContainer.appendChild(fragment);
}
renderPins(adTemplateArray);

document.getElementById('lodge-template').classList.remove('hidden');
// var card = document.getElementById('lodge-template');
var newCard = document.querySelector('.dialog__panel');
adTemplateArray.forEach(function (item) {
  newCard.querySelector('.lodge__title').textContent = item.offer.title;
  newCard.querySelector('.lodge__address').textContent = item.offer.adress;
  newCard.querySelector('.lodge__price').textContent = item.offer.price + '/ночь';
  if (item.offer.type === 'flat') {
    newCard.querySelector('.lodge__type').textContent = 'Квартира';
  } if (item.offer.type === 'house') {
    newCard.querySelector('.lodge__type').textContent = 'Дом';
  } else {
    newCard.querySelector('.lodge__type').textContent = 'Бунгало';
  }
  newCard.querySelector('.lodge__rooms-and-guests').textContent = 'Для ' + item.offer.guests + ' гостей в ' + item.offer.rooms + ' комнатах';
  newCard.querySelector('.lodge__checkin-time').textContent = 'Заезд после ' + item.offer.checkin + ', выезд до ' + item.offer.checkout;
  item.offer.features.forEach(function (feature) {
    var span = document.createElement('span');
    span.className = 'feature__image feature__image--' + feature;
    newCard.querySelector('.lodge__features').appendChild(span);
  });
  newCard.querySelector('.lodge__description').textContent = item.offer.description;
  document.getElementById('avt').src = item.author.avatar;
});
// var replacedCard = document.querySelector('.dialog__panel');
// document.getElementById('offer-dialog').replaceChild(newCard, replacedCard);

