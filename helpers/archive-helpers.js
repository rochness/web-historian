var fs = require('fs');
var path = require('path');
var _ = require('underscore');

/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths = {
  siteAssets: path.join(__dirname, '../web/public'),
  archivedSites: path.join(__dirname, '../archives/sites'),
  list: path.join(__dirname, '../archives/sites.txt')
};

exports.modifiedUrl = function(url){
  if(url.charAt(0) === '/'){
    return url.slice(1);
  } else {
    return url;
  }
};
// Used for stubbing paths for tests, do not modify
exports.initialize = function(pathsObj) {
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

exports.readListOfUrls = function(cb) {
  fs.readFile(this.paths.list, function(error, content){
    if(error){
      return 'error';
    } else {
      content = content.toString('utf-8').split("\n");
      cb(content);
    }
  });
};

exports.isUrlInList = function(url, cb) {
  var url = this.modifiedUrl(url);
  this.readListOfUrls(function(content){
    if(content.indexOf(url) === -1){
      cb(false);
    } else {
      cb(true);
    }
  });  
};

exports.addUrlToList = function(url, cb) {
  fs.writeFile(this.paths.list, this.modifiedUrl(url));
  cb();
};

exports.isUrlArchived = function(url, cb, innerCb) {
  var url = this.modifiedUrl(url);
  fs.readdir(this.paths.archivedSites, function(error, files){
    if(error){
      return 'error';
    } else {
      if(files.indexOf(url) === -1){
        cb(false, innerCb);
      } else{
        cb(true, innerCb);
      }
    }
  });
};



exports.downloadUrls = function() {
  //get length of content array to slice off later
  var contentLength = content.length;
  //iterate through array in list (call readListOfUrls)
  var that = this;
  this.readListOfUrls(function(content){
    _.each(content, function(url){
      $.ajax({
        url: url,
        type: 'GET',
        data: JSON.stringify(html),
        contentType: 'application/json',
        success: function (data) {
          var fd = fs.open(that.path.archivedSites, "w");
          fs.write(fd, url);
          fs.close(fd);
          fs.writeFile(that.path.archivedSites, data );
        },
        error: function (data) {
          // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
          console.error('chatterbox: Failed to send message');
        }
      });
    })
  })
  
    //submit ajax request for each URL
      //write response content to a file and save in archives
      //remove url from list
};
