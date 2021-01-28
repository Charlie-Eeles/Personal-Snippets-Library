const fs = require("fs");
const { app, getCurrentWindow } = require("electron").remote;
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

    if (fileArray.length > 0){
        for(let i=0; i<fileArray.length;i++){
            let item = document.createElement("li");
            let button = document.createElement("button");
            button.innerHTML = fileArray[i][0];
            button.classList.add("snippet-button");
            item.classList.add("snippet-li");
            button.id = i;
            item.appendChild(button);
            list.appendChild(item);
        }
    }
    else{
        let item = document.createElement("li");
        item.appendChild(document.createTextNode("No Snippets"));
        list.appendChild(item);
    }

    let title = document.querySelector(".title");
    if (fileArray[0] !== undefined){
        title.placeholder = "New Snippet";
        let snippetButton = document.getElementsByClassName("snippet-button");
        for(let i=0;i<snippetButton.length;i++){
            snippetButton[i].addEventListener("click", () => {
                title.value = fileArray[i][0];
                codeEditor.setValue(fileArray[i][1]);
            });
        }
        let newSnippetButton = document.getElementById("new-snippet");
        newSnippetButton.addEventListener("click", () => {
            title.value = "";
            title.placeholder = "New Snippet";
            codeEditor.setValue("");
        })
        let deleteButton = document.getElementById("delete-snippet");
        deleteButton.addEventListener("click", () => {
            let deleteTitle = document.querySelector(".title").value;
            if (deleteTitle != ""){
                let deletePath = path + "/" + deleteTitle + ".txt"
                fs.unlink(deletePath, (err) => {
                    if (err) return console.log(err);
                })
                console.log("Successfully removed snippet.")
                getCurrentWindow().reload();
            }
            else{
                console.log("Nothing to delete.")
            }
        })
        let search = document.querySelector("#search-snippets")
        search.addEventListener("input", () => {
            let searchVal = document.querySelector("#search-snippets").value;
            if(searchVal !== ""){
                let searchFileArray = [];
                for(i in fileArray){
                    let string = fileArray[i][0].toLowerCase();
                    let lowerSearch = searchVal.toLowerCase();
                    if(string.includes(lowerSearch)){
                        searchFileArray.push(fileArray[i])
                    }
                    
                }
                if (searchFileArray.length !== 0){
                    list.innerHTML = ""
                    for(let i=0; i<searchFileArray.length;i++){
                        let item = document.createElement("li");
                        let button = document.createElement("button");
                        button.innerHTML = searchFileArray[i][0];
                        button.classList.add("snippet-button");
                        item.classList.add("snippet-li");
                        button.id = i;
                        item.appendChild(button);
                        list.appendChild(item);
                    }
                }
                else{
                    list.innerHTML = "No matches"
                }
            }
            else{
                list.innerHTML = ""
                if (fileArray.length > 0){
                    for(let i=0; i<fileArray.length;i++){
                        let item = document.createElement("li");
                        let button = document.createElement("button");
                        button.innerHTML = fileArray[i][0];
                        button.classList.add("snippet-button");
                        item.classList.add("snippet-li");
                        button.id = i;
                        item.appendChild(button);
                        list.appendChild(item);
                    }
                }
                else{
                    let item = document.createElement("li");
                    item.appendChild(document.createTextNode("No Snippets"));
                    list.appendChild(item);
                }
            }
        })
    }
    else{
        title.placeholder = "New Snippet";
    }

  });


