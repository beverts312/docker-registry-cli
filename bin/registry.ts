'use strict';

import program = require('commander');
import basic = require('./Basic');
program
	.command('compare')
	.description('Compares image in multiple repositories')
	.option('-i, --image <image>', 'The name of the image')
	.option('-t, --tag <tag>', 'The image tag')
	.action(require('./Compare'));

program
	.command('get <resource>')
	.usage('')
	.option('-i, --image <image>', 'The name of the image, ')
	.option('-t, --tag <tag>', 'The image tag')
	

program
	.command('config <action> <value>')
	.description('Gets or sets config values for the registry tool')
	

program.parse(process.argv);