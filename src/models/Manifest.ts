import Signature = require('./signature');
import FsLayer = require('./fsLayer');

class Manifest {
	public schemaVersion:number;
	public name:string;
	public tag:string;
	public architecture:string;
	public fsLayers:FsLayer[];
	public history:any[];
	public sginatures:Signature[];
}

export = Manifest;