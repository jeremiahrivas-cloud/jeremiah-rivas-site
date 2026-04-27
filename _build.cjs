const fs = require('fs');
let c = fs.readFileSync('src/components/Projects.jsx', 'utf8');
c = c.replace(
  "This site — a governed AI deployment with layered security, a grounded career intelligence assistant, and a published risk assessment. Built solo using AI-assisted development.",
  "This site — a governed AI deployment with layered security, a professional AI assistant grounded in published methodology, and a platform risk assessment. Built solo using AI-assisted development."
);
fs.writeFileSync('src/components/Projects.jsx', c, 'utf8');
console.log('done');
