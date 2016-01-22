'use strict';
import ImageCatalog = require('../models/image-catalog');
import TagsList = require('../models/tags-list');
import Manifest = require('../models/manifest');
import Registry = require('../models/registry');

interface IRegistryWrapper {
	registry:Registry;
		
	getCatalog(callback:(err:Error, result:ImageCatalog)=>void):void;	
	getTags(image:string, callback:(err:Error, result:TagsList)=>void):void;
	getManifest(image:string, tag:string, callback:(err:Error, result:Manifest)=>void):void;
}

export = IRegistryWrapper;