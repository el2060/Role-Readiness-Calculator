const fs = require('fs');
const path = require('path');

const indexHtmlPath = path.join(__dirname, 'index.html');
let indexHtml = fs.readFileSync(indexHtmlPath, 'utf8');

indexHtml = indexHtml.replace(
  /class="rr-logo"/,
  'class="rr-logo" style="filter: brightness(0) invert(1);"'
);
fs.writeFileSync(indexHtmlPath, indexHtml);

const appTsxPath = path.join(__dirname, 'src', 'App.tsx');
let appTsx = fs.readFileSync(appTsxPath, 'utf8');

appTsx = appTsx.replace(
  /className="h-7 sm:h-10 w-auto"/,
  'className="h-7 sm:h-10 w-auto" style={{ filter: \'brightness(0) invert(1)\' }}'
);
fs.writeFileSync(appTsxPath, appTsx);
console.log('Logo updated with white filter.');
