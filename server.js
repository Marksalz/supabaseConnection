import express from 'express';
import { readUserByName, readAll } from './supabase.js';

const server = express();

server.use(express.json());

server.post('/login', async (req, res) => {
    try {
        const user = await readUserByName(req.body.username, req.body.password);
        if (user && user.length > 0) {
            res.status(200).json({ success: true, user: user[0] });
        } else {
            res.status(401).json({ success: false, message: 'Invalid username or password' });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

server.post('/products', async (req, res) => {
    try {
        const loginRes = await fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: req.body.username,
                password: req.body.password
            })
        });
        const data = await loginRes.json();
        if (data.success) {
            const products = await readAll();
            res.status(200).json({ success: true, products });
        } else {
            res.status(401).json({ success: false, message: 'Invalid username or password, cannot show products' });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

server.listen(process.env.PORT, () => console.log(`Server listening on port ${process.env.PORT}`));