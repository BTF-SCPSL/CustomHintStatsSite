const fs = require('fs');
const https = require('http');

const API_URL = 'http://your-server-ip:8080/connections';

function fetchConnections(callback) {
  const req = http.get(API_URL, res => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => {
      try {
        const json = JSON.parse(data);
        callback(null, json.connections ?? 0);
      } catch (e) {
        callback(e, 0);
      }
    });
  });

  req.on('error', err => callback(err, 0));
}

function generateSVG(count) {
  const label = 'Used on';
  const value = `${count} servers`;

  const labelWidth = 60;
  const valueWidth = 90;
  const totalWidth = labelWidth + valueWidth;

  return `
<svg xmlns="http://www.w3.org/2000/svg" width="${totalWidth}" height="20">
  <rect width="${labelWidth}" height="20" fill="#555"/>
  <rect x="${labelWidth}" width="${valueWidth}" height="20" fill="#e05d44"/>
  <text x="30" y="14" fill="#fff" font-family="Verdana" font-size="11">${label}</text>
  <text x="${labelWidth + 45}" y="14" fill="#fff" font-family="Verdana" font-size="11">${value}</text>
</svg>`;
}

fetchConnections((err, count) => {
  if (err) {
    console.error('Error fetching connections:', err.message);
    count = 0;
  }

  const svg = generateSVG(count);
  fs.writeFileSync('badge.svg', svg.trim());
  console.log(`badge.svg updated with ${count} servers`);
});
