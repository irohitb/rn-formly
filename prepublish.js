// eslint-disable-next-line import/no-extraneous-dependencies
const fs = require('fs');
const globby = require('globby');
const pkg = require('./package.json');

// Resolving absolute paths to relative paths
// This is probably hacky way like if we are using
// @src anywhere else besides in imports then that would also get override
// for now we aren't

function update(path) {
	const count = (path.match(/\//g) || []).length;
	let replacement = '';
	if (count === 2) {
		replacement = './';
	} else if (count > 2) {
		const size = count - 2;
		replacement = Array(size)
			.fill('../')
			.join('');
	} else {
		throw new Error('Invalid / count in path of file');
	}
	let js = fs.readFileSync(path, 'utf8');
	js = js.split('@src/').join(replacement);
	fs.writeFileSync(path, js);
}

globby('./lib/**/*.js')
	.then((paths) => {
		paths.forEach(update);
	})
	.catch((e) => console.log(e));

globby('./lib/**/*.d.ts')
	.then((paths) => {
		paths.forEach(update);
	})
	.catch((e) => console.log(e));


fs.writeFileSync('./lib/package.json', JSON.stringify({
	name: pkg.name,
	description: pkg.description,
	version: pkg.version,
	author: pkg.author,
	license: pkg.license || '',
	homepage: pkg.homepage,
	private: false,
	main: './lib/index.js',
	typings: './lib/index.d.ts',
	publishConfig: pkg.publishConfig,
	dependencies: pkg.dependencies,
	peerDependencies: pkg.peerDependencies,
}, null, 4));