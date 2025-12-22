import fs from 'fs';
import path from 'path';

const folders = ['CM', 'CR', 'GO', 'PE', 'PR'];

// Generate checklists index
console.log('=== Checklists Index ===');
folders.forEach(folder => {
  const dir = path.join('public/checklists-json', folder);
  if (fs.existsSync(dir)) {
    const files = fs.readdirSync(dir).filter(f => f.endsWith('.json') && f !== 'index.json');
    const index = {};
    
    files.forEach(file => {
      const match = file.match(/^(\d+)_/);
      if (match) {
        index[match[1]] = file;
      }
    });
    
    fs.writeFileSync(path.join(dir, 'index.json'), JSON.stringify(index, null, 2));
    console.log(`Checklists ${folder}: ${Object.keys(index).length} entries`);
  }
});

// Generate resumos index
console.log('\n=== Resumos Index ===');
folders.forEach(folder => {
  const dir = path.join('public/resumos-json', folder);
  if (fs.existsSync(dir)) {
    const files = fs.readdirSync(dir).filter(f => f.endsWith('.json') && f !== 'index.json');
    const index = {};
    
    files.forEach(file => {
      const match = file.match(/^(\d+)_/);
      if (match) {
        index[match[1]] = file;
      }
    });
    
    fs.writeFileSync(path.join(dir, 'index.json'), JSON.stringify(index, null, 2));
    console.log(`Resumos ${folder}: ${Object.keys(index).length} entries`);
  }
});

console.log('\nDone!');
