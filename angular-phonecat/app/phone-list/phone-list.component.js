'use strict';

// Register `phoneList` component, along with its associated controller and template
angular.
  module('phoneList').
  component('phoneList', {
    templateUrl: 'phone-list/phone-list.template.html',
    controller: ['Phone',
      function PhoneListController(Phone) {
        const vm = this
        // this.query= ""
        vm.phones = Phone.query();
        vm.orderProp = 'age';
      }
    ]
  });
