'use strict';
import IRegistryWrapper = require('./interfaces/IRegistryWrapper');
import ImageCatalog = require('./models/image-catalog');
import TagsList = require('./models/tags-list');
import Manifest = require('./models/manifest');
import Registry = require('./models/registry');
import Options = require('./models/options');

import https = require('https');

class RegistryWrapper implements IRegistryWrapper {
	registry:Registry;
   	options:Options;
	   
	constructor(registry:Registry){
		this.registry = registry;
		this.options = new Options();
		this.options.host = this.registry.host;
		this.options.port = this.registry.port;
        if(registry.user && registry.password){
		    this.options.rejectUnauthorized = false;
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
    
    deleteLayer(name:string, digest:string, callback:(err:Error)=>void){
        this.options.path = '/v2/' + name + '/blobs/' + digest;
		this.options.method = 'DELETE';
		var req = https.request(this.options, (res) => {
			var str = '';
			res.on('data', (chunk)=>{
				str += chunk;
			});
			res.on('end', ()=>{
				callback(null);
			});
        });
		req.end();	
		req.on('error', (error)=>{
                callback(new Error('Could not delete layer'));				
		});
    }
	
}
export = RegistryWrapper;