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
		this.registry = new Registry( 'beverts.cloudapp.net', 5000,'reguser','alIOUQfje3FyfPl');
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