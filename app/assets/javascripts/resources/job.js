'use strict';

angular.module('goodjobsApp')
  .factory('Job', ['$resource', 'appUrl', function ($resource, appUrl) {
    return $resource(appUrl + '/api/v1/jobs/:id', {id: '@id'}, {
      get: { 
        method: 'GET', 
        cache: true
      },
      update: {
        method: 'PUT'
      },
      comments: {
        method: 'GET',
        isArray: true,
        url: appUrl + '/api/v1/jobs/:id/comments'
      },
      addComment: {
        method: 'POST',
        url: appUrl + '/api/v1/jobs/:id/comments'
      },
      applications: {
        method: 'GET',
        isArray: true,
        url: appUrl + '/api/v1/jobs/:id/applications'
      },
      apply: {
        method: 'POST',
        url: appUrl + '/api/v1/jobs/:id/applications'
      }
    });
  }]);
