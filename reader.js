#!/usr/bin/env node
"use strict"

var fs = require('fs'),
	exec = require('child_process').exec,
	basepath,
	fileName,
	fileBeingRead,
	fileBeingWritten,
	child;

function walk(path){
	var stats = fs.statSync(path),
		pathObj,
		execString;

	if(stats.isFile()){
		if(isCorrectFileType(path)){

			//console.log(path);
			pathObj = makePaths(path);

			execString = 'ogr2ogr -skipfailures -f "GeoJSON" ' + pathObj.newFile + ' ' + pathObj.fileName;
			child = exec(execString, {cwd: pathObj.basePath}, function(error, stdout, stderr){
				if(error){
					console.log(error.message);
					next();
				}
				console.log(stdout + "stdout");
				console.log(stderr + "stderr")
			});
		}
	}else if(stats.isDirectory()){
		fs.readdir(path, function(err, newPaths){
			if(err){
				// console.log(err.message);
				return;
			}
			newPaths.forEach(function(newPath){
				walk(path + '/' + newPath);
			});
		});
	}else{
		// console.log('sumpin happened');
	}
}

function isCorrectFileType(path){
	var pathArray = path.split('/'),
		file = pathArray[pathArray.length-1],
		nameArray = file.split('.'),
      	postfix = nameArray[nameArray.length - 1],
      	regex = /[\d]+/;

	    if(regex.test(postfix)){
	    	// console.log("we want to read file " + file);
	        return true;
	    }
	    // console.log("we dont want to read file " + file);
	    return false;
}

function geoJsonPath(path){
	var pathArray = path.split('/'),
		file = pathArray[pathArray.length-1],
		nameArray = file.split('.'),
      	postfix = nameArray[nameArray.length - 1],
      	newPath = nameArray[0] + postfix + '.json';
// console.log(newPath);
      return newPath;
}

function makePaths(path){
	var pathArray = path.split('/'),
		basePath,
		f,
		returnable = {};

	returnable.basePath = path.substring(0, path.lastIndexOf('/'));
	returnable.fileName = path.substring(path.lastIndexOf('/')+1);
	f = returnable.fileName
	returnable.newFile = f.substring(0, f.lastIndexOf('.')).concat(f.substring(f.lastIndexOf('.')+1), '.json');

	return returnable;
}

walk('/home/bradgnar/ENC_ROOT');