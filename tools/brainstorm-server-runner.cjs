const fs = require('fs');
const Module = require('module');
const path = require('path');

const targetFile = process.argv[2];

if (!targetFile) {
  console.error('Usage: node brainstorm-server-runner.cjs <server.js>');
  process.exit(1);
}

const source = fs.readFileSync(targetFile, 'utf8');
const wrapped = `${source}\nstartServer();\n`;

const compiled = new Module(targetFile, module.parent);
compiled.filename = targetFile;
compiled.paths = Module._nodeModulePaths(path.dirname(targetFile));
compiled._compile(wrapped, targetFile);
