const fs = require("fs");
const { app } = require("electron").remote;

const path = app.getPath("appData") +"/psl/snippets"

fs.readdir(path, (err, files) => {
    if (err) return console.log(err);
    for (let file of files){
        let fileName = file.replace(".txt", "");
        console.log(fileName);  
    }
  });
