const fs = require('fs');
const path = require('path');

(async function bundleHTML(sourcePath = path.join(__dirname, '/'), outputPath = path.join(__dirname, 'project-dist', '/')) {
  try {
    await fs.promises.mkdir(outputPath, {recursive: true});
    const outputDir = await fs.promises.readdir(outputPath);

    for (const dir of outputDir) {
      await fs.promises.rm((path.join(outputPath, dir)), {recursive: true});
    }

    const sourceHTML = await fs.promises.readdir(__dirname);

    for (const html of sourceHTML) {
      let ext = path.extname(html);

      if (ext === '.html') {
        const template = await fs.promises.readFile(path.join(sourcePath, html), 'utf-8');
        const componentFiles = await fs.promises.readdir(path.join(sourcePath, 'components'));
        let index = template;

        for (const component of componentFiles) {
          let reader = await fs.promises.readFile(path.join(sourcePath, 'components', '/', component));
          let name = (component).slice(0, (component).indexOf('.'));
          index = index.replace(`{{${name}}}`, reader);
        }

        await fs.promises.appendFile(path.join(outputPath, 'index.html'), index);
      }
    }
    await bundleCSS();
    await copyAssets();
  } catch (err) {
    console.log(err);
  }
})();

async function bundleCSS(sourcePath = path.join(__dirname, 'styles', '/'), outputPath = path.join(__dirname, 'project-dist', '/')) {
  try {
    const sourceFiles = await fs.promises.readdir(sourcePath);
    const bundleFiles = await fs.promises.readdir(outputPath);

    for (const bundleFile of bundleFiles) {
      let extBundle = path.extname(bundleFile);
      if (extBundle === '.css') {
        await fs.promises.rm(path.join(outputPath, 'style.css'));
      }
    }

    for (const file of sourceFiles) {
      let ext = path.extname(file);
      if (ext === '.css') {
        let reader = fs.createReadStream(path.join(sourcePath, file));
        await fs.promises.appendFile(path.join(outputPath, 'style.css'), reader);
      }
    }
  } catch (err) {
    console.log(err);
  }
}

async function copyAssets(sourcePath = path.join(__dirname, 'assets', '/'), outputPath = path.join(__dirname, 'project-dist', '/', 'assets', '/')) {
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
        await copyAssets((path.join(sourcePath, file.name, '/')), (path.join(outputPath, file.name, '/')));
      }
    }
  } catch (err) {
    console.log(err);
  }
}
