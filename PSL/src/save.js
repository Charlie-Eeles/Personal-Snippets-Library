const fs = require("fs");
const { app, getCurrentWindow } = require("electron").remote;

let saveButton = document.getElementById('save');

const path = app.getPath("appData") +"/psl/snippets"

if (!fs.existsSync(path)) {
    fs.mkdir(path, { recursive: true }, (err) => {
        if (err) return console.log(err);
      });
  }

saveButton.addEventListener("click", () => {
  const monacoValue = codeEditor.getValue("#editor");
  const title = document.querySelector(".title").value;

  fs.writeFile(path + "/" + title + ".txt", monacoValue, function (err) {
      if (err) return console.log(err);
    });
  getCurrentWindow().reload();
});