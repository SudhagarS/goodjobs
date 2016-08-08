'use strict';

angular.module('goodjobsApp')
  .factory('Reply', ['$resource', 'appUrl', function ($resource, appUrl) {
    return $resource(appUrl + '/api/v1/replies/:id', {id: '@id'}, {
      update: {
        url: appUrl + '/api/v1/replies/:id',
        method: 'PUT'
      }
    });
  }]);
