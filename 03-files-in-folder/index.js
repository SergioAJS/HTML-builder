const fs = require('fs');
const path = require('path');

(async function readDir(dirPath) {
  try {
    const files = await fs.promises.readdir(dirPath, {withFileTypes: true});

    for (const file of files) {
      if (file.isFile()) {
        let fileStat = await fs.promises.stat(dirPath + (file.name).toString());
        let name = (file.name).slice(0, (file.name).indexOf('.'));
        let ext = (path.extname(file.name)).replace('.', '');
        let size = fileStat.size;

        console.log(`${name} - ${ext} - ${size} B`);
      }
    }

  } catch (err) {
    console.log(err);
  }
})(path.join(__dirname, 'secret-folder', '/'));
