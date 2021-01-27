const fs = require("fs");
const { app } = require("electron").remote;
const load = require("monaco-loader");

const path = app.getPath("appData") +"/psl/snippets"
const monacoDiv = document.getElementById("editor")

load().then((monaco) => {
    
    codeEditor = monaco.editor.create(monacoDiv, {
        language: "javascript",
        theme: "vs-dark",
        automaticLayout: true
    })
})


fs.readdir(path, (err, files) => {
    if (err) return console.log(err);
    let fileArray = [];
    for (let file of files){
        let innerArray = [];
        fs.readFile(path + "/" + file, (err, data) => {
            if (err) return console.log(err);
            innerArray.push(data.toString());
          });
        let fileName = file.replace(".txt", "");
        innerArray.push(fileName)
        fileArray.push(innerArray)
    }

    let list = document.querySelector(".snippet-list");

    for(let i=1; i<fileArray.length;i++){
        let item = document.createElement("li");
        item.appendChild(document.createTextNode(fileArray[i][0]));
        list.appendChild(item);
    }

    let title = document.querySelector(".title");
    title.innerHTML = fileArray[0][1];
    load().then(() => {codeEditor.setValue(fileArray[0][1]);})
    console.log(fileArray[0])
  });


