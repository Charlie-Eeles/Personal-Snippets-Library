const { app } = require("electron").remote;
const fs = require("fs");

const path = app.getPath("appData") +"/psl/snippets"

if (!fs.existsSync(path)) {
    fs.mkdir(path, { recursive: true }, (err) => {
        if (err) return console.log(err);
    });
}