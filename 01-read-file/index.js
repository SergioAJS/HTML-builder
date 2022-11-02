const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname, 'text.txt');
const reader = fs.createReadStream(filePath);
reader.on('data', (chunk) => process.stdout.write(chunk.toString()));
