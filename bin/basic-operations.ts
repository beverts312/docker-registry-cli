'use strict';
import ImageCatalog = require('../src/models/image-catalog');
import TagsList = require('../src/models/tags-list');
import Manifest = require('../src/models/manifest');
import Registry = require('../src/models/registry');
import RegistryWrapper =  require('../src/registry-wrapper');

class BasicOperations {
    wrapper:RegistryWrapper;
	
	constructor(wrapper?:RegistryWrapper){
        if(!wrapper){
            var config = require('./configuration.json');
		    var registry = config.registries[config.registry];
            registry.password = new Buffer(registry.password, 'base64').toString('ascii');
		    this.wrapper = new RegistryWrapper(registry);
        }
		else{
            console.log('Wrapper injected');
            this.wrapper = wrapper;
        }
	}
	
	getCatalog(){
		this.wrapper.getCatalog((err, res)=>{
			if(err){
				console.log(err.message);
			}
			else{
				console.log(res);
			}
		});	
	}
	
	getTags(image:string){
		this.wrapper.getTags(image, (err, res)=>{
			if(err){
				console.log(err.message);
			}
			else{
				console.log(res);
			}	
		});
	}
	
	getManifest(image:string, tag:string){
		this.wrapper.getManifest(image, tag, (err, res) =>{
			if(err){
				console.log(err.message);
			}
			else{
				console.log(res);
			}	
		});
	}
}
export = BasicOperations;