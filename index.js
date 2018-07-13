const fetch = require('node-fetch');

const { CLI } = require('cli-kit');
const cli = new CLI({
	help: true,
	name: 'simple-cli',
	options: {
		'-p, --package [value]': {
			desc: 'the package to query',
			type: 'string'
		} 
	}
});

cli
	.exec()
	.then(async ( {argv, _}) => {
		const { package } = argv;
		const res = await fetch(`https://registry.npmjs.com/${package}`);
		const data = await res.json();
		const { latest } = data['dist-tags'];
		const { time } = data;
		console.log(`You asked for ${package}, the latest version is ${latest}, published on ${time[latest]}`);
	})
	.catch(err => {
		console.log(err);
	}) 
