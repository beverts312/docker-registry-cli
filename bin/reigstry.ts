'use strict';

import program = require('commander');

program
	.command('compare')
	.description('Compares image in multiple repositories')
	.option('--image <image>', 'The name of the image')
	.option('--tag <tag>', 'The image tag')
	.action(require('./Compare'));