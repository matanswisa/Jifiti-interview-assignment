const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const app = express();

app.use(bodyParser.urlencoded({}));

// app.get('/applications', async (req, res) => {
//     res.send({ success: true });
// })



app.listen(8000, () => {
    console.log('app is running on port 8000');
});