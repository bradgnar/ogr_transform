#!/usr/bin/env node
"use strict"

var fs = require('fs'),
	exec = require('child_process').exec,
	filewalker = require('filewalker'),
	mv = require('mv'),
	basepath = '/home/bradgnar/ENC_ROOT',
	xml_fileholder = '/home/bradgnar/ENC_ROOT/all_xml_files',
	fileName,
	fileBeningRead,
	fileBeingWritten,
	child,
	options = {
		maxPending: 10
	};

console.log(process.cwd());
process.chdir(basepath);


filewalker('.', options)
	.on('dir', function(p){
		//console.log('dir: %s', p);
	})
	.on('file', function(relPath, stats, absPath){		
		var pathObj,
			execString;

		if(isCorrectFileType(absPath)){
			pathObj = makePaths(absPath);

			execString = 'ogr2ogr -skipfailures -f "kml" ' + pathObj.newFile + ' ' + pathObj.fileName;
			child = exec(execString, {cwd: pathObj.basePath}, function(error, stdout, stderr){
				if(error){
					console.log(error.message + 'DDDDDDDD');
					next();
				}			
			});
			mv(pathObj.basePath + '/' + pathObj.newFile, xml_fileholder + '/' + pathObj.newFile, {mkdirp: true}, function(err) {
				if(err){
					console.error(err.message);
				}
			});
		}

	})
	.on('error', function(err){
		console.error(err);
	})
	.on('done', function(){
		console.log('jogga what');
	})
	.walk();



function isCorrectFileType(path){
	var pathArray = path.split('/'),
		file = pathArray[pathArray.length-1],
		nameArray = file.split('.'),
      	postfix = nameArray[nameArray.length - 1],
      	regex = /000/;

    if(regex.test(postfix)){
        return true;
    }
    return false;
}


function makePaths(path){
	var pathArray = path.split('/'),
		basePath,
		f,
		returnable = {};

	returnable.basePath = path.substring(0, path.lastIndexOf('/'));
	returnable.fileName = path.substring(path.lastIndexOf('/')+1);
	f = returnable.fileName
	returnable.newFile = f.substring(0, f.lastIndexOf('.')).concat(f.substring(f.lastIndexOf('.')+1), '.xml');

	return returnable;
}