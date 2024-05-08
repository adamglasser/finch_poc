const express = require('express');
const app = express();
const cors = require('cors');
const axios = require('axios');
const cookieParser = require('cookie-parser'); // Import cookie-parser for handling cookies

app.use(cors({
    origin: "http://localhost:3000",
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
            secure: true,   // Only transmit cookie over HTTPS
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
        if (error.response) {
            // The request was made and the server responded with a status code that falls out of the range of 2xx
            console.log("Error Status:", error.response.status);
            console.log("Error Data:", error.response.data);

            // Send error details back to the client
            res.status(error.response.status).send(error.response.data);
        } else if (error.request) {
            // The request was made but no response was received
            console.log("Error Request:", error.request);
            res.status(500).send({ message: "No response received from the API" });
        } else {
            // Something happened in setting up the request that triggered an error
            console.log("Error Message:", error.message);
            res.status(500).send({ message: error.message });
        }
    }
});

app.get('/Directory', async (req, res) => {
    try {
        const token = req.cookies['access_token'];
        const response = await axios.get('https://sandbox.tryfinch.com/api/employer/directory', {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        const resData = response.data;

        res.send(resData);
    } catch (error) {
        if (error.response) {
            // The request was made and the server responded with a status code that falls out of the range of 2xx
            console.log("Error Status:", error.response.status);
            console.log("Error Data:", error.response.data);

            // Send error details back to the client
            res.status(error.response.status).send(error.response.data);
        } else if (error.request) {
            // The request was made but no response was received
            console.log("Error Request:", error.request);
            res.status(500).send({ message: "No response received from the API" });
        } else {
            // Something happened in setting up the request that triggered an error
            console.log("Error Message:", error.message);
            res.status(500).send({ message: error.message });
        }
    }
});

app.get('/Individual', async (req, res) => {
    try {
        const token = req.cookies['access_token'];
        const response = await axios.get('https://sandbox.tryfinch.com/api/employer/individual', {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        const resData = response.data;

        res.send(resData);
    } catch (error) {
        if (error.response) {
            // The request was made and the server responded with a status code that falls out of the range of 2xx
            console.log("Error Status:", error.response.status);
            console.log("Error Data:", error.response.data);

            // Send error details back to the client
            res.status(error.response.status).send(error.response.data);
        } else if (error.request) {
            // The request was made but no response was received
            console.log("Error Request:", error.request);
            res.status(500).send({ message: "No response received from the API" });
        } else {
            // Something happened in setting up the request that triggered an error
            console.log("Error Message:", error.message);
            res.status(500).send({ message: error.message });
        }
    }
});

app.get('/Employment', async (req, res) => {
    try {
        const token = req.cookies['access_token'];
        const response = await axios.get('https://sandbox.tryfinch.com/api/employer/employment', {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        const resData = response.data;

        res.send(resData);
    } catch (error) {
        if (error.response) {
            // The request was made and the server responded with a status code that falls out of the range of 2xx
            console.log("Error Status:", error.response.status);
            console.log("Error Data:", error.response.data);

            // Send error details back to the client
            res.status(error.response.status).send(error.response.data);
        } else if (error.request) {
            // The request was made but no response was received
            console.log("Error Request:", error.request);
            res.status(500).send({ message: "No response received from the API" });
        } else {
            // Something happened in setting up the request that triggered an error
            console.log("Error Message:", error.message);
            res.status(500).send({ message: error.message });
        }
    }
});

const PORT = 8080;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
