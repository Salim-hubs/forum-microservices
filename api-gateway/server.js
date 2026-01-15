// API GATEWAY - Point d'entrée unique pour tous les microservices
// Port 3000
const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const app = express();
const port = 3000;

// Configuration CORS
app.use(cors({
    origin: ["http://127.0.0.1:4200", "http://localhost:4200"],
    credentials: true
}));

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// URLs des microservices
const USER_SERVICE = 'http://127.0.0.1:3001';
const TOPIC_SERVICE = 'http://127.0.0.1:3002';

// Fonction pour proxy les requêtes
async function proxyRequest(targetUrl, req, res) {
    try {
        console.log(`[API-GATEWAY] Proxying to ${targetUrl}`);
        console.log(`[API-GATEWAY] Cookie: ${req.headers.cookie || 'none'}`);

        const response = await fetch(targetUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Cookie': req.headers.cookie || ''
            },
            body: JSON.stringify(req.body)
        });

        // Récupérer les cookies du service et les renvoyer au client
        const setCookieHeader = response.headers.getSetCookie?.() || response.headers.get('set-cookie');
        if (setCookieHeader) {
            if (Array.isArray(setCookieHeader)) {
                setCookieHeader.forEach(cookie => res.append('Set-Cookie', cookie));
            } else {
                res.setHeader('Set-Cookie', setCookieHeader);
            }
        }

        const data = await response.json();
        console.log(`[API-GATEWAY] Response from ${targetUrl}:`, data.status);
        res.json(data);
    } catch (error) {
        console.error(`[API-GATEWAY] Error proxying to ${targetUrl}:`, error.message);
        res.status(500).json({ status: 'error', data: { reason: 'Service unavailable' } });
    }
}

// Routes USER-SERVICE (port 3001)
app.post('/tryLogin', (req, res) => proxyRequest(`${USER_SERVICE}/tryLogin`, req, res));
app.post('/register', (req, res) => proxyRequest(`${USER_SERVICE}/register`, req, res));
app.post('/getProfile', (req, res) => proxyRequest(`${USER_SERVICE}/getProfile`, req, res));
app.post('/changePassword', (req, res) => proxyRequest(`${USER_SERVICE}/changePassword`, req, res));
app.post('/logout', (req, res) => proxyRequest(`${USER_SERVICE}/logout`, req, res));
app.post('/getOnlineUsers', (req, res) => proxyRequest(`${USER_SERVICE}/getOnlineUsers`, req, res));

// Routes TOPIC-SERVICE (port 3002)
app.post('/getTopics', (req, res) => proxyRequest(`${TOPIC_SERVICE}/getTopics`, req, res));
app.post('/createTopic', (req, res) => proxyRequest(`${TOPIC_SERVICE}/createTopic`, req, res));
app.post('/getMessages', (req, res) => proxyRequest(`${TOPIC_SERVICE}/getMessages`, req, res));
app.post('/postMessage', (req, res) => proxyRequest(`${TOPIC_SERVICE}/postMessage`, req, res));

// Health check
app.get('/health', (req, res) => {
    res.json({
        status: 'ok',
        service: 'api-gateway',
        routes: {
            userService: ['/tryLogin', '/register', '/getProfile', '/changePassword', '/logout', '/getOnlineUsers'],
            topicService: ['/getTopics', '/createTopic', '/getMessages', '/postMessage']
        }
    });
});

app.listen(port, () => {
    console.log(`[API-GATEWAY] Listening on http://127.0.0.1:${port}`);
    console.log(`[API-GATEWAY] Routing to user-service (3001) and topic-service (3002)`);
});
