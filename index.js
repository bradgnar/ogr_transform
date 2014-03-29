#!/usr/bin/env node
"use strict"
//make both the recursive and non recursive versions
//this is going to recursively read a whole bunch of files that are not in 
var fs = require('fs'),
	basePath = '/home/bradgnar/ENC_ROOT';

console.log('starting the program to transfor the data');

fs.readdir(basePath, function(err, folders){
  if(err){
    console.log(err.message+'HOLLER');
    return;
  }
  folders.forEach(function(folder){
    console.log(folder);

    
    fs.readdir(basePath + '/' + folder, function(err, files){
      if(err){
        console.log(err.message + ' Holler Back');
        return;
      }
      files.forEach(function(file){
        var nameArray = file.split('.'),
        	postfix = nameArray[nameArray.length - 1],
        	regex = /[\d]+/;

       	  if(regex.test(postfix)){
       	  	console.log("we want to read file " + file + " in folder " + folder);
       	  }

      });
    });
  });
});