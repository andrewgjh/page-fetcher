const args = process.argv.slice(2);
const request = require('request');
const fs = require('fs')
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});


request(args[0], (error, response, body) => {
  if (error) {
    console.log(error);
  }
  if (fs.existsSync(args[1])) {
    rl.question("File path already exist. Would you like to overwrite? y/n", (answer) => {
      if (answer === "y") {
        fs.writeFile(args[1], body, err => {
          if (err) {
            console.error(err);
            process.exit();
          }
          let stats = fs.statSync(args[1]);
          console.log(`Downloaded and saved ${stats.size} bytes to ${args[1]}`)
          rl.close();
        })
      } else {
        rl.close()
      }
    })
  } else {
    fs.writeFile(args[1], body, err => {
      if (err) {
        console.error(err)
        process.exit();
      }
      let stats = fs.statSync(args[1]);
      console.log(`Downloaded and saved ${stats.size} bytes to ${args[1]}`)
      rl.close();
    })
  }
});