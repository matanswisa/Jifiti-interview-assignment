import express from 'express';
import bodyParser from 'body-parser';
import axios from 'axios';
import cors from 'cors';

const app = express();
const BASE_URL = 'https://rpnszaidmg.execute-api.eu-west-1.amazonaws.com/Prod';
const KEY = '9874654654987654658';

app.use(bodyParser.urlencoded({}));
app.use(cors({
    origin: "*"
}))

let inc = 0;

app.get('/api/applications', async (req, res) => {
    console.log(inc);
    inc++;
    const applications = await axios.get(`${BASE_URL}/applications`, {
        headers: {
            Authorization: KEY
        }
    });
    console.log("applications = ", applications.data.length);
    res.send(applications.data);
})


app.get('/api/trans/:appId', async (req, res) => {
    const { appId } = req.params;
    console.log(appId);
    const transactions = await axios.get(`${BASE_URL}/trans/${appId}`, {
        headers: {
            Authorization: KEY
        }
    });

    console.log(transactions.data);
    res.status(200).send(transactions.data);
})

app.get('/api/cards/:appId', async (req, res) => {
    const { appId } = req.params;
    console.log(appId);
    const cards = await axios.get(`${BASE_URL}/cards/${appId}`, {
        headers: {
            Authorization: KEY
        }
    });

    console.log(cards.data);
    res.status(200).send(cards.data);
})


app.listen(8000, () => {
    console.log('app is running on port 8000');
});