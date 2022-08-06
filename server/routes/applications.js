import express from 'express';
import axios from 'axios'
import { getCard, getTransType } from '../utils/transactions.js';

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

router.get('/application/:appId', async (req, respone) => {
    let applicationTransactions = [];
    const { appId } = req.params;

    try {
        const results = Promise.all([
            await (await axios.get(`${API_URL}/cards/${appId}`, axiosHeaderConfig)).data,
            await (await axios.get(`${API_URL}/trans/${appId}`, axiosHeaderConfig)).data]
        )

        results.then(res => {
            const transactions = res[1];
            const cards = res[0];

            for (let i = 0; i < transactions.length; i++) {
                const transaction = transactions[i];
                const transactionType = getTransType(transaction.transType);
                const card = getCard(cards, transaction.cardId);

                applicationTransactions.push({
                    cardNo: card.cardNo,
                    transType: transactionType,
                    issuer: card.issuer,
                    amount: transaction.amount
                });
            }
            respone.status(200).json(applicationTransactions);
        })

    } catch (err) {
        console.error(err);
        res.status(500).send(err);
    }
});

export default router;