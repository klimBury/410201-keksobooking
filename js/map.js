'use strict';

(function () {

  var pinMap = document.querySelector('.tokyo__pin-map');
  var dialogHidden = document.querySelector('.dialog');
  var closeIcon = dialogHidden.querySelector('.dialog__close');


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
    var newOfferCard = window.data.createNewOfferCard(offerObject);

    if (activePin) {
      activePin.classList.remove('pin--active');
    }

    dialogHidden.classList.remove('hidden');
    selectedPin.classList.add('pin--active');

    window.card.renderOfferCard(newOfferCard);

  }

  function getOfferByImageSourcePath(path) {
  // TODO. Переписать на find || every
    for (var j = 0; j < window.data.adTemplateArrayObj.length; j++) {

      if (window.data.adTemplateArrayObj[j].author.avatar === path) {

        return window.data.adTemplateArrayObj[j];
      }
    }

    return window.data.adTemplateArrayObj[j];
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

  var pinHandle = pinMap.querySelector('.rounded');
  var divPinHandle = pinHandle.parentNode;
  var tokyo = document.querySelector('.tokyo');
  var adressElement = document.querySelector('#address');

  pinHandle.addEventListener('mousedown', function (evt) {
    evt.preventDefault();


    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    function onMouseMove(moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      var xCord = divPinHandle.offsetLeft - shift.x;
      var yCord = divPinHandle.offsetTop - shift.y;

      setMainPinPosition(divPinHandle, xCord, yCord);

      setAddressField(xCord, yCord);

    }

    function onMouseUp(upEvt) {
      upEvt.preventDefault();

      tokyo.removeEventListener('mousemove', onMouseMove);
      tokyo.removeEventListener('mouseup', onMouseUp);
    }

    tokyo.addEventListener('mousemove', onMouseMove);
    tokyo.addEventListener('mouseup', onMouseUp);
  });

  function setMainPinPosition(pinElement, x, y) {

    var width = 75;

    pinElement.style.top = y + 'px';
    pinElement.style.left = x + 'px';

    var maxMinCoords = {
      minPositionX: Math.floor(width / 2),
      maxPositionX: Math.floor(1200 - width / 2),
      minPositionY: 80,
      maxPositionY: 550
    };

    if (pinElement.offsetTop <= maxMinCoords.minPositionY) {
      pinElement.style.top = maxMinCoords.minPositionY + 'px';
    }

    if (pinElement.offsetTop >= maxMinCoords.maxPositionY) {
      pinElement.style.top = maxMinCoords.maxPositionY + 'px';
    }

    if (pinElement.offsetLeft <= maxMinCoords.minPositionX) {
      pinElement.style.left = -width / 2 + 'px';
    }

    if (pinElement.offsetLeft >= maxMinCoords.maxPositionX) {
      pinElement.style.left = maxMinCoords.maxPositionX + 'px';
    }

  }

  function setAddressField(x, y) {
    adressElement.value = 'x: ' + x + ', ' + 'y: ' + y;
  }

})();
