import fs from 'fs';
import path from 'path';
import postcss from 'postcss';
import cssnano from 'cssnano';
import autoprefixer from 'autoprefixer';

const isVerbose = !!process.env.VERBOSE
const filepath = process.argv[2];
const filename = path.basename(filepath);
const content = fs.readFileSync(filepath, 'utf-8');

const processor = postcss([autoprefixer({browsers: 'last 3 versions'}), cssnano({ mergeRules: false })]);

let config = {
  from: filename,
  to: filename,
}

if (isVerbose) {
  config.map = {inline: false};
}

processor
  .process(content, config)
  .then(result => {
    fs.writeFileSync(filepath, result.css, 'utf-8');
    fs.writeFileSync(`${filepath}.map`, result.map, 'utf-8');
  })
  .catch(err => console.log(err));
