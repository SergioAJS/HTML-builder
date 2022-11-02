const fs = require('fs');
const path = require('path');

(async function readDir(dirPath = path.join(__dirname, 'secret-folder', '/')) {
  try {
    const files = await fs.promises.readdir(dirPath, {withFileTypes: true});
    for (const file of files) {
      if (file.isFile()) {
        let fileStat = await fs.promises.stat(dirPath + (file.name).toString());
        if ((file.name).indexOf('.') !== 0) {
          let name = (file.name).slice(0, (file.name).indexOf('.'));
          let ext = (path.extname(file.name)).replace('.', '');
          let size = (fileStat.size / 1024).toFixed(2);
          console.log(`${name} - ${ext} - ${size} KB`);
        }
      } else {
        readDir(path.join(dirPath, file.name, '/'));
      }
    }
  } catch (err) {
    console.log(err);
  }
})();
