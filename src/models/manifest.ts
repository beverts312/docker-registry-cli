import apiManifest = require('./api/manifest');

class Manifest {
	public schemaVersion:number;
	public name:string;
	public tag:string;
	public architecture:string;
	public layers:string[];
	public id:string;
	
	constructor(apiManifest:apiManifest){
		this.schemaVersion = apiManifest.schemaVersion;
		this.name = apiManifest.name;
		this.tag = apiManifest.tag;
		this.architecture = apiManifest.architecture;
		this.layers = [];
		for(var i = 0; i < apiManifest.fsLayers.length; i++){
			this.layers.push(apiManifest.fsLayers[i].blobSum);
		}
		this.id = apiManifest.history[0].v1Compatibility.substring(7,19);
	}
}

export = Manifest;