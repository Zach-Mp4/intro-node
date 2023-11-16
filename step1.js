const fs = require('fs');
const args = process.argv.slice(2);
if (!args[1]) {
  cat();
}

function cat(){
  const path = args[0];
  try {
    const data = fs.readFileSync(path, 'utf8');
    console.log('File content:', data);
  } catch (error) {
    console.error('Error reading the file:', error.message);
    process.exit(1);
  }

}
