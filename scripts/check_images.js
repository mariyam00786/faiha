const fs = require('fs');
const path = require('path');

const rootDir = process.cwd();
const publicDir = path.join(rootDir, 'public');
const srcDir = path.join(rootDir, 'src');

function getAllFiles(dir, exts = []) {
  let files = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files = files.concat(getAllFiles(fullPath, exts));
    } else if (exts.length === 0 || exts.some(ext => entry.name.endsWith(ext))) {
      files.push(fullPath);
    }
  }
  return files;
}

const srcFiles = getAllFiles(srcDir, ['.ts', '.tsx', '.js', '.jsx', '.css', '.json']);
console.log(`Found ${srcFiles.length} source files to scan.`);

const imageRegex = /['"`](\/(?:images|contents|gallery|album)[^'"`]+)['"`]/g;
const references = new Map();

for (const file of srcFiles) {
  const content = fs.readFileSync(file, 'utf8');
  let match;
  while ((match = imageRegex.exec(content)) !== null) {
    const ref = match[1];
    if (!references.has(ref)) {
      references.set(ref, []);
    }
    references.get(ref).push(path.relative(rootDir, file));
  }
}

console.log(`Found ${references.size} unique image references.`);

// Check each reference
const missing = [];
const caseMismatches = [];
const valid = [];

function checkExactCase(publicSubPath) {
  const parts = publicSubPath.replace(/^\//, '').split('/');
  let currentDir = publicDir;
  for (const part of parts) {
    if (!fs.existsSync(currentDir)) return false;
    const entries = fs.readdirSync(currentDir);
    const exact = entries.find(e => e === part);
    if (!exact) {
      const inexact = entries.find(e => e.toLowerCase() === part.toLowerCase());
      if (inexact) {
        return { caseMismatch: true, expected: inexact, actual: part, pathSoFar: currentDir };
      }
      return { notFound: true, part, dir: currentDir };
    }
    currentDir = path.join(currentDir, exact);
  }
  return { ok: true, fullPath: currentDir };
}

for (const [ref, locations] of references.entries()) {
  const result = checkExactCase(ref);
  if (result.ok) {
    valid.push(ref);
  } else if (result.caseMismatch) {
    caseMismatches.push({ ref, result, locations });
  } else {
    missing.push({ ref, result, locations });
  }
}

console.log(`\n--- SUMMARY ---`);
console.log(`Valid: ${valid.length}`);
console.log(`Case Mismatches: ${caseMismatches.length}`);
console.log(`Missing: ${missing.length}`);

if (caseMismatches.length > 0) {
  console.log('\n--- CASE MISMATCHES ---');
  for (const item of caseMismatches) {
    console.log(`Ref: "${item.ref}"`);
    console.log(`  Actual on disk: "${item.result.expected}" vs "${item.result.actual}"`);
    console.log(`  Locations: ${item.locations.join(', ')}`);
  }
}

if (missing.length > 0) {
  console.log('\n--- MISSING FILES ---');
  for (const item of missing) {
    console.log(`Ref: "${item.ref}"`);
    console.log(`  Failed at part: "${item.result.part}" in "${path.relative(rootDir, item.result.dir)}"`);
    console.log(`  Locations: ${item.locations.join(', ')}`);
  }
}
