'use strict';

import program = require('commander');
import BasicOperations = require('./basic-operations');
import RegistriesManager = require('./registries-manager');

var registriesManager = new RegistriesManager();                           

program.command('compare <image> <tag>')
	.description('Compares image in multiple repositories')
	.option('-i, --image <image>', 'The name of the image')
	.option('-t, --tag <tag>', 'The image tag')
	.action(require('./Compare'));

program.command('manifest <name> <tag>')
	.description('Gets image manifest')
	.option('-r, --registry-name <reg>', 'The name of the registry, defaults to ' + registriesManager.getDefaultRegistry())
	.action((name, tag) => {
		var basicOps = new BasicOperations();
		basicOps.getManifest(name, tag);
	});
	
program.command('add <name> <hostname> <port> <user> <password>')
    .description('Adds registry creds to config')
    .action((name, hostname, port, user, password)=>{
        registriesManager.addRegistry(name, hostname, port, user, password);
    });
    
program.command('remove <name>')
    .description('Removes registry from config')
    .action((name)=>{
        registriesManager.removeRegistry(name);
    });
    
program.parse(process.argv);