import RegistryWrapper = require('../src/RegistryWrapper');
import Manifest = require('../src/models/Manifest');
import ImageCatalog = require('../src/models/ImageCatalog');
import Registry = require('../src/models/Registry');

module.exports = ((options: any) => {
    var image = options.image;
	var tag = options.tag;
	console.log('image: '+ image);
	console.log('tag: ' + tag);
	
	compareImage(image, tag, (err, match) => {
		if(err){
			console.log(err);
		} else if( match ){
			console.log("Images match");
		}
	});
	
	process.exit(0);
	
});
	
function compareImage(name:string, tag:string, callback:(err:string, match:boolean)=>void){
	var oma = new RegistryWrapper(new Registry('registryomatwo.fmr.com', 5000, 'reguser', 'rqdLjupe3RR4A30HJl9a'));
	var mmk = new RegistryWrapper(new Registry('registrymmk.fmr.com', 5000, 'reguser', 'rqdLjupe3RR4A30HJl9a'));
	var rtp = new RegistryWrapper(new Registry('registryrtp.fmr.com', 5000, 'reguser', 'rqdLjupe3RR4A30HJl9a'));
	oma.getManifest(name, tag, (err, omaResult)=>{
		var omaImage = omaResult;
		mmk.getManifest(name, tag, (err, mmkResult)=>{
			var mmkImage = mmkResult;
			rtp.getManifest(name, tag, (err, rtpResult)=>{
				var rtpImage = rtpResult;
				compareImages(omaImage, mmkImage, rtpImage, (err, match)=>{
					callback(err, match);
				});
			});
		});
	});
}
	
function compareImages(oma:Manifest, mmk:Manifest, rtp:Manifest, callback:(err:string, match:boolean)=>void){
	if(oma.fsLayers.length == mmk.fsLayers.length){
		if(oma.fsLayers.length == rtp.fsLayers.length){
			for(var i = 0; i < oma.fsLayers.length; i++){
				if(oma.fsLayers[i].blobSum == mmk.fsLayers[i].blobSum){
					if(oma.fsLayers[i].blobSum == rtp.fsLayers[i].blobSum){
						callback(null, true);
					}
				}
				else {
					callback('Layer digest mismatch', false);
				}
			}
		}
		else{
			callback('Layer count mismatch', false);					
		}
	}
	else{
		callback('Layer count mismatch', false);	
	}
}