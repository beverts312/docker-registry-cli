/// <reference path="../../typings/tsd.d.ts" />

'use strict';

import Chai = require('chai');
import Sinon = require('sinon');

import RegistriesManager = require('../../bin/registries-manager');
import ConfigManager = require('../../src/config-manager');
import Registry = require('../../src/models/registry');

var assert = Chai.assert;

describe('RegistriesManager Suite -', ()=>{
    var registriesManager: RegistriesManager;
    var configManager: ConfigManager;
    var registries: Registry[];
    var sandbox;
    
    beforeEach(()=>{
       sandbox = Sinon.sandbox.create(); 
       configManager = new ConfigManager();
       registries = [new Registry('reg0','reg0.com',5000), new Registry('reg1','reg1.com',5000)];
    });
    
    afterEach(()=>{
       registriesManager = null;
       configManager = null;
       sandbox.restore(); 
    });
    
    describe('getRegistries -', ()=>{
        it('Should Call getRegistries', (done: () => void) => {
            configManager.getRegistries = sandbox.stub().returns(registries);            
            registriesManager = new RegistriesManager(configManager); 
            registriesManager.getRegistries();
            assert.isTrue(configManager.getRegistries.called);
            done(); 
        });
    });
    
    describe('getDefaultRegistry -', ()=>{    
        it('Should Call getDefaultRegistry', (done: () => void) => {
            configManager.getDefaultRegistry = sandbox.stub().returns(registries[0]);            
            registriesManager = new RegistriesManager(configManager); 
            registriesManager.getDefaultRegistry();
            assert.isTrue(configManager.getDefaultRegistry.called);
            done(); 
        });
    });
    
    describe('constructor -', ()=>{    
        it('Default Constructor doesnt crash', (done: () => void) => {
            registriesManager = new RegistriesManager(); 
            done(); 
        });
    });
    
    describe('addRegistry -', ()=>{   
        it('Should Call addRegistries, no auth', (done: () => void) => {
            configManager.addRegistry = sandbox.stub().yields(null);    
            registriesManager = new RegistriesManager(configManager);   
            registriesManager.addRegistry('reg', 'reg.com', 5000);
            assert.isTrue(configManager.addRegistry.called);
            done(); 
        });
    
        it('Should Call addRegistries, auth', (done: () => void) => {
            configManager.addRegistry = sandbox.stub().yields(null);    
            registriesManager = new RegistriesManager(configManager);   
            registriesManager.addRegistry('reg', 'reg.com', 5000, 'user', 'password');
            assert.isTrue(configManager.addRegistry.called);
            done(); 
        });
    
        it('Doesnt crash on error, no auth', (done: () => void) => {
            configManager.addRegistry = sandbox.stub().yields(new Error('message'));    
            registriesManager = new RegistriesManager(configManager);   
            registriesManager.addRegistry('reg', 'reg.com', 5000);
            assert.isTrue(configManager.addRegistry.called);
            done(); 
        });
    });
    
    describe('removeRegistry -', ()=>{   
        it('Should Call removeRegistry', (done: () => void) => {
            configManager.removeRegistry = sandbox.stub().yields(null);    
            registriesManager = new RegistriesManager(configManager);   
            registriesManager.removeRegistry('reg');
            assert.isTrue(configManager.removeRegistry.called);
            done(); 
        });
    
        it('Doesnt crash on error', (done: () => void) => {
            configManager.removeRegistry = sandbox.stub().yields(new Error('message'));    
            registriesManager = new RegistriesManager(configManager);   
            registriesManager.removeRegistry('reg');
            assert.isTrue(configManager.removeRegistry.called);
            done(); 
        });
    });    
    
    describe('setDefaultRegistry -', ()=>{   
        it('Should Call setDefaultRegistry', (done: () => void) => {
            configManager.setDefaultRegistry = sandbox.stub().yields(null);    
            registriesManager = new RegistriesManager(configManager);   
            registriesManager.setDefaultRegistry('reg');
            assert.isTrue(configManager.setDefaultRegistry.called);
            done(); 
        });
    
        it('Doesnt crash on error', (done: () => void) => {
            configManager.setDefaultRegistry = sandbox.stub().yields(new Error('message'));    
            registriesManager = new RegistriesManager(configManager);   
            registriesManager.setDefaultRegistry('reg');
            assert.isTrue(configManager.setDefaultRegistry.called);
            done(); 
        });
    }); 
    
});