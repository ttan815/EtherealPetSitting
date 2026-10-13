const express = require("express");
const app = express();

app.listen(5001, run())

function run() {
    console.log("Hello world");
}