const http = require('http');
const fs = require('fs');
const path = require('path');

const sitePath = path.join(process.cwd(), 'src/data/site.ts');
const contentsPath = path.join(process.cwd(), 'src/data/contents.ts');

const regex = /['"`](\/(?:images|contents|gallery|album)[^'"`]+)['"`]/g;
let match;
const allPaths = new Set();
for (const p of [sitePath, contentsPath]) {
  if (fs.existsSync(p)) {
    const c = fs.readFileSync(p, 'utf8');
    while ((match = regex.exec(c)) !== null) {
      allPaths.add(match[1]);
    }
  }
}

console.log('Total URLs to test:', allPaths.size);

async function testAll() {
  const failed = [];
  const succeeded = [];
  for (const urlPath of allPaths) {
    const encodedPath = encodeURI(urlPath);
    await new Promise((resolve) => {
      http.get('http://localhost:3000' + encodedPath, (res) => {
        if (res.statusCode === 200) {
          succeeded.push(urlPath);
        } else {
          failed.push({ path: urlPath, status: res.statusCode });
        }
        resolve();
      }).on('error', (err) => {
        failed.push({ path: urlPath, error: err.message });
        resolve();
      });
    });
  }
  console.log('Succeeded:', succeeded.length);
  console.log('Failed:', failed.length);
  if (failed.length > 0) {
    console.log('Failures:');
    for (const f of failed) {
      console.log(`  ${f.status || f.error}: ${f.path}`);
    }
  }
}

testAll();
