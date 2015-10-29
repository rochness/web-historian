var path = require('path');
var archive = require('../helpers/archive-helpers');
var fs = require('fs');
var http_helpers = require('./http-helpers');

var requestURL = {
  '/index.html': {url: '/index.html', contentType:'text/html'},
  '/': {url: '/index.html', contentType:'text/html'},
  '/styles.css': {url: '/styles.css', contentType:'text/css'},
  'public': {filepath: archive.paths.siteAssets},
  //'archive': {filepath: archive.paths.archivedSites, contentType: 'text/html'}
  'archive': {filepath: '/Users/student/2015-10-web-historian/test/testdata/sites', contentType: 'text/html'}
}

var loadIndex = function(filepath, url, content_type, res) {
  var filePath = filepath + url;

  fs.readFile(filePath, function(error, content) {
    //console.log('filepath: ', filePath);
    if (error) {
      res.writeHead(404);
      res.end();
      //console.log('error on ', res);
    }
    else {
      res.writeHead(200, { 'Content-Type': content_type });
      //console.log('content:', content.toString('utf-8'));
      res.end(content, 'utf-8');
    }
  });
}

exports.handleRequest = function (req, res) {

  console.log(req.method + ' req url: ' + req.url);

  if(req.method === 'POST'){
    var data = '';
    req.on('data', function(chunks){
      data += chunks;
    });
    req.on('end', function(){
      res.writeHead(302, {'Content-Type': 'text/html'});
      data = data.slice(4);
      fs.writeFile(requestURL['archive'].filepath+'.txt', data + "\n");
      res.end();
      console.log('post data: ', data.slice(4));
    });

  } else if(requestURL[req.url]){
    loadIndex(requestURL['public'].filepath, requestURL[req.url].url, requestURL[req.url].contentType, res);
  } else {
    archive.isUrlArchived(
      req.url, 
      function(found, loadIndex) {
        if(found) {
          loadIndex(requestURL['archive'].filepath, req.url, requestURL['archive'].contentType, res);
        } else {
          res.writeHead(404);
          res.end();
        }
      }, 
      loadIndex
    );
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

