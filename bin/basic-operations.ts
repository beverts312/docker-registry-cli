'use strict';
import RegistryWrapper =  require('../src/registry-wrapper');
import ConfigManager = require('../src/config-manager');
import Registry = require('../src/models/registry');
import ImageCatalog = require('../src/models/api/image-catalog');
import TagsList = require('../src/models/api/tags-list');
import Manifest = require('../src/models/api/manifest');


class BasicOperations {
    wrapper:RegistryWrapper;
    
	constructor(args: any, wrapper?:RegistryWrapper){
        if(!wrapper){
		    var registry;
            var config = require('../config/configuration.json');                
            registry = config.registries[config.registry]; 
            if( args.registry ){
                var configManager = new ConfigManager(); 
                var regIndex = configManager.getRegistryIndex(args.registry);               
                if(regIndex != -1){
                    console.log('Overriding default registry');
                    registry = config.registries[regIndex];
                }
                else{
                    console.log('Error: ' + args.registry + ' is not a registry you have added');
                    process.exit(1);                    
                }
            }  
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
				console.log('Images: ');
				for(var i = 0; i < res.repositories.length; i++){
					console.log(res.repositories[i]);
				}
			}
		});	
	}
	
	getTags(image:string){
		this.wrapper.getTags(image, (err, res)=>{
			if(err){
				console.log(err.message);
			}
			else{
				console.log('Name: ' + res.name);
				console.log('Tags: ');
				for(var i = 0; i < res.tags.length; i++){
					console.log(res.tags[i]);
				}
			}	
		});
	}
	
	getManifest(image:string, tag:string){
		this.wrapper.getManifest(image, tag, (err, res) =>{
			if(err){
				console.log(err.message);
			}
			else{
				console.log('Id: ' + res.id);
				console.log('Name: ' + res.name);
				console.log('Tag: ' + res.tag);
				console.log('Architecture: ' + res.architecture);
				console.log('Schema Version: ' + res.schemaVersion);
				console.log('Layers: ');
				for(var i = 0; i < res.layers.length; i++){
					console.log('[' + i + ']: ' + res.layers[i]);
				}
			}	
		});
	}
}
export = BasicOperations;