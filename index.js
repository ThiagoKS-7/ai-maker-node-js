const express = require('express')
const app = express()
const port = 3000
const { pipeline } = require('stream/promises');
const tf = require('@tensorflow/tfjs-node')
//const tf = require('@tensorflow/tfjs-node-gpu')

const cocossd = require('@tensorflow-models/coco-ssd');

const fs = require('fs');



async function load(buf) {
    const img = tf.node.decodeJpeg(buf);
    const model = await cocossd.load({ 'base': 'mobilenet_v2' });
    const predictions = await model.detect(img);

    console.log('Predictions: ');
    console.log(predictions);
    drawPredictions(predictions);
}

const downloadFile = async (url, path) => pipeline(
    (await fetch(url)).body,
    fs.createWriteStream(path),
    setTimeout(() => load(path), 2000)
);

app.get('/detect', (req, res) => {
    downloadFile('https://www.dailydemocrat.com/wp-content/uploads/2022/01/COVIDTESTKITS-01.jpg?w=1024', 'test.jpg');
    console.log("\x1b[33m%s\x1b[0m", "====================\n\nImage download suceeded!\n\n====================\n");
    console.log(tf.version)
    res.send('Hello World! Version: ' + tf.version.tfjs)
})

app.listen(port, () => console.log(`listening at http://localhost:${port}`))