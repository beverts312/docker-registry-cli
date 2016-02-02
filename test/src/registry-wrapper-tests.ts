/// <reference path="../../typings/tsd.d.ts" />
/*
'use strict';

import Chai = require('chai');
import Sinon = require('sinon');
import PassThrough = require('stream').PassThrough;
import https = require('https');

import RegistryWrapper = require('../../src/registry-wrapper');
import Registry = require('../../src/models/registry');
import Catalog = require('../../src/models/image-catalog');


var assert = Chai.assert;

describe('Registry Wrapper Suite -', ()=>{
    var sandbox;
    var wrapper: RegistryWrapper;
    
    beforeEach(()=>{
       sandbox = Sinon.sandbox.create(); 
	   this.request = Sinon.stub(https, 'request'); 
       wrapper = new RegistryWrapper(new Registry('','',0,'',''));      
    });
    
    afterEach(()=>{
       wrapper = null;
       https.request.restore();        
       sandbox.restore(); 
    });
    
    it('test', (done: () => void) => {
        var res = new Catalog();
        var response = new PassThrough();
        response.write(JSON.stringify(res));
        response.end();
        var request = new PassThrough();
        this.request.callsArgWith(1,response).returns(request);
        wrapper.getCatalog((err, result )=>{
          console.log(JSON.stringify(result));  
        });
        done();
    });
    
});*/