const fs = require('fs');
const path = require('path');
const c = require('ansi-colors');
const { version } = require('../../package.json');

switch (process.argv[2]) {
  // Post
  case '--post': {
    console.info(`${c.cyan('[Postbuild]')} ${c.green('Creating conf.json file...')}`);
    fs.writeFileSync(path.resolve(__dirname, '../../dist/conf.json'), JSON.stringify({ version }));
    console.info(`${c.cyan('[Postbuild]')} ${c.green('Build succeeded.')}`);
    break;
  }
}
