'use strict';

angular.module('goodjobsApp')
  .controller('JobPermaCtrl', ['$location', '$routeParams', '$window', 'JobStore', 'Job', function (location, params, window, jobStore, Job) {
    var self = this;
    this.flags = {};
    this.flags.applicationSubmitting = false;

    this.loadJob = function() {
      jobStore.findJobInView().then((job) => self.job = job);  
    };

    this.deleteJob = function() {
      jobStore.delete(this.job).then(() => location.path('jobs/'));
    };

    this.editJob = function() {
      location.path('jobs/' + self.job.id + '/edit');
    };

    this.submitApplication = function() {
      this.flags.applicationSubmitting = true;
      var resume = this.applicationForm.resume;
      this.applicationForm.resume = `data${resume.filetype};base64,${resume.base64}`;
      Job.apply({'id': this.job.id}, this.applicationForm, function() {
        self.flags.applySectionOpen = false;
        self.flags.applicationSubmitting = false;
        self.flags.submissionSuccess = true;
        self.clearApplicationForm();
      });
    };

    this.clearApplicationForm = function() {
      this.applicationForm.user = '';
      this.applicationForm.cover_letter = '';
    };

    this.goBackToJobsView = function() {
      window.history.back();
    };

    this.loadJob();
  }]);
