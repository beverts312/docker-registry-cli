import RegistryWrapper = require('../src/RegistryWrapper');
import Manifest = require('../src/models/Manifest');
import ImageCatalog = require('../src/models/ImageCatalog');

module.exports = ((options: any) => {
    var image = options.image;
	var tag = options.tag;
	console.log('image: '+ image);
	console.log('tag: ' + tag);
	process.exit(0);
	
});
	
function compareImage(name:string, tag:string, callback:(err:string, match:boolean)=>void){
	var oma = new RegistryWrapper('registry-oma.fmr.com', 5000);
	var mmk = new RegistryWrapper('registry-mmk.fmr.com', 5000);
	var rtp = new RegistryWrapper('registry-rtp.fmr.com', 5000);
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