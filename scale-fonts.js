const fs = require('fs');
const path = require('path');

const walkSync = (dir, filelist = []) => {
  fs.readdirSync(dir).forEach(file => {
    const dirFile = path.join(dir, file);
    try {
      filelist = walkSync(dirFile, filelist);
    } catch (err) {
      if (err.code === 'ENOTDIR' || err.code === 'EBADF') {
        if (dirFile.endsWith('.css') || dirFile.endsWith('.tsx') || dirFile.endsWith('.js')) {
          filelist.push(dirFile);
        }
      } else {
        throw err;
      }
    }
  });
  return filelist;
};

const processFiles = () => {
  const files = walkSync('./src');
  
  files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    let changed = false;

    if (file.endsWith('.css')) {
      // Replace font-size: XXpx; with font-size: calc(XXpx + var(--font-add, 0px));
      // Only if not already calc
      const newContent = content.replace(/font-size:\s*(\d+)px;/g, (match, p1) => {
        return `font-size: calc(${p1}px + var(--font-add, 0px));`;
      });
      if (newContent !== content) {
        content = newContent;
        changed = true;
      }
    } else if (file.endsWith('.tsx') || file.endsWith('.js')) {
      // Replace fontSize: 'XXpx' with fontSize: 'calc(XXpx + var(--font-add, 0px))'
      const newContent = content.replace(/fontSize:\s*['"](\d+)px['"]/g, (match, p1) => {
        return `fontSize: 'calc(${p1}px + var(--font-add, 0px))'`;
      });
      if (newContent !== content) {
        content = newContent;
        changed = true;
      }
    }

    if (changed) {
      fs.writeFileSync(file, content, 'utf8');
      console.log('Updated', file);
    }
  });
};

processFiles();
