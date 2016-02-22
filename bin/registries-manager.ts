'use strict';
import ConfigManager = require('../src/config-manager');
import Registry = require('../src/models/registry');

class RegistriesManager {
    config:ConfigManager;    
    constructor(config?:ConfigManager){
        if(!config){
            this.config = new ConfigManager();        
        }
        else{
            this.config = config;
        }
    }
    
	addRegistry(name:string, host:string, port:number, user?:string, password?:string){
        var reg;
        if(user && password){
            reg = new Registry(name, host, port, user, new Buffer(password).toString('base64'));  
        }
        else{
            reg = new Registry(name, host, port);
        }
        this.config.addRegistry(reg, (err)=>{
            if(err){
                console.log('Add registry failed');    
                console.log(err.message);
            }
            else{
                console.log('Added registry');
            }
        });
    }
    
    removeRegistry(name){
        this.config.removeRegistry(name, (err)=>{
            if(err){
                console.log('Remove registry failed');    
                console.log(err.message);
            }
            else{
                console.log('Removed registry ' + name);
            } 
        });
    }
    
    getRegistries(){
        var registries = this.config.getRegistries();
        for(var i = 0; i < registries.length; i++){
            this.displayRegistry(registries[i]);
        }
    }
	
    getDefaultRegistry(){
        return this.config.getDefaultRegistry();    
    }
    
    setDefaultRegistry(name:string){
        this.config.setDefaultRegistry(name, (err)=>{
            if(err){
                console.log('Set default registry failed');    
                console.log(err.message);
            }
            else{
                console.log('Default registry is ' + name);
            }   
        });
    }   
    
    displayRegistry(registry:Registry){
        console.log(registry.name + '     ' + registry.host + ':' + registry.port);
    }
}
export = RegistriesManager;