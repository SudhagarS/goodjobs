'use strict';

angular.module('goodjobsApp')
  .controller('CommentsCtrl', ['JobStore', 'Job', 'Comment', 'Reply', function (jobStore, Job, Comment, Reply) {
    var self = this;
    this.flags = {};
    this.flags.commentSubmitting = false;
    this.flags.replySubmitting = false;
    this.errors = {};
    var userNames = ['Venux', 'Mercury', 'Earth', 'Gem', 'Portrait', 'Promise', 'Fox', 'Candy'];

    this.addErrorToCollElems = function (collection) {
      return _.map(collection, (coll) => {
        coll.errors = {};
        return coll;
      });
    };

    this.addErrorToCommentsAndReplies = function(comments) {
      comments = self.addErrorToCollElems(comments);
      comments = _.map(comments, (cmt) => {
        cmt.replies = self.addErrorToCollElems(cmt.replies);
        return cmt;
      });
      return comments;
    };

    this.omitExtras = function(obj) {
      obj = _.omit(obj, 'errors'); // omit returns new obj
      obj = _.omit(obj, 'flags');
      return obj;
    };

    this.loadCommentsAndReplies = function() {
      jobStore.findJobInView().then((job) => {
        self.job = job;
        Job.comments({'id': self.job.id}, (comments) => {
          self.comments = self.addErrorToCommentsAndReplies(comments);
        });
      });  
    };

    this.addComment = function() {
      this.flags.commentSubmitting = true;
      var comment = {user: userNames[Math.floor(Math.random() * userNames.length)], 
                     text: this.commentForm.text};
      var onCommentAdded = function(comment) {
        comment.errors = {};
        self.comments = self.comments.concat(comment);
        self.commentForm.text = '';
        self.flags.commentSubmitting = false;
        self.errors.errorOnNewCommentSubmit = false;
      };
      var onCommentAddFailed = function() {
        self.flags.commentSubmitting = false;
        self.errors.errorOnNewCommentSubmit = true;
      };
      Job.addComment({'id': this.job.id}, comment, onCommentAdded, onCommentAddFailed);
    };

    this.deleteComment = function(comment) {
      new Comment(comment).$delete(() => {
        _.remove(self.comments, {id: comment.id});
        comment.errors.errorOnDelete = false;
      }, () => {
        comment.errors.errorOnDelete = true;
      });
    };

    this.editComment = function(comment) {
      new Comment(comment).$update(() => {
        comment.flags.editing = false;
        comment.errors.errorOnUpdate = false;
      }, () => {
        comment.errors.errorOnUpdate = true;
      });
    };

    this.addReply = function(comment) {
      this.replySubmitting = true;
      var user = userNames[Math.floor(Math.random() * userNames.length)];
      Comment.addReply({'id': comment.id}, {user: user, text: comment.replyText}, (reply) => {
        reply.errors = {};
        comment.replies.push(reply);
        comment.replyText = '';
        comment.errors.errorOnReplySubmit = false;
        self.flags.replySubmitting = false;
      }, () => {
        comment.errors.errorOnReplySubmit = true;
        self.flags.replySubmitting = false;
      });
    };

    this.deleteReply = function(comment, replyIndex) {
      var reply = comment.replies[replyIndex];
      new Reply(reply).$delete(() => {
        comment.replies.splice(replyIndex, 1);
        reply.errors.errorOnDelete = false;
      }, () => {
        reply.errors.errorOnDelete = true;
      });
    };

    this.editReply = function(comment, replyIndex) {
      var reply = comment.replies[replyIndex];
      new Reply(reply).$update(() => {
        reply.editing = false;
        reply.errors.errorOnUpdate = false;
      }, () => {
        reply.errors.errorOnUpdate = true;
      });
    };

    self.loadCommentsAndReplies();
  }]);
