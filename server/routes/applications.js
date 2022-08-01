import express from 'express';
import axios from 'axios'

const { API_KEY, API_URL } = process.env;


const router = express.Router();

const axiosHeaderConfig = {
    headers: {
        Authorization: API_KEY
    }
}

router.get('/applications', async (req, res) => {
    const applications = await axios.get(`${API_URL}/applications`, axiosHeaderConfig);

    res.send(applications.data);
});


router.get('/trans/:appId', async (req, res) => {
    const { appId } = req.params;
    console.log(appId);
    const transactions = await axios.get(`${API_URL}/trans/${appId}`, axiosHeaderConfig);

    res.status(200).send(transactions.data);
});


router.get('/cards/:appId', async (req, res) => {
    const { appId } = req.params;

    const cards = await axios.get(`${API_URL}/cards/${appId}`, axiosHeaderConfig);

    res.status(200).send(cards.data);
})

export default router;