'use strict';

/**
 * @ngdoc service
 * @name goodjobsFrontendApp.jobStore
 * @description
 * # jobStore
 * Service in the goodjobsFrontendApp.
 */
angular.module('goodjobsApp')
  .service('JobStore', ['Job', 'elemsPerPage', '$routeParams', function (Job, elemsPerPage, $routeParams) {
    var self = this;
    var page = 1;

    var jobs = [];

    self.getJobs = function() {
      return jobs;
    };

    self.load = function() {
      return Job.query({page: page}).$promise
        .then((data) => {
          jobs = jobs.concat(data);
          page += 1;
          return Promise.resolve({jobs: jobs, moreAvailable: data.length === elemsPerPage});
        }, () => Promise.reject());
    };

    self.save = function(job_) {
      return new Job.save(job_).$promise.then(function(job) {
        jobs.unshift(job);
        return Promise.resolve(job);
      });
    };

    self.update = function(job) {
      var jobIndex  = _.findIndex(jobs, {id: job.id});
      return Job.update(job).$promise
        .then((data) => {
          jobs[jobIndex] = data;
          return Promise.resolve(job);
        });
    };

    self.delete = function(job) {
      var jobId = job.id;
      return Job.delete({id: jobId}).$promise
        .then((data) => {
          _.remove(jobs, {id: jobId});
          return Promise.resolve();
        });
    };

    self.findJobInView = function(onSuccess) {
      var id_ = parseInt($routeParams.id);
      if (!id_) {
        return Promise.resolve(); // job will be undefined for receiver
      }

      var job  = _.find(jobs, {id: id_});
      if (job) {
        return Promise.resolve(job);
      } else {
        return Job.get({id: id_}).$promise;
      }
    };

    self.incrApplicationsCount = function(job_id) {
      var job = _.find(jobs, {id: job_id});
      job.applications_count += 1;
    };

  }]);
