#!/usr/bin/env node

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
  folders.filter(function(folder){
    return fs.statSync(basePath + '/' + folder).isDirectory();

  }).forEach(function(folder){
    fs.readdir(basePath + '/' + folder, function(err, files){
      if(err){
        console.log(err.message + ' Holler Back');
        return;
      }

      files.filter(function(file){
        var nameArray = file.split('.'),
          postfix = nameArray[nameArray.length - 1],
          regex = /[\d]+/;

          if(regex.test(postfix)){
            console.log("we want to read file " + file + " in folder " + folder);
            return true;
          }
          console.log("we dont want to read file " + file + " in folder " + folder);
          return false;
      }).forEach(function(file){
        console.log('read the file here');
      });
    });

  });
    
     
});
