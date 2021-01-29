const fs = require("fs");
const { app, getCurrentWindow } = require("electron").remote;
const load = require("monaco-loader");

const path = app.getPath("appData") +"/psl/snippets";
const monacoDiv = document.getElementById("editor");

load().then((monaco) => {
    // This makes it so the editor is not loaded until the rest of the page
    // has fully loaded.

    const languageDropDown = document.getElementById("language");
    const language = languageDropDown.value;

    codeEditor = monaco.editor.create(monacoDiv, {
        language: language || "javascript",
        theme: "vs-dark",
        automaticLayout: true
    })

    const model = codeEditor.getModel();
    languageDropDown.addEventListener("click", () => {
        let newLanguage = languageDropDown.value;
        monaco.editor.setModelLanguage(model, newLanguage);
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

        const fileName = file.replace(".txt", "");
        innerArray.push(fileName);
        fileArray.push(innerArray);
    }
    
    const list = document.querySelector(".snippet-list");

    if (fileArray.length !== 0){

        for(let i=0; i<fileArray.length;i++){
            const item = document.createElement("li");
            const button = document.createElement("button");

            button.innerHTML = fileArray[i][0];

            button.classList.add("snippet-button");
            item.classList.add("snippet-li");
            button.id = i;

            item.appendChild(button);
            list.appendChild(item);
        };
        
    }
    else{

        const item = document.createElement("li");
        item.appendChild(document.createTextNode("You have no snippets."));
        list.appendChild(item);

    }

    const title = document.querySelector(".title");

    if (fileArray[0] !== undefined){
        // Condition for if any entries exist in the folder.
        // Saves resource by not running any of these functions when unecessary.

        title.placeholder = "New Snippet";
        const snippetButton = document.getElementsByClassName("snippet-button");

        for(let i=0;i<snippetButton.length;i++){
            // Loops over all the snippet buttons and adds the event listener to each.

            snippetButton[i].addEventListener("click", () => {
                title.value = fileArray[i][0];
                codeEditor.setValue(fileArray[i][1]);
            });

        };
        
        const newSnippetButton = document.getElementById("new-snippet");

        newSnippetButton.addEventListener("click", () => {

            title.value = "";
            title.placeholder = "New Snippet";
            codeEditor.setValue("");

        });

        const deleteButton = document.getElementById("delete-snippet");

        deleteButton.addEventListener("click", () => {

            const titleValue = document.querySelector(".title").value;

            if (titleValue !== ""){
                
                if (window.confirm("Are you sure you want to delete this snippet: " + titleValue + " ?")){
                    const deletePath = path + "/" + titleValue + ".txt";
                    
                    fs.unlink(deletePath, (err) => {
                        if (err) return console.log(err);
                    })

                    alert("Successfully removed snippet.");
                    getCurrentWindow().reload();
                };

            }
            else{
                alert("Please select the snippet you'd like to remove.");
            };

        });

        const search = document.querySelector("#search-snippets");

        search.addEventListener("input", () => {

            const searchVal = document.getElementById("search-snippets").value;
            
            if(searchVal !== ""){
            // This condition checks to see if anything was typed in the search bar.

                list.innerHTML = ""
                // Resets the snippet list so it can be repopulated.
                let searchFileArray = [];
                // This array is declared so I don't need to delete the original. 

                for(i in fileArray){
                    const string = fileArray[i][0].toLowerCase();
                    const lowerSearch = searchVal.toLowerCase();

                    if(string.includes(lowerSearch)){
                        searchFileArray.push(fileArray[i])
                    };
                    
                };

                if (searchFileArray.length !== 0){
                // ie. If there was a match to the search.

                    for(let i=0; i<searchFileArray.length;i++){

                        const item = document.createElement("li");
                        const button = document.createElement("button");
                        button.innerHTML = searchFileArray[i][0];
                        button.classList.add("snippet-button");
                        item.classList.add("snippet-li");
                        button.id = i;
                        item.appendChild(button);
                        list.appendChild(item);

                    }

                    const snippetButton = document.getElementsByClassName("snippet-button");

                    for(let i=0;i<snippetButton.length;i++){
                    // Same event listener as before but works on the new array.

                        snippetButton[i].addEventListener("click", () => {
                            title.value = searchFileArray[i][0];
                            codeEditor.setValue(searchFileArray[i][1]);
                        });
                    };

                }
                else{
                    list.innerHTML = "No matches were found."
                };

            }
            else{
                
                list.innerHTML = "";
                if (fileArray.length > 0){
                    for(let i=0; i<fileArray.length;i++){

                        const item = document.createElement("li");
                        const button = document.createElement("button");

                        button.innerHTML = fileArray[i][0];

                        button.classList.add("snippet-button");
                        item.classList.add("snippet-li");

                        button.id = i;

                        item.appendChild(button);
                        list.appendChild(item);
                    };

                    const snippetButton = document.getElementsByClassName("snippet-button");

                    for(let i=0;i<snippetButton.length;i++){

                        snippetButton[i].addEventListener("click", () => {
                            title.value = fileArray[i][0];
                            codeEditor.setValue(fileArray[i][1]);
                        });

                    };
                }
                else{
                    const item = document.createElement("li");
                    item.appendChild(document.createTextNode("You have no snippets."));
                    list.appendChild(item);
                };
            }
        })
    }
    else{
        title.placeholder = "New Snippet";
    };
  });


