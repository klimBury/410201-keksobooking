'use strict';
var xxArr = ['01', '02', '03', '04', '05', '06', '07', '08'];
var titleArr = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var typeArr = ['flat', 'house', 'bungalo'];
var timeIn = ['12:00', '13:00', '14:00'];
var timeOut = ['13:00', '14:00', '15:00'];
var featuresArr = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var index = Math.floor(Math.random() * (3 - 1) + 1);
function getXX() {
  return 'img/avatars/user' + xxArr[i] + '.png';
}
function getTitle() {
  var ind = Math.floor(Math.random() * (titleArr.length - 1));
  var titleName = titleArr[ind];
  titleArr.splice(ind, 1);
  return titleName;
}
function getRandom(max, min) {
  return Math.floor(Math.random() * (max - min) + min);
}
function getRandomFrom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}
function getFeaturesLength() {
  var n = Math.floor(featuresArr.length * Math.random());
  featuresArr.length = n;
  return featuresArr;
}

function getRandomAd() {
  var adTemplate = {};
  adTemplate.author = {};
  adTemplate.author.avatar = getXX();
  adTemplate.location = {};
  adTemplate.location.x = getRandom(900, 300);
  adTemplate.location.y = getRandom(900, 300);
  adTemplate.offer = {};
  adTemplate.offer.title = getTitle();
  adTemplate.offer.adress = adTemplate.location.x + ',' + adTemplate.location.y;
  adTemplate.offer.price = getRandom(1000000, 1000);
  adTemplate.offer.type = getRandomFrom(typeArr);
  adTemplate.offer.rooms = getRandom(5, 1);
  adTemplate.offer.guests = adTemplate.offer.rooms * 2;
  adTemplate.offer.checkin = timeIn[index];
  adTemplate.offer.checkout = timeOut[index];
  adTemplate.offer.features = getFeaturesLength(featuresArr);
  adTemplate.offer.description = '';
  adTemplate.offer.photos = [];
  return adTemplate;
}

var adTemplateArr = [];
for (var i = 0; i < 8; i++) {
  adTemplateArr.push(getRandomAd());
}

// var adFragment = document.createDocumentFragment();
// for (i = 0; i < 8; i++) {
//   var newDiv = document.createElement('div');
//   newDiv.className = 'pin';
//   newDiv.setAttribute('style', 'left:' + adTemplateArr[i].location.x + ' top:' + adTemplateArr[i].location.y);
//   var container = adFragment.appendChild(newDiv);
//   var newImg = document.createElement('img');
//   newImg.className = 'rounded';
//   newImg.setAttribute('src', 'author.avatar.png');
//   newImg.setAttribute('width', 40);
//   newImg.setAttribute('height', 40);
//   container.appendChild(newImg);
// }
// document.body.appendChild(adFragment);

var pinsContainer = document.querySelector('.tokyo__pin-map');
var container = pinsContainer.innerHTML + '';
adTemplateArr.forEach(function (item) {
  var template = '<div class="pin" style="left: ' + item.location.x + 'px; top:' + item.location.y + 'px"><img src=' + item.author.avatar + ' class="rounded" width="40" height="40"></div>';
  container = container + template;
});
pinsContainer.innerHTML = container;


// document.getElementById('lodge-template').classList.remove('hidden');

// var dialogTemplate = document.getElementById('dp');
var replacedDialog = document.querySelector('.dialog-panel');
var lodgeTitle = document.querySelector('.lodge__title');
lodgeTitle = getRandomAd().offer.title;
console.log(lodgeTitle);

