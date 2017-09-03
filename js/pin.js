'use strict';

(function () {

  var pinsToRendering = [];

  window.data.adTemplateArrayObj.forEach(function (offer) {
    pinsToRendering.push(window.data.createNewPin(offer));
  });

  renderPins(pinsToRendering);

  function renderPins(pins) {
    var pinsContainer = document.querySelector('.tokyo__pin-map');
    var fragment = document.createDocumentFragment();

    pins.forEach(function (pin) {
      fragment.appendChild(pin);
    });

    pinsContainer.appendChild(fragment);
  }
})();
