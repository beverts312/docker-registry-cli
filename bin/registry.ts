'use strict';

import program = require('commander');
import Basic = require('./Basic');
import Config = require('./Config');

program
	.command('compare')
	.description('Compares image in multiple repositories')
	.option('-i, --image <image>', 'The name of the image')
	.option('-t, --tag <tag>', 'The image tag')
	.action(require('./Compare'));

program
	.command('get <resource>')
	.description(`
	Get a resource:
		catalog: List images in a repo
		tags: Get all tags for an image in a repo, (requires -i to be set)
		manifest: Gets manifest info for an image:tag in a repo (requires -i and -t)`)
	.option('-i, --image <image>', 'The name of the image, ')
	.option('-t, --tag <tag>', 'The image tag')
	.action((resource, args) => {
		var basic = new Basic();
		basic.processCommand(resource, args);
	});

program
	.command('config <action> <key>')
	.description('Gets or sets config values for the registry tool')
	.option('-v, --value <value>', 'The value to set')
	.option('-n, --hostname <hostname>', 'The hostname of the registry')
	.option('-p, --port <port>', 'The port the registry listens on')
	.option('-u, --user <user>', 'The registry user')
	.option('-s, --password <password>', 'The password for the registry')
	.action((action, key, args) => {
		var config = new Config();
		config.processCommand(action, key, args)
	});
	

program.parse(process.argv);