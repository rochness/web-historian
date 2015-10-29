var path = require('path');
var archive = require('../helpers/archive-helpers');
var fs = require('fs');
var http_helpers = require('./http-helpers');

var requestURL = {
  '/index.html': {url: '/index.html', contentType:'text/html'},
  '/': {url: '/index.html', contentType:'text/html'},
  '/styles.css': {url: '/styles.css', contentType:'text/css'},
  'public': {filepath: archive.paths.siteAssets},
  'archive': {filepath: archive.paths.archivedSites, contentType: 'text/html'}
}

var loadIndex = function(filepath, url, content_type, res) {
  var filePath = filepath + url;

  fs.readFile(filePath, function(error, content) {
    if (error) {
      res.writeHead(500);
      res.end();
    }
    else {
      res.writeHead(200, { 'Content-Type': content_type });
      res.end(content, 'utf-8');
    }
  });
}

exports.handleRequest = function (req, res) {

  console.log(req.method + ' req url: ' + req.url);

  if(requestURL[req.url]){
    loadIndex(requestURL['public'].filepath, requestURL[req.url].url, requestURL[req.url].contentType, res);
  } else if (archive.isUrlArchived(req.url)){
    console.log('found in archives');
    loadIndex(requestURL['archive'].filepath, req.url, requestURL[req.url].contentType, res);


  }


  //if POST request
    //isURLArchived(post body data)
      //return its file
    //isUrlInList
      //please wait message
    //addURLToList
    //please wait message
};

// exports.readListOfUrls = function() {
// };

// exports.isUrlInList = function() {
// };

// exports.addUrlToList = function() {
// };

// exports.isUrlArchived = function() {
// };

// exports.downloadUrls = function() {
// };

