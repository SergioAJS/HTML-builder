const fs = require('fs');
const path = require('path');

(async function copyDir(sourcePath = path.join(__dirname, 'files', '/'), outputPath = path.join(__dirname, 'copy-files', '/')) {
  try {
    const sourceFiles = await fs.promises.readdir(sourcePath, {withFileTypes: true});

    await fs.promises.mkdir((outputPath), {recursive: true});

    const outputFiles = await fs.promises.readdir(outputPath, {withFileTypes: true});

    for (const file of outputFiles) {
      await fs.promises.rm(path.join(outputPath, file.name), {recursive: true});
    }

    for (const file of sourceFiles) {
      if (file.isFile()) {
        await fs.promises.copyFile(path.join(sourcePath, file.name), path.join(outputPath, file.name));
      } else {
        await copyDir((path.join(sourcePath, file.name, '/')), (path.join(outputPath, file.name, '/')));
      }
    }
  } catch (err) {
    console.log(err);
  }
})();
