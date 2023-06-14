const fs = require('fs');
const request = require('request');

const url = process.argv[2];
const localPath = process.argv[3];

request(url, (error, response, body) => {
  if (error) {
    console.log('error:', error); // Print the error if one occurred
    console.log('statusCode:', response && response.statusCode); // Print the response status code if an error was received
  }

  fs.writeFile(localPath, body, err => {
    if (err) {
      console.error(err);
    }
    console.log(`Downloaded and saved ${body.length} bytes to ${localPath}`);
  });
});