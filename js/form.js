'use strict';

(function () {

  var checkinTime = document.querySelector('#timein');
  var checkoutTime = document.querySelector('#timeout');

  function syncValues(element, value) {
    element.value = value;
  }

  checkinTime.addEventListener('change', function (evt) {
    window.synchronizeFields(evt.target, checkoutTime, window.data.time, window.data.time, syncValues);
  });

  checkoutTime.addEventListener('change', function (evt) {
    window.synchronizeFields(evt.target, checkinTime, window.data.time, window.data.time, syncValues);
  });

  var apartmentType = document.querySelector('#type');
  var pricePerNight = document.querySelector('#price');

  function syncValueWithMin(element, value) {
    element.value = value;
    element.min = value;
  }

  apartmentType.addEventListener('change', function (evt) {
    window.synchronizeFields(evt.target, pricePerNight, ['flat', 'bungalo', 'house', 'palace'], [1000, 0, 5000, 10000], syncValueWithMin);
  });

})();
