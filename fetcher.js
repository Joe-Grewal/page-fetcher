const request = require('request');
const fs = require('fs');

const input = process.argv.slice(2);
const url = input[0];
const filePath = input[1];
let fileSize = 0;

const saveTextToFile = (error, response, body) => {
  if (error || (response && response.statusCode) !== 200) {
    console.log(error);
    console.log('statusCode:', response && response.statusCode);
    return;
  }
  fs.access(filePath, fs.constants.W_OK, (error) => { 
    if (error) {
      console.log(error);
      return;
    } else {
    fs.writeFile(filePath, body, () => {
      fs.stat(filePath, (error, stats) => {
        fileSize = stats.size;
        console.log(`Downloaded and saved ${fileSize} bytes to ${filePath}`);
        });
      });
    }
  });
};

request(url, saveTextToFile);