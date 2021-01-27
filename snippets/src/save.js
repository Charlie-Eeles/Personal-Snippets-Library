const fs = require("fs");
const { dialog, app } = require("electron").remote;

let saveButton = document.getElementById('save');

const path = app.getPath("appData") +"/testerrrr"

if (!fs.existsSync(path)) {
    fs.mkdir(path, { recursive: true }, (err) => {
        if (err) throw err;
      });
  }

saveButton.addEventListener("click", () => {
    fs.writeFile(path + "/tester.txt", "newtestttttbf", function (err) {
        if (err) return console.log(err);
        console.log('Hello World > helloworld.txt');
      })
});