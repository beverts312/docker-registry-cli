/// <reference path="../../typings/tsd.d.ts" />

'use strict';

import Chai = require('chai');
import Sinon = require('sinon');
import https = require('https');
var PassThrough = require('stream').PassThrough;

import RegistryWrapper = require('../../src/registry-wrapper');
import Registry = require('../../src/models/registry');
import Manifest = require('../../src/models/manifest');
import Catalog = require('../../src/models/image-catalog');
import TagsList = require('../../src/models/tags-list');


var assert = Chai.assert;

describe('Registry Wrapper Suite -', ()=>{
    var wrapper: RegistryWrapper;
    beforeEach(()=>{
        this.request = Sinon.stub(https, 'request');
        wrapper = new RegistryWrapper(new Registry('','',0,'',''));      
    });
    
    afterEach(()=>{
       wrapper = null;
       https.request.restore();        
    });
    
    it('GetCatalog Test -', (done: () => void) => {
        var expected = new Catalog();
		var response = new PassThrough();
		response.write(JSON.stringify(expected));
		response.end();
        var req = new PassThrough();
        this.request.callsArgWith(1,response).returns(req);
        wrapper.getCatalog((err, result )=>{
            assert.deepEqual(expected, result);  
            done();
        });
    });
    
    it('GetTags Test -', (done: () => void) => {
        var expected = new TagsList();
		var response = new PassThrough();
		response.write(JSON.stringify(expected));
		response.end();
        var req = new PassThrough();
        this.request.callsArgWith(1,response).returns(req);
        wrapper.getTags('image',(err, result )=>{
            assert.deepEqual(expected, result);  
            done();
        });
    });
    
    it('GetManifest Test -', (done: () => void) => {
        var expected = new Manifest();
		var response = new PassThrough();
		response.write(JSON.stringify(expected));
		response.end();
        var req = new PassThrough();
        this.request.callsArgWith(1,response).returns(req);
        wrapper.getManifest('image','tag',(err, result )=>{
            assert.deepEqual(expected, result);  
            done();
        });
    });
    
});