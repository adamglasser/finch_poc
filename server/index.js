const express = require('express');
const app = express();
const cors = require('cors');
const axios = require('axios');
const cookieParser = require('cookie-parser'); // Import cookie-parser for handling cookies

app.use(cors({
    origin: "http://localhost:3000", // Change this to match your client's domain
    credentials: true
}));
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

        res.cookie('access_token', access_token, {
            httpOnly: true, // The cookie cannot be accessed by client-side JS
            secure: false,   // Only transmit cookie over HTTPS, false because we are in dev
            sameSite: 'None' // None to allow cross site
          });
        
        res.status(200).send({ company_id, payroll_provider_id, sandboxTime });

    } catch (error) {
        console.error('Error making API call', error);
        res.status(500).send('Failed to create provider');
    }
});

app.get('/Company', async (req, res) => {
    try {
        const token = req.cookies['access_token'];
        const response = await axios.get('https://sandbox.tryfinch.com/api/employer/company', {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        const resData = response.data;

        res.send(resData);
    } catch (error) {
        //console.error('Error making API call', error);
        res.status(500).send('Failed to fetch company');
    }
});



const PORT = 8080;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
