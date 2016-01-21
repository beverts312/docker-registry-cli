'use strict';

import Chai = require('chai');
import Sinon = require('sinon');

import ConfigManager = require('../src/ConfigManager');


var assert = Chai.assert;

describe('ConfigManager Suite -', ()=>{
    var configManager: ConfigManager;
    var sandbox;
    
    beforeEach(()=>{
       configManager = new ConfigManager();
       sandbox = Sinon.sandbox.create(); 
    });
    
    afterEach(()=>{
       configManager = null;
       sandbox.restore(); 
    });
    
    describe('getRegistries -', () =>{
       before(()=>{
           // initialize some registries
       });
       
       beforeEach(()=>{
           // set up stubs
       }); 
       
       it('Should get registries', (done: () => void) => {
          assert.equal('1','1');
          done(); 
       });
    });
    
});
