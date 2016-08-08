'use strict';

/**
 * @ngdoc service
 * @name goodjobsApp.JobSearchService
 * @description
 * # JobSearchService
 * Service in the goodjobsApp.
 */
angular.module('goodjobsApp')
  .service('JobSearchService', ['$location', 'Job', 'elemsPerPage', function ($location, Job, elemsPerPage) {
    var self = this;
    var searchPage = 1;
    var searchResults = [];

    self.search = function() {
      return Job.query({query:self.getSearchQuery(), page: searchPage}).$promise
        .then((results) => {
          searchResults = searchResults.concat(results);
          searchPage += results.length !== 0 ? 1 : 0;
          return Promise.resolve({results: searchResults, moreAvailable: results.length === elemsPerPage});
        }); 
    };

    self.searchModeOn = function(query) {
      self.setSearchQuery(query);
      // when searching with search already on
      self.clearSearchResults();
      self.resetSearchPage();
    };

    self.searchModeOff = function() {
      self.setSearchQuery(null);
      self.clearSearchResults();
      self.resetSearchPage();
    };

    self.getSearchQuery = function() {
      return $location.search().q;
    };

    self.setSearchQuery = function(q) {
      $location.search('q', q);
    };

    self.isSearchModeOn = function() {
      return $location.search().q;
    };

    self.getSearchResults = function() {
      return searchResults;
    };

    self.clearSearchResults = function() {
      searchResults = [];
    };

    self.resetSearchPage = function() {
      searchPage = 1;
    };
  }]);
