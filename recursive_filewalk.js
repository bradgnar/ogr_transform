#!/usr/bin/env node

var fs = require('fs')
	ogr2ogr = require('ogr2ogr');

function walk(path){
	var stats = fs.statSync(path);

	if(stats.isFile()){
		if(isCorrectFileType(path)){

			console.log('reading the file ' + path);

			var ogr = ogr2ogr(path)
						.skipfailures()
						.stream();
			ogr.on('error', console.error);
			ogr.pipe(process.stdout);
			ogr.on('end',function(){

			});
			//ogr.pipe(fs.createWriteStream(geoJsonPath(path)));
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

function geoJsonPath(path){
	var pathArray = path.split('/'),
		file = pathArray[pathArray.length-1],
		nameArray = file.split('.'),
      	postfix = nameArray[nameArray.length - 1],
      	newPath = nameArray[0] + postfix + '.json';
console.log(newPath);
      return newPath;
}

walk('/home/bradgnar/ENC_ROOT/US5NC18M');