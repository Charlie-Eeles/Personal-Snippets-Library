const fs = require("fs");
const { app } = require("electron").remote;

const path = app.getPath("appData") +"/psl/snippets"

fs.readdir(path, (err, files) => {
    if (err) return console.log(err);
    for (let file of files){
        fs.readFile(path + "/" + file, (err, data) => {
            if (err) return console.log(err);
            console.log(data.toString());
          });
        let fileName = file.replace(".txt", "");
        console.log(fileName);  
    }
  });


