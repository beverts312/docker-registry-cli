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
	.command('config <action> <key> <value>')
	.description('Gets or sets config values for the registry tool')
	.action((action, key, value) => {
		var config = new Config();
		config.processCommand(action, key, value)
	});
	

program.parse(process.argv);