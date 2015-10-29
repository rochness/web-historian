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
  //'archive': {filepath: '/Users/student/2015-10-web-historian/test/testdata/sites/', contentType: 'text/html'}
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
      archive.isUrlArchived(
        data,
        function(found, loadIndex) {
          if(found) {
            loadIndex(requestURL['archive'].filepath, data, requestURL['archive'].contentType, res);
          } else {
            archive.isUrlInList(data, function(found) {
              console.log('isURLInList: ', found);
              if(!found) {
                archive.addUrlToList(data, function() {
                  console.log('URL added to list');
                });
              }
            });
            loadIndex(requestURL['public'].filepath, '/loading.html', 'text/html', res);
          }
        },
        loadIndex
        )

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
          //check if the url is in the list
          archive.isUrlInList(req.url, function(found) {
            //if it is, send to loading page
            if(found) {
              loadIndex(requestURL['public'].filepath, '/loading.html', 'text/html', res);
            } else {
            res.writeHead(404);
            res.end('404 error, this webpage could not be found');
            }
          });
        }
      }, 
      loadIndex
    );
  }
};



