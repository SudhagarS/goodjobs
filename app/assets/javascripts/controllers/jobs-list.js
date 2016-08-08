'use strict';

angular.module('goodjobsApp')
  .controller('JobsListCtrl', ['$location', 'JobStore', 'JobSearchService', 'Utils', function (location, jobStore, jobSearchService, utils) {
    var self = this;

    this.flags = {};
    this.flags.loading = false;
    this.flags.moreAvailable = false;
    this.flags.loadError = false;

    this.search = function() {
      if (this.query) {
        jobSearchService.searchModeOn(this.query.trim());
        self.loadSearchResults();
      } else {
        this.clearSearch();
      }
    };

    this.searchByTag = function(tag, event) {
      this.query = 'tags:' + tag; 
      this.search(); 
      event.stopPropagation();
    };

    this.loadSearchResults = function() {
      jobSearchService.search().then((data) => {
        self.flags.loading = false;
        self.jobs = data.results;
        self.flags.moreAvailable = data.moreAvailable;
      });
    };

    this.clearSearch = function() {
      this.query = '';
      jobSearchService.searchModeOff();
      this.getJobsFromStore();
    };

    this.loadJobs = function () {
      jobStore.load()
        .then((data) => {
          self.flags.loading = false;
          self.flags.moreAvailable = data.moreAvailable;
          self.jobs = data.jobs;        
        }, () => self.flags.loadError = true);
    };

    this.loadMore = function() {
      this.loading = true;
      if (jobSearchService.isSearchModeOn()) {
        this.loadSearchResults();
      } else {
        this.loadJobs();
      }
    };

    this.load = function() {
      if (jobSearchService.isSearchModeOn()) {
        this.query = jobSearchService.getSearchQuery();
        this.jobs = jobSearchService.getSearchResults();
        if (this.jobs.length === 0) {
          this.flags.loading = true;
          this.loadSearchResults();
        }
      } else {
        this.getJobsFromStore();
      }
    };

    this.getJobsFromStore = function() {
      this.jobs = jobStore.getJobs();
      if (this.jobs.length === 0) {
          this.flags.loading = true;
          this.loadJobs();
      }
    };

    this.viewJob = function(jobId) {
      location.path('jobs/' + jobId);
    };

    this.load();
  }]);
