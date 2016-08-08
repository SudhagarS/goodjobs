'use strict';

/**
 * @ngdoc function
 * @name goodjobsApp.controller:NewJobCtrl
 * @description
 * # NewJobCtrl
 * Controller of the goodjobsApp
 */
angular.module('goodjobsApp')
  .controller('JobFormCtrl', ['$window', '$location', 'JobStore', 'Utils', function (window, location, jobStore, utils) {
    var self = this;
    this.flags = {};
    this.flags.submitting = false;
    this.errors = {};
    this.errors.errorOnSubmit = false;

    jobStore.findJobInView()
      .then((job) => self.job = job);

    this.submitJobForm = function() {  
      this.flags.submitting = true;
      this.job.tags = utils.formatTags(this.job.tags);

      var submitAction = this.job.id ? jobStore.update : jobStore.save;
      var navigateAction =  this.job.id ? () => window.history.back() : (jobWithId) => location.path('jobs/' + jobWithId.id);

      submitAction(this.job).then((jobWithId)  => {
          navigateAction(jobWithId);
        }, () => {
          self.errors.errorOnSubmit = true;
        })
        .then(() => self.flags.submitting = false);
    };
  }]);
