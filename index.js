#!/usr/bin/env node
const fetch = require('node-fetch');

const { CLI } = require('cli-kit');
const cli = new CLI({
	help: true,
	name: 'simple-cli',
	args: [
		{
			name: '<name>',
			desc: 'The package name.',
			type: 'string'
		}
	],
	options: {
		'--json': {
			desc: 'output json',
			
		} 
	}
});

cli
	.exec()
	.then(async ({ argv, _ }) => {
		const { name, json } = argv;
		const res = await fetch(`https://registry.npmjs.com/${name}`);
		const data = await res.json();
		if (data.error) {
			throw new Error(`${name} doesn't exist!`);
		}
		if (json) {
			console.log(data)
		} else {
			const { latest } = data['dist-tags'];
			const { time } = data;
			console.log(`You asked for ${name}, the latest version is ${latest}, published on ${time[latest]}`);
		}
	})
	.catch(err => {
		console.log(err.message);
	}) 
