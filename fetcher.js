const request = require('request');
const fs = require('fs');

const input = process.argv.slice(2);
const url = input[0];
const filePath = input[1];
let fileSize = 0;

const saveTextToFile = (error, response, body) => {
  if (error) {
    console.log('error:', error); // Print the error if one occurred
    console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
  } else if (fs.access(filePath, (err) => { 
    if (err) {
      console.log(err);
      process.exit();
    }
  })) {
  } else {
    fs.writeFile(filePath, body, () => {
      fs.stat(filePath, (err, stats) => {
        if (!err) {
          fileSize = stats.size;
          console.log(`Downloaded and saved ${fileSize} bytes to ${filePath}`);
        }
      });
    })
  }
};

request(url, saveTextToFile);