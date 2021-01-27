const load = require("monaco-loader");

load().then((monaco) => {
    const div = document.getElementById("editor")

    codeEditor = monaco.editor.create(div, {
        language: "javascript",
        theme: "vs-dark",
        automaticLayout: true
    })
})
