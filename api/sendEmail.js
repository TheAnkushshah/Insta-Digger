// api/sendEmail.js
import fetch from 'node-fetch';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { email } = req.body;

    try {
        const response = await fetch('https://hooks.zapier.com/hooks/catch/19268549/2bzj5b6/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email })
        });

        if (!response.ok) {
            throw new Error(`Network response was not ok: ${response.statusText}`);
        }

        const result = await response.json();
        return res.status(200).json(result);
    } catch (error) {
        console.error('Error occurred:', error.message);
        return res.status(500).json({ error: 'Something went wrong' });
    }
}