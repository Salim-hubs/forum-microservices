const JWT = require('jsonwebtoken');
const fs = require('fs');

const activeSessions = require("./activeSessions");

// Récupération des clés publique et privée
const RSA_PRIVATE_KEY = fs.readFileSync('./keys/jwtRS256.key');
const RSA_PUBLIC_KEY = fs.readFileSync('./keys/jwtRS256.key.pub');

// Crée et renvoie un nouveau JWT
function createJWT(userId) {
    const jwtToken = JWT.sign(
        {
            userId: userId,
            refreshTime: Math.floor(Date.now() / 1000) + 2700 // Validité : 45min
        },
        RSA_PRIVATE_KEY,
        {
            algorithm: 'RS256',
            expiresIn: '1h'
        }
    );

    return jwtToken;
}

function decodeSessionCookie(req) {
    if(typeof req.cookies.SESSIONID === 'undefined') {
        return { userId: -1 };
    }

    const sessionid = req.cookies.SESSIONID;
    try {
        const token = JWT.verify(
            sessionid,
            RSA_PUBLIC_KEY,
            {
                algorithms: ['RS256']
            }
        );

        return token;
    } catch (err) {
        return { userId: -1 };
    }
}

function sendSessionCookie(req, res, payload) {
    let jwtToken = '';
    const now = Math.floor(Date.now() / 1000);
    if(
        (typeof payload.userId !== 'undefined')
        &&
        (typeof payload.refreshTime !== 'undefined')
        &&
        (Math.floor(Date.now() / 1000) <= payload.refreshTime)
    ) {
        jwtToken = req.cookies.SESSIONID;
    } else {
        jwtToken = createJWT(payload.userId);
    }

    res.cookie('SESSIONID', jwtToken, {
        httpOnly: true,
        secure: false,
        sameSite: 'Lax'
    });

    activeSessions.addSession(payload.userId, jwtToken, 3600);
}

module.exports.decodeSessionCookie = decodeSessionCookie;
module.exports.sendSessionCookie = sendSessionCookie;
