const session = require("./sessionJWT");
const { sendError } = require("./message");

/**
 * Vérifie si la requête contient un JWT valide.
 */
function isAuthenticated(request, result) {
    const payload = session.decodeSessionCookie(request);

    if (!payload || typeof payload.userId === "undefined" || payload.userId === -1) {
        sendError(result, "Session invalide ou expirée.");
        return null;
    }

    session.sendSessionCookie(request, result, payload);

    return payload;
}

module.exports.isAuthenticated = isAuthenticated;
