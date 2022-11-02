const fs = require('fs');
const path = require('path');
const process = require('process');
const readLine = require('readline');

const filePath = path.join(__dirname, 'test.txt');
const writeableStream = fs.createWriteStream(filePath);

const rl = readLine.createInterface({
  input: process.stdin,
  output: process.stdout,
});

fs.promises.writeFile(filePath, '');

(function gg(question = 'Hello! Please enter some text\n') {
  rl.question(question, (answer) => {
    if (answer.match(/^exit/)) {
      process.exit();
    }
    writeableStream.write(`${answer}\n`);
    // console.log(gg);
    gg(question = '');
  });
})();

process.on('exit', () => console.log('Bye, bye'));
