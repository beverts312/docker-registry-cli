/// <reference path="../../typings/tsd.d.ts" />

'use strict';

import Chai = require('chai');
import Sinon = require('sinon');

import BasicOperations = require('../../bin/basic-operations');
import RegistryWrapper = require('../../src/registry-wrapper');
import Registry = require('../../src/models/registry');
import ImageCatalog = require('../../src/models/api/image-catalog');
import TagsList = require('../../src/models/api/tags-list');
import FsLayer = require('../../src/models/api/fsLayer');
import Manifest = require('../../src/models/api/manifest');

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
            var catalog = new ImageCatalog();
            catalog.repositories = ['imageone','imagetwo'];
            wrapper.getCatalog = sandbox.stub().yields(null, catalog);     
            basicOps = new BasicOperations(null, wrapper);   
            basicOps.getCatalog();
            assert.isTrue(wrapper.getCatalog.called);
            done(); 
        });
        
        it('Doesnt Crash On Error', (done: () => void) => {
            wrapper.getCatalog = sandbox.stub().yields(new Error('message'));     
            basicOps = new BasicOperations(null, wrapper);   
            basicOps.getCatalog();
            assert.isTrue(wrapper.getCatalog.called);
            done(); 
        });
    }); 
    
    describe('getTags -', ()=>{   
        it('Should Call getTags', (done: () => void) => {
            var tagsList = new TagsList();
            tagsList.tags = ['tagone', 'tagtwo'];
            wrapper.getTags = sandbox.stub().yields(null, tagsList);     
            basicOps = new BasicOperations(null, wrapper);   
            basicOps.getTags('image');
            assert.isTrue(wrapper.getTags.called);
            done(); 
        });
        
        it('Doesnt Crash On Error', (done: () => void) => {
            wrapper.getTags = sandbox.stub().yields(new Error('message'));     
            basicOps = new BasicOperations(null, wrapper);   
            basicOps.getTags('image');
            assert.isTrue(wrapper.getTags.called);
            done(); 
        });
    }); 
    
    describe('getManifest -', ()=>{   
        it('Should Call getManifest', (done: () => void) => {
            var manifest = new Manifest();
            manifest.fsLayers = [new FsLayer()];
            wrapper.getManifest = sandbox.stub().yields(null, manifest);     
            basicOps = new BasicOperations(null, wrapper);   
            basicOps.getManifest('image');
            assert.isTrue(wrapper.getManifest.called);
            done(); 
        });
        
        it('Doesnt Crash On Error', (done: () => void) => {
            wrapper.getManifest = sandbox.stub().yields(new Error('message'));     
            basicOps = new BasicOperations(null, wrapper);   
            basicOps.getManifest('image');
            assert.isTrue(wrapper.getManifest.called);
            done(); 
        });
    }); 
});