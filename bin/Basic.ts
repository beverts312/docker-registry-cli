'use strict';
import ImageCatalog = require('../src/models/ImageCatalog');
import TagsList = require('../src/models/TagsList');
import Manifest = require('../src/models/Manifest');
import Registry = require('../src/models/Registry');
import RegistryWrapper =  require('../src/RegistryWrapper');


class Basic {
	registry:Registry;
	wrapper:RegistryWrapper;
	
	constructor(){
		var config = require('./configuration.json');
		var regId = config.registry;
		this.registry = new Registry(  	config.registries[regId].name,
                                        config.registries[regId].host,
		 								config.registries[regId].port,
										config.registries[regId].user,
										new Buffer(config.registries[regId].password, 'base64').toString('ascii'));
		this.wrapper = new RegistryWrapper(this.registry);
	}
	  
	processCommand(resource:string, args:any){
		switch(resource){
			case 'catalog':
				this.getCatalog();
				break;
			case 'tags':
				this.getTags(args.image);
				break;
			case 'manifest':
				this.getManifest(args.image, args.tag);
				break;
			default:
				console.log(resource + ' is an invalid option');
				console.log('Use registry -h to see usage info');
				break;		
		}		
	}
	
	getCatalog(){
		this.wrapper.getCatalog((err, res)=>{
			if(err){
				console.log(err.message);
				process.exit(1);
			}
			else{
				console.log(res);
				process.exit(0);
			}
		});	
	}
	
	getTags(image:string){
		this.wrapper.getTags(image, (err, res)=>{
			if(err){
				console.log(err.message);
				process.exit(1);
			}
			else{
				console.log(res);
				process.exit(0);
			}	
		});
	}
	
	getManifest(image:string, tag:string){
		this.wrapper.getManifest(image, tag, (err, res) =>{
			if(err){
				console.log(err.message);
				process.exit(1);
			}
			else{
				console.log(res);
				process.exit(0);
			}	
		});
	}
}
export = Basic;