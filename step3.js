const fs = require('fs');
const axios = require('axios');
const args = process.argv.slice(2);
let out = false;
let outputFile;
let input = args[0];
if (input === '--out'){
    input = args[2];
    out = true;
    outputFile = args[1];
}

if (input) {
    if (isURL(input)) {
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
  const path = input;
  try {
    const data = fs.readFileSync(path, 'utf8');
    if (out){
        fs.writeFile(outputFile, data, 'utf8', (error) => {
            if (error) {
              console.error('Error writing to the file:', error.message);
            } else {
              console.log(`No output but data was written to ${outputFile}`);
            }
          });
    }
    else{
        console.log('File content:', data);
    }
  } catch (error) {
    console.error('Error reading the file:', error.message);
    process.exit(1);
  }

}

async function webCat(){
    const url = input;
    try{
        let resp = await axios.get(url);
        resp = JSON.stringify(resp.data);
        if (out){
            fs.writeFile(outputFile, resp, 'utf8', (error) => {
                if (error) {
                  console.error('Error writing to the file:', error.message);
                } else {
                  console.log(`No output but data was written to ${outputFile}`);
                }
              });
        }
        else{
            console.log(resp);
        }
    }
    catch (error) {
        console.error('Error getting the link:', error.message);
        process.exit(2);
    }
}