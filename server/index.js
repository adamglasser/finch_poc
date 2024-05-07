const express = require('express');
const app = express();
const cors = require('cors');
const axios = require('axios');
const cookieParser = require('cookie-parser'); // Import cookie-parser for handling cookies

app.use(cors());
app.use(express.json());
app.use(cookieParser()); // Middleware to parse cookies

// Middleware to check if the accessToken is available in the cookies
app.use((req, res, next) => {
    req.accessToken = req.cookies['accessToken'];
    if (!req.accessToken) {
        console.log('Access token not available in cookies');
    }
    next();
});

app.post('/CreateProvider', async (req, res) => {
    const { provider_id } = req.query;
    if (!provider_id) {
        return res.status(400).send('Provider ID is required');
    }

    const data = {
        provider_id: provider_id,
        products: ["company", "directory", "individual", "employment"],
        employee_size: 10
    };

    try {
        const response = await axios.post('https://sandbox.tryfinch.com/api/sandbox/create', data, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const { access_token, company_id, payroll_provider_id, sandboxTime } = response.data;

        // Set the access token in a secure, HttpOnly cookie
        res.cookie('accessToken', access_token, {
            httpOnly: true, // Protects against client-side JS attacks
            secure: true // Ensures cookie is sent over HTTPS only
        });

        const resData = { company_id, payroll_provider_id, sandboxTime };
        res.send(resData);
    } catch (error) {
        console.error('Error making API call', error);
        res.status(500).send('Failed to create provider');
    }
});



const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
