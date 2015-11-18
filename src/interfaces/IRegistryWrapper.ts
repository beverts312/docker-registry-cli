'use strict';
import ImageCatalog = require('../models/ImageCatalog');
import TagsList = require('../models/TagsList');
import Manifest = require('../models/Manifest');

interface IRegistryWrapper {
	url:string;
	port:number;
	
	getCatalog(callback:(err:Error, result:ImageCatalog)=>void):void;	
	getTags(image:string, callback:(err:Error, result:TagsList)=>void):void;
	getManifest(image:string, tag:string, callback:(err:Error, result:Manifest)=>void):void;
}

export = IRegistryWrapper;