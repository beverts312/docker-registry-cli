'use strict';
import Registry = require('../models/registry');

import ImageCatalog = require('../models/api/image-catalog');
import TagsList = require('../models/api/tags-list');
import Manifest = require('../models/manifest');

interface IRegistryWrapper {
	registry:Registry;
		
	getCatalog(callback:(err:Error, result:ImageCatalog)=>void):void;	
	getTags(image:string, callback:(err:Error, result:TagsList)=>void):void;
	getManifest(image:string, tag:string, callback:(err:Error, result:Manifest)=>void):void;
}

export = IRegistryWrapper;