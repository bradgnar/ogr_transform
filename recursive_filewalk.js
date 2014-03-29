#!/usr/bin/env node

var fs = require('fs')
	ogr2ogr = require('ogr2ogr');

function walk(path){
	var stats = fs.statSync(path);

	if(stats.isFile()){
		if(isCorrectFileType(path)){
			console.log('reading the file ' + path);
		}
	}else if(stats.isDirectory()){
		fs.readdir(path, function(err, newPaths){
			if(err){
				console.log(err.message);
				return;
			}
			newPaths.forEach(function(newPath){
				walk(path + '/' + newPath);
			});
		});
	}else{
		console.log('sumpin happened');
	}
}

function isCorrectFileType(path){
	var pathArray = path.split('/'),
		file = pathArray[pathArray.length-1],
		nameArray = file.split('.'),
      	postfix = nameArray[nameArray.length - 1],
      	regex = /[\d]+/;

	    if(regex.test(postfix)){
	    	console.log("we want to read file " + file);
	        return true;
	    }
	    console.log("we dont want to read file " + file);
	    return false;
}

walk('/home/bradgnar/ENC_ROOT');