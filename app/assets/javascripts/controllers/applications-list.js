'use strict';

angular.module('goodjobsApp')
  .controller('ApplicationsListCtrl', ['JobStore', 'Job', function (jobStore, Job) {
    var self = this;
    this.flags = {};
    this.flags.loading = false;

    this.loadApplications = function() {
      Job.applications({id: this.job.id}, function(applications) {
        self.applications = applications;
        self.flags.loading = false;
      });
    };

    this.load = function() {
      this.flags.loading = true;
      jobStore.findJobInView().then(function(job) {
        self.job = job;
        self.loadApplications();
      });  
    };

    this.load();
  }]);
