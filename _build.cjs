const fs = require('fs');
let g = fs.readFileSync('.gitignore', 'utf8');
if (!g.includes('_build.cjs')) {
  g += '\n_build.cjs\n_write.mjs\n';
  fs.writeFileSync('.gitignore', g, 'utf8');
  console.log('gitignore updated');
} else {
  console.log('already present');
}

