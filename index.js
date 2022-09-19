const express = require('express')
const fs = require('fs');
const tf = require("@tensorflow/tfjs");
//const tfc = require("@tensorflow/tfjs-core");
//const jpeg_js = require("jpeg-js");
const cocoSsd = require('@tensorflow-models/coco-ssd');
//const cv = require('opencv4nodejs');
const app = express()
const port = 3000
const { pipeline } = require('stream/promises');
require('@tensorflow/tfjs-backend-cpu');
require('@tensorflow/tfjs-backend-webgl');
require("@tensorflow/tfjs-converter");

let img = '';
const downloadFile = async (url, path) => pipeline(
    (await fetch(url)).body,
    fs.createWriteStream(path),
    setTimeout(() => predict(), 2000)
);

app.get('/teste', (req, res) => {
    const model = cocoSsd.load();
    downloadFile('https://www.dailydemocrat.com/wp-content/uploads/2022/01/COVIDTESTKITS-01.jpg?w=1024', 'test.jpg');
    console.log("\x1b[33m%s\x1b[0m", "====================\n\nImage download suceeded!\n\n====================\n");
    console.log(tf.version)
    res.send('Hello World! Version: ' + tf.version.tfjs)
})

app.listen(port, () => console.log(`listening at http://localhost:${port}`))