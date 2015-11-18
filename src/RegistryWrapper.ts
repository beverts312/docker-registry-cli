'use strict';
import IRegistryWrapper = require('./interfaces/IRegistryWrapper');
import ImageCatalog = require('./models/ImageCatalog');
import TagsList = require('./models/TagsList');
import Manifest = require('./models/Manifest');

import https = require('https');

class RegistryWrapper implements IRegistryWrapper {
	url:string;
   	port:number;
	   
	constructor(url:string, port:number){
		this.url = url;
		this.port = port;
	}
	
	getCatalog(callback:(err:Error, result:ImageCatalog)=>void){
		var options = {
  			host: this.url,
 			port: this.port,
  			path: '/v2/_catalog',
  			method: 'GET',
			rejectUnauthorized: false
		};

		https.request(options, (res) => {
  			res.setEncoding('utf8');
			var str = '';
  			res.on('data', (chunk) => {
    			str += chunk;
  			});
			res.on('end', () =>{
				callback(null, <ImageCatalog> JSON.parse(str));
			});
		}).end();	
	}	
	
	getTags(image:string, callback:(err:Error, result:TagsList)=>void){
		var options = {
  			host: this.url,
 			port: this.port,
  			path: '/v2/' + image + '/tags/list',
  			method: 'GET',
			rejectUnauthorized: false
		};
		
		https.request(options, (res) => {
  			res.setEncoding('utf8');
			var str = '';
  			res.on('data', (chunk) => {
    			str += chunk;
  			});
			res.on('end', () =>{
				callback(null, <TagsList> JSON.parse(str));
			});
		}).end();								
	}
	
	getManifest(image:string, tag:string, callback:(err:Error, result:Manifest)=>void){
		var options = {
  			host: this.url,
 			port: this.port,
  			path: '/v2/' + image + '/manifests/' + tag,
  			method: 'GET',
			rejectUnauthorized: false
		};

		https.request(options, (res) => {
  			res.setEncoding('utf8');
			var str = '';
  			res.on('data', (chunk) => {
    			str += chunk;
  			});
			res.on('end', () =>{
				callback(null, <Manifest> JSON.parse(str));
			});
		}).end();					
	}
	
}
export = RegistryWrapper;