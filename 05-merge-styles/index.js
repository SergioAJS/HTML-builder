const fs = require('fs');
const path = require('path');

(async function bundle(sourcePath, outputPath) {
  try {
    const sourceFiles = await fs.promises.readdir(sourcePath);
    const bundleFiles = await fs.promises.readdir(outputPath);

    for (const bundleFile of bundleFiles) {
      let extBundle = path.extname(bundleFile);

      if (extBundle === '.css') {
        await fs.promises.rm(path.join(outputPath, 'bundle.css'));
      }
    }

    for (const file of sourceFiles) {
      let ext = path.extname(file);

      if (ext === '.css') {
        let reader = fs.createReadStream(path.join(sourcePath, file));
        await fs.promises.appendFile(path.join(outputPath, 'bundle.css'), reader);
        await fs.promises.appendFile(path.join(outputPath, 'bundle.css'), '\n');
      }
    }

  } catch (err) {
    console.log(err);
  }
})(path.join(__dirname, 'styles', '/'), path.join(__dirname, 'project-dist', '/'));
