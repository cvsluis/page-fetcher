const fs = require('fs');
const request = require('request');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const url = process.argv[2];
const localPath = process.argv[3];

if (fs.existsSync(localPath)) {
  rl.question("File path already exists! Would you like to overide? Y or N  ", (answer) => {
    if (answer === 'Y') {
      makeRequest();
    } else {
      console.log("Try again with new file path.");
      process.exit();
    }
  });
}

const makeRequest = () => {
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
      process.exit();
    });
  });
};