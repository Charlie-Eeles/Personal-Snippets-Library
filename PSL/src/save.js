const fs = require("fs");
const { app } = require("electron").remote;

let saveButton = document.getElementById('save');

const path = app.getPath("appData") +"/psl/snippets"

if (!fs.existsSync(path)) {
    fs.mkdir(path, { recursive: true }, (err) => {
        if (err) return console.log(err);
      });
  }

saveButton.addEventListener("click", () => {
    fs.writeFile(path + "/tester.txt", "newtestttttbf", function (err) {
        if (err) return console.log(err);
      });
});