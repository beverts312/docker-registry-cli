'use strict';

import program = require('commander');
import BasicOperations = require('./basic-operations');
import RegistriesManager = require('./registries-manager');

var registriesManager = new RegistriesManager();                           

//Single Registry
program.command('catalog')
	.description('Lists all images in the registry')
	.option('-r, --registry-name <reg>', 'The name of the registry to use')
	.action((name, tag) => {
		var basicOps = new BasicOperations();
		basicOps.getCatalog();
	});
    
program.command('tags <image>')
	.description('Lists all tags for an image')
	.option('-r, --registry-name <reg>', 'The name of the registry to use')
	.action((image) => {
		var basicOps = new BasicOperations();
		basicOps.getTags(image);
	});  
    
program.command('manifest <name> <tag>')
	.description('Gets image manifest')
	.option('-r, --registry-name <reg>', 'The name of the registry to use')
	.action((name, tag) => {
		var basicOps = new BasicOperations();
		basicOps.getManifest(name, tag);
	});
    
//Multi Registry
program.command('compare <image> <tag>')
	.description('Compares image in multiple repositories')
	.option('-i, --image <image>', 'The name of the image')
	.option('-t, --tag <tag>', 'The image tag')
	.action(require('./Compare'));

//Config	
program.command('add <name> <hostname> <port> <user> <password>')
    .description('Adds registry creds to config')
    .option('-u, --user <user>', 'Registry user')
    .option('-p, --password <password>', 'Registry Password')
    .action((name, hostname, port, user, password)=>{
        registriesManager.addRegistry(name, hostname, port, user, password);
    });
    
program.command('remove <name>')
    .description('Removes registry from config')
    .action((name)=>{
        registriesManager.removeRegistry(name);
    });
    
program.parse(process.argv);