'use strict';

/**
 * @ngdoc overview
 * @name goodjobsFrontendApp
 * @description
 * # goodjobsFrontendApp
 *
 * Main module of the application.
 */
angular
  .module('goodjobsApp', [
    'ngResource',
    'ngRoute',
    'naif.base64',
    'ngTagsInput',
    'btford.markdown',
    'templates'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/jobs', {
        templateUrl: 'jobs-list.html',
        controller: 'JobsListCtrl',
        reloadOnSearch: false,
        controllerAs: 'jobsList'
      })
      .when('/jobs/:id', {
        templateUrl: 'job-perma.html',
        controller: 'JobPermaCtrl',
        controllerAs: 'jobPerma'
      })
      .when('/new-job', {
        templateUrl: 'job-form.html',
        controller: 'JobFormCtrl',
        controllerAs: 'jobForm'
      })
      .when('/jobs/:id/edit', {
        templateUrl: 'job-form.html',
        controller: 'JobFormCtrl',
        controllerAs: 'jobForm'
      })
      .when('/jobs/:id/applications', {
        templateUrl: 'applications-list.html',
        controller: 'ApplicationsListCtrl',
        controllerAs: 'applsList'
      })
      .otherwise({
        redirectTo: '/jobs'
      });
  })
  .config(function(tagsInputConfigProvider) {
    tagsInputConfigProvider
      .setDefaults('tagsInput', {
        placeholder: '',
        minLength: 2,
      })
      .setDefaults('autoComplete', {
        debounceDelay: 200,
        loadOnDownArrow: true,
        loadOnEmpty: true
      });
  });

angular.module('goodjobsApp')
  // .constant('appUrl', 'http://139.59.7.100:58742')
  .constant('appUrl', '')
  .constant('elemsPerPage', 10)
  .run(['$rootScope','appUrl', 'elemsPerPage', function ($rootScope, appUrl, elemsPerPage) {
    // if needed in views
    $rootScope.appUrl = appUrl;
    $rootScope.elemsPerPage = elemsPerPage;
  }]);
