const fs = require("fs");
const { app, getCurrentWindow } = require("electron").remote;

const saveButton = document.getElementById("save");
const path = app.getPath("appData") + "/psl/snippets";

saveButton.addEventListener("click", () => {
  const monacoValue = codeEditor.getValue("#editor");
  const title = document.querySelector(".title").value || "Untitled(" + monacoValue.substring(0,5) + ")";
  // If there's no title set, it'll name the file Untitled(*****) where ***** is the first 5 characters of
  // the Monaco Editor value, making it possible to find the untitled files with proper context. 

  fs.writeFile(path + "/" + title + ".txt", monacoValue, function (err) {
      if (err) return console.log(err);
    });
  getCurrentWindow().reload();
});