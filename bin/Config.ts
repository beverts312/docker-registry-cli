'use strict';
import fs = require('fs');

import Registry = require('../src/models/Registry');
import Configuration = require('../src/models/Configuration');

class Config {
	configuration: Configuration;
	
	constructor(){	}
	
	processCommand(arg:string, key:string, args:any){
		switch(arg){
			case 'get':
				this.getConfig(key);
				break;
			case 'set':
				this.setConfig(key, args.value);
				break;
			case 'add':
				this.addConfig(key, args);
				break;
			case 'remove':
				this.removeConfig(key, args.value);
				break;
			default:
				console.log(arg + 'is an invalid option');
				console.log('Use registry -h to see usage info');
				break;
		}		
	}
	
	getConfig(key:string){
		this.configuration = require('./configuration.json');
		var regId = this.configuration.registry;
		switch(key){
			case 'registry':
				console.log(regId + ': ' + this.configuration.registries[regId].host);
				break;
			case 'registries':
				this.displayRegistries();
				break;
			case 'compare':
				this.displayCompare()
				break;
			default:
				console.log(key + ' is an invalid option');
				break;			
		}
	}
	
	setConfig(key:string, value:any){
		this.configuration = require('./configuration.json');
		switch(key){
			case 'registry':
				if(value < this.configuration.registries.length){
					this.configuration.registry = value;
					this.updateConfiguration();
					console.log('Registry set to: ' + this.configuration.registries[this.configuration.registry].host);
				}
				else {
					console.log(value + ' is an invalid registry value.')
					console.log('Please use an ID from the list below.');
					this.displayRegistries();
				}
				break;
			case 'registries':
				console.log('You cannot set registries, you can use add or remove to edit the registries');		
				break;
			case 'compare':
				console.log('You cannot set compare, you can use add or remove to edit the registries');					
				break;
			default:
				console.log(key + ' is not valid to be set');
				console.log('For now you can only set registry');
				break;
		}		
	}
	
	addConfig(key:string, args:any){
		this.configuration = require('./configuration.json');
		switch(key){
			case 'registry':
				var reg = new Registry(args.host, args.port, args.user, args.password);
				this.configuration.registries.push(reg);
				this.updateConfiguration();
				this.displayRegistries();
				break;
			case 'compare':
				this.configuration.compare.push(args.value);
				this.updateConfiguration();				
				this.displayCompare();		
				break;
			default:
				console.log('Cant add to ' + key);
				break;		
		}
	}
	
	removeConfig(key:string, value:number){
		this.configuration = require('./configuration.json');
		switch(key){
			case 'registry':
				this.removeRegistry(value);		
				break;
			case 'compare':
				this.removeCompare(value);					
				break;
			default:
				console.log(key + ' is not valid to be removed');
				console.log('You can remove entries from registries or compare');
				break;
		}		
	}
	
	// Helpers
	displayRegistries(){
		console.log('ID		Host');
		for(var i = 0; i < this.configuration.registries.length; i++){
			console.log(i + '	' + this.configuration.registries[i].host);
		}
	}
	
	displayCompare(){
		console.log('ID		Host');
		for(var i = 0; i < this.configuration.compare.length; i++){
			var id = this.configuration.compare[i];
			console.log(id + '		' + this.configuration.registries[id]);
		}
	}
	
	updateConfiguration(){
		fs.writeFile(require.resolve('./configuration.json'), JSON.stringify(this.configuration), (err) =>{
			if(err){
				console.log(err)
			}
		});
	}
	
	removeRegistry(key:number){
		console.log('TO DO');		
	}
	
	removeCompare(key:number){
		console.log('TO DO');
	}
	

}
export = Config;