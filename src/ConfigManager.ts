'use strict';
import fs = require('fs');

import Registry = require('./models/Registry');
import Configuration = require('./models/Configuration');
import IConfigManager = require('./interfaces/IConfigManager');

class ConfigManager implements IConfigManager {    
    config:Configuration;
    
    constructor(){
        this.config = require('../bin/configuration.json');
    }
    
    getRegistries():Registry[]{
        return this.config.registries;
    }
    
    addRegistry(registry:Registry, callback:(err:Error)=>void){
        if(this.getRegistryIndex(registry.name) == -1){
            this.config.registries.push(registry);
            this.updateConfiguration((err)=>{
                callback(err); 
            });                
        }
        else{
            callback(new Error('A registry with that name already exists'));
        }
    
    }
    
    removeRegistry(name:string, callback:(err:Error)=>void){
        var regIndex = this.getRegistryIndex(name);
        if(regIndex != -1){
            this.config.registries.splice(regIndex, 1);
            this.updateConfiguration((err)=>{
               callback(err); 
            });
        }
        else{
            callback(new Error('Registry with name ' + name + ' does not exist'));            
        }
    }
    
    setDefaultRegistry(name:string, callback:(err:Error)=>void){
        var regIndex = this.getRegistryIndex(name);   
        if(regIndex != -1){
            this.config.registry = regIndex;
            this.updateConfiguration((err)=>{
               callback(err); 
            });
        }
        else{
            callback(new Error('Registry does not exist'));
        }
    }
    
    getDefaultRegistry():string{
        return this.config.registries[this.config.registry].name; 
    }
	
    getRegistryIndex(name:string):number{
        for(var i = 0; i < this.config.registries.length; i++){
            if(name == this.config.registries[i].name){
                return i;
            }
        }
        return -1;
    }
    
	private updateConfiguration(callback:(err:Error)=>void){
		fs.writeFile(require.resolve('../bin/configuration.json'), JSON.stringify(this.config), (err) =>{
		  callback(err);
		});
	}
	

}
export = ConfigManager;