const fs = require('fs');

fs.readFile('data.txt', "utf8", (err, data) => {
  if (err) {
    console.error("Error reading .env file:", err);
    return;
  }
  console.log("Contents of .env file:", data);


  fs.appendFile('data.txt', "\tnội dung 2", (err) => {
    if (err) {
      console.error("Error writing to data.txt file:", err);
      return;
    }
  });
});