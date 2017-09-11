'use strict';

(function () {

  var checkinTime = document.querySelector('#timein');
  var checkoutTime = document.querySelector('#timeout');

  var syncValues = function (element, value) {
    element.value = value;
  };

  var selectToSync = document.querySelector('#room_number');
  selectToSync.onchange = function () {
    sync(this, 'capacity');
  };

  var selectCapacityToSync = document.querySelector('#capacity');
  selectCapacityToSync.onchange = function () {
    sync(this, 'room_number');
  };

  checkinTime.addEventListener('change', function (evt) {
    window.synchronizeFields(evt.target, checkoutTime, window.data.time, window.data.time, syncValues);
  });

  checkoutTime.addEventListener('change', function (evt) {
    window.synchronizeFields(evt.target, checkinTime, window.data.time, window.data.time, syncValues);
  });


  function getMinPrice(val) {

    switch (val) {
      case 'flat':
        document.querySelector('#price').value = 1000;
        document.querySelector('#price').min = 1000;
        break;
      case 'bungalo':
        document.getElementById('price').value = 0;
        break;
      case 'house':
        document.getElementById('price').value = 5000;
        document.getElementById('price').min = 5000;
        break;
      case 'palace':
        document.getElementById('price').value = 10000;
        document.getElementById('price').min = 10000;
        break;
    }
  }

  document.getElementById('type').onchange = function () {
    getMinPrice(this.options[this.selectedIndex].value);
  };
})();
