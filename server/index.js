const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();
const cors = require('cors');
const axios = require('axios');
const cookieParser = require('cookie-parser');

const JWT_SECRET = process.env.JWT_SECRET;
const accessTokens = {};  // Simple in-memory store for access tokens

if (!JWT_SECRET){
    console.error('No JWT SECRET found')
}

app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}));
app.use(express.json());
app.use(cookieParser()); // Middleware to parse cookies

// Middleware to check if the accessToken is available in the cookies
app.use((req, res, next) => {
    token = req.cookies['jwtToken'];
    if (!token) {
        console.log('Access token not available in cookies');
    }
    console.log(token)
    next();
});


app.post('/CreateProvider', async (req, res) => {
    let isSafari = req.headers['user-agent'].includes('Safari') && !req.headers['user-agent'].
    includes('Chrome');

    console.log('is safari',isSafari )
    
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

        // Generate JWT for the frontend
        const jwtToken = jwt.sign({ provider_id }, JWT_SECRET, { expiresIn: '1h' });
        // Store access_token in the in-memory store
        accessTokens[jwtToken] = access_token;

        res.cookie('jwtToken', jwtToken, {
            httpOnly: true, // The cookie cannot be accessed by client-side JS
            secure: !isSafari,   // We are in dev, don't allow in prod
            sameSite: 'None' // None to allow cross site
          });
        
        res.status(200).send({ company_id, payroll_provider_id, sandboxTime });

    } catch (error) {
        handleError(error, res);
    }
});

app.get('/Company', async (req, res) => {
    try {
        const jwtToken = req.cookies['jwtToken'];
        console.log('token is')
        if (!jwtToken) {
            return res.status(401).send({ message: 'Authorization token is missing' });
        }

        // Verify the JWT token
        jwt.verify(jwtToken, JWT_SECRET, async (err, decoded) => {
            if (err) {
                return res.status(403).send({ message: 'Invalid token' });
            }

            const access_token = accessTokens[jwtToken];
            if (!access_token) {
                return res.status(403).send({ message: 'Token has expired or is invalid' });
            }

            // Use the stored sandbox API token here
            const response = await axios.get('https://sandbox.tryfinch.com/api/employer/company', {
                headers: {
                    'Authorization': `Bearer ${access_token}`,
                    'Content-Type': 'application/json'
                }
            });

            res.send(response.data);
        });

    } catch (error) {
        handleError(error, res);
    }
});

app.get('/Directory', async (req, res) => {
    try {
        const jwtToken = req.cookies['jwtToken'];
        if (!jwtToken) {
            return res.status(401).send({ message: 'Authorization token is missing' });
        }

        // Verify the JWT token
        jwt.verify(jwtToken, JWT_SECRET, async (err, decoded) => {
            if (err) {
                return res.status(403).send({ message: 'Invalid token' });
            }

            const access_token = accessTokens[jwtToken];
            if (!access_token) {
                return res.status(403).send({ message: 'Token has expired or is invalid' });
            }

            // Use the stored sandbox API token here
            const response = await axios.get('https://sandbox.tryfinch.com/api/employer/directory', {
                headers: {
                    'Authorization': `Bearer ${access_token}`,
                    'Content-Type': 'application/json'
                }
            });

            res.send(response.data);
        });

    } catch (error) {
        handleError(error, res);
    }
});

app.get('/Individual', async (req, res) => {
    const { individualId } = req.query;

    // Check for individualId in the request
    if (!individualId) {
        return res.status(400).send({ message: 'Individual ID is required' });
    }

    try {
        const jwtToken = req.cookies['jwtToken'];
        if (!jwtToken) {
            return res.status(401).send({ message: 'Authorization token is missing' });
        }

        // Verify the JWT token
        jwt.verify(jwtToken, JWT_SECRET, async (err, decoded) => {
            if (err) {
                return res.status(403).send({ message: 'Invalid token' });
            }

            const access_token = accessTokens[jwtToken];
            if (!access_token) {
                return res.status(403).send({ message: 'Token has expired or is invalid' });
            }

            const headers = {
                'Authorization': `Bearer ${access_token}`,
                'Content-Type': 'application/json'
            };

            // Fetch individual data
            const individualData = JSON.stringify({ "requests": [{ "individual_id": individualId }] });
            const individualResponse = await axios.post('https://sandbox.tryfinch.com/api/employer/individual', individualData, { headers });
            const individual = individualResponse.data;

            // Fetch employment data
            try {
                const employmentResponse = await axios.post('https://sandbox.tryfinch.com/api/employer/employment', individualData, { headers });
                individual['employments'] = employmentResponse.data;
            } catch (employmentError) {
                console.error('Employment data fetch error:', employmentError);
                individual['employments'] = {};
            }

            // Send final response with individual and employments data
            res.send({ individual });
        });
    } catch (error) {
        handleError(error, res);
    }
});

function handleError(error, res) {
    try {
    if (error.response && error.response.status) {
        // Server responded with a status code outside the range of 2xx
        // console.error("HTTP Status:", error.response.status);
        // console.error("HTTP Data:", error.response.data);
        res.status(error.response.status).send(error.response.data);
    } else if (error.request) {
        // No response received
        // #console.error("Error Request:", error.request);
        res.status(503).send({ message: "No response received from the API" });
    } else {
        // Error setting up the request
        // console.error("Error Message:", error.message);
        res.status(500).send({ message: error.message });
    }
    } catch (error) {
        res.status(500).send();
    }
}

const PORT = 8080;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
