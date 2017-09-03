'use strict';

(function () {

  window.card = {
    renderOfferCard: function (newCard) {

      var dialog = document.querySelector('.dialog');
      var dialogPanel = dialog.querySelector('.dialog__panel');
      var newDocFragment = document.createDocumentFragment();
      newDocFragment.appendChild(newCard);

      dialog.replaceChild(newDocFragment, dialogPanel);
    }
  };
})();
