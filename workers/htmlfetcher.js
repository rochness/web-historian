#!/usr/local/bin/node
// Use the code in `archive-helpers.js` to actually download the urls
// that are waiting.
var archive = require('../helpers/archive-helpers');
var fs = require('fs');
var path = require('path');
var _ = require('underscore');
var http = require('http-request');


archive.readListOfUrls(archive.downloadUrls);