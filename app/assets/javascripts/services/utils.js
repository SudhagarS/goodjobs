'use strict';

/**
 * @ngdoc service
 * @name goodjobsApp.Utils
 * @description
 * # Utils
 * Service in the goodjobsApp.
 */
angular.module('goodjobsApp')
  .service('Utils', function() {
    this.formatTags = function(unFormattedTags) {
      return _.map(unFormattedTags, (tag) => tag.text); // tags lib format is {'tags': ['text': 'a', 'text': 'b', ...]}
    };
  });
