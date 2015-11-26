'use strict';
import IRegistryWrapper = require('./interfaces/IRegistryWrapper');
import ImageCatalog = require('./models/ImageCatalog');
import TagsList = require('./models/TagsList');
import Manifest = require('./models/Manifest');
import Registry = require('./models/Registry');
import Options = require('./models/Options');

import https = require('https');

class RegistryWrapper implements IRegistryWrapper {
	registry:Registry;
   	options:Options;
	   
	constructor(registry:Registry){
		this.registry = registry;
		this.options = new Options();
		this.options.host = this.registry.host;
		this.options.port = this.registry.port;
		this.options.rejectUnauthorized = false;
		if(this.registry.user && this.registry.password){
			this.options.auth = this.registry.user + ':' + this.registry.password;			
		}
	}
	
	getCatalog(callback:(err:Error, result:ImageCatalog)=>void){
		this.options.path = '/v2/_catalog';
  		this.options.method= 'GET';		

		https.request(this.options, (res) => {
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
		this.options.path = '/v2/' + image + '/tags/list';
  		this.options.method = 'GET';
		
		https.request(this.options, (res) => {
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
		this.options.path = '/v2/' + image + '/manifests/' + tag;
		this.options.method = 'GET';

		https.request(this.options, (res) => {
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