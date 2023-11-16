const fs = require('fs');
const axios = require('axios');
const args = process.argv.slice(2);
if (args[0]) {
    if (isURL(args[0])) {
      webCat();
    } else {
      cat();
    }
  } else {
    console.error('Please provide a URL or file path as an argument.');
    process.exit(3);
}

function isURL(str) {
    return /^https?:\/\//.test(str);
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

async function webCat(){
    const url = args[0];
    try{
        let resp = await axios.get(url);
        console.log(resp);
    }
    catch (error) {
        console.error('Error getting the link:', error.message);
        process.exit(2);
    }
}