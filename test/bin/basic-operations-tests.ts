/// <reference path="../../typings/tsd.d.ts" />

'use strict';

import Chai = require('chai');
import Sinon = require('sinon');

import BasicOperations = require('../../bin/basic-operations');
import RegistryWrapper = require('../../src/registry-wrapper');
import ImageCatalog = require('../../src/models/image-catalog');
import TagsList = require('../../src/models/tags-list');
import Registry = require('../../src/models/registry');
import Manifest = require('../../src/models/manifest');

var assert = Chai.assert;

describe('BasicOperations Suite -', ()=>{
    var basicOps: BasicOperations;
    var wrapper: RegistryWrapper;
    var sandbox;
    
    beforeEach(()=>{
       sandbox = Sinon.sandbox.create(); 
       wrapper = new RegistryWrapper(new Registry('reg0','reg0.com',5000,'user','pass'));
    });
    
    afterEach(()=>{
       basicOps = null;
       wrapper = null;
       sandbox.restore(); 
    });
    
    describe('getCatalog -', ()=>{   
        it('Should Call getCatalog', (done: () => void) => {
            wrapper.getCatalog = sandbox.stub().yields(null, new ImageCatalog());     
            basicOps = new BasicOperations(wrapper);   
            basicOps.getCatalog();
            assert.isTrue(wrapper.getCatalog.called);
            done(); 
        });
        
        it('Doesnt Crash On Error', (done: () => void) => {
            wrapper.getCatalog = sandbox.stub().yields(new Error('message'));     
            basicOps = new BasicOperations(wrapper);   
            basicOps.getCatalog();
            assert.isTrue(wrapper.getCatalog.called);
            done(); 
        });
    }); 
    
    describe('getTags -', ()=>{   
        it('Should Call getTags', (done: () => void) => {
            wrapper.getTags = sandbox.stub().yields(null, new TagsList());     
            basicOps = new BasicOperations(wrapper);   
            basicOps.getTags('image');
            assert.isTrue(wrapper.getTags.called);
            done(); 
        });
        
        it('Doesnt Crash On Error', (done: () => void) => {
            wrapper.getTags = sandbox.stub().yields(new Error('message'));     
            basicOps = new BasicOperations(wrapper);   
            basicOps.getTags('image');
            assert.isTrue(wrapper.getTags.called);
            done(); 
        });
    }); 
    
    describe('getManifest -', ()=>{   
        it('Should Call getManifest', (done: () => void) => {
            wrapper.getManifest = sandbox.stub().yields(null, new Manifest());     
            basicOps = new BasicOperations(wrapper);   
            basicOps.getManifest('image');
            assert.isTrue(wrapper.getManifest.called);
            done(); 
        });
        
        it('Doesnt Crash On Error', (done: () => void) => {
            wrapper.getManifest = sandbox.stub().yields(new Error('message'));     
            basicOps = new BasicOperations(wrapper);   
            basicOps.getManifest('image');
            assert.isTrue(wrapper.getManifest.called);
            done(); 
        });
    }); 
});