'use strict';

/**
 * @ngdoc directive
 * @name goodjobsApp.directive:dateReadable
 * @description
 * # dateReadable
 */
angular.module('goodjobsApp')
  .directive('timeAgo', function () {
    return {
      restrict: 'A',
      dateElapsed: function(time) {
        var elapsed = new Date().getTime() - new Date(time).getTime();
        var msPerMinute = 60 * 1000;
        var msPerHour = msPerMinute * 60;
        var msPerDay = msPerHour * 24;
        var msPerMonth = msPerDay * 30;
        var msPerYear = msPerDay * 365;

        if (elapsed < msPerMinute) {
          return Math.round(elapsed / 1000) + 's';
        } else if (elapsed < msPerHour) {
          return Math.round(elapsed / msPerMinute) + 'm';
        } else if (elapsed < msPerDay) {
          return Math.round(elapsed / msPerHour) + 'h';
        } else if (elapsed < msPerMonth) {
          return Math.round(elapsed / msPerDay) + 'd';
        } else if (elapsed < msPerYear) {
          return Math.round(elapsed / msPerMonth) + 'M';
        } else {
          return Math.round(elapsed / msPerYear) + 'Y';
        }
      },
      link: function postLink(scope, element, attrs) {
        element.text('' + this.dateElapsed(attrs.date));
      }
    };
  });
