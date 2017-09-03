'use strict';

(function () {

  function sync(el1, el2) {

    if (!el1) {

      return false;
    } else {

      var value = el1.value;
      var syncWith = document.getElementById(el2);
      var options = syncWith.getElementsByTagName('option');

      for (var j = 0; j < options.length; j++) {

        if (options[j].value === value) {
          options[j].selected = true;
        }
      }
    }

    return options.selected;
  }

  var selectToSync = document.getElementById('room_number');
  selectToSync.onchange = function () {
    sync(this, 'capacity');
  };

  var selectCapacityToSync = document.getElementById('capacity');
  selectCapacityToSync.onchange = function () {
    sync(this, 'room_number');
  };

  var timeToSync = document.getElementById('timein');
  timeToSync.onchange = function () {
    sync(this, 'timeout');
  };

  var timeOutToSync = document.getElementById('timeout');
  timeOutToSync.onchange = function () {
    sync(this, 'timein');
  };


  function getMinPrice(val) {

    switch (val) {
      case 'flat':
        document.getElementById('price').value = 1000;
        document.getElementById('price').min = 1000;
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
