'use strict';

angular.module('goodjobsApp')
  .factory('Comment', ['$resource', 'appUrl', function ($resource, appUrl) {
    return $resource(appUrl + '/api/v1/comments/:id', {id: '@id'}, {
      update: {
        method: 'PUT'
      },
      addReply: {
        method: 'POST',
        url: appUrl + '/api/v1/comments/:id/replies'
      }
    });
  }]);
