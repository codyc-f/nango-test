import { Nango } from '@nangohq/node';
import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';

dotenv.config();
const app = express();
app.use(cors());

const nango = new Nango({ secretKey: process.env.NANGO_SECRET_KEY });

app.get('/records', async (req, res) => {
    try {
        const records = await nango.listRecords({
            providerConfigKey: 'google-mail',
            connectionId: 'test-connection-id',
            model: 'GmailEmail'
        });
        res.json(records);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(3001, () => {
    console.log('Backend server running on port 3001');
});
