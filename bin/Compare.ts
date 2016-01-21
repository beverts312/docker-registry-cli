import RegistryWrapper = require('../src/RegistryWrapper');
import Manifest = require('../src/models/Manifest');
import ImageCatalog = require('../src/models/ImageCatalog');
import Registry = require('../src/models/Registry');
import Configuration = require('../src/models/Configuration');
		
module.exports = ((options: any) => {
    var image = options.image;
	var tag = options.tag;
	console.log('image: '+ image);
	console.log('tag: ' + tag);
	
	compareImage(image, tag, (err, match) => {
		if(err){
			console.log(err);
			process.exit(1);
		} else if( match ){
			console.log("Images match");
			process.exit(0);
		}
	});	
});
	
function compareImage(name:string, tag:string, callback:(err:string, match:boolean)=>void){
    var config = <Configuration> require('./configuration.json');
	getImages(name, tag, config, (err, images) =>{
        if(err.length > 0){
	       for(var i = 0; i < err.length; i++){
		      console.log(err[i]);
            }
            callback('Error getting images, more details above', false);
	   }
	   else{
	       for(var i = 0; i < images.length - 1; i++){
		      if(!compareImages(images[i], images[i + 1])){
                callback('Image mismatch', false);
              }
			}
			callback(null, true)
		}
	});
}

function getImages(name:string, tag:string, config:Configuration, callback:(err:string[], images:Manifest[])=>void){
	var id  = config.registries[0];
	var images = [];
	var errors = [];
	
	for(var i = 0; i < config.registries.length; i++){
		var reg = new RegistryWrapper(new Registry( config.registries[i].name,	
                                                config.registries[i].host, 
												config.registries[i].port, 
												config.registries[i].user, 
												new Buffer(config.registries[i].password, 'base64').toString('ascii')));
        if(i != config.registries.length -1){
            reg.getManifest(name, tag, (err, res)=>{
                if(err){
				    errors.push(err.message);
			    }
			    else{
				    images.push(res);
			    }
		    });    
        }
        else{
            reg.getManifest(name, tag, (err, res)=>{
		      if(err){
			     errors.push(err.message);
		      }
		      else{
			     images.push(res);
		      }
		      callback(errors, images);	
	       });       
        }
	}			
}

function compareImages(one:Manifest, two:Manifest):boolean{
	if(one.fsLayers.length == two.fsLayers.length){
		for(var i = 0; i < one.fsLayers.length; i++){
			if(one.fsLayers[i].blobSum != two.fsLayers[i].blobSum){
				console.log('Layer digest mismatch');
				console.log(one.fsLayers[i].blobSum);
				console.log(two.fsLayers[i].blobSum);
				return false;	
			}
		}
		return true;
	}
	else{
		console.log('Layer count mismatch')
		return false;					
	}
}