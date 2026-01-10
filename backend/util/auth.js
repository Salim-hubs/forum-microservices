const session = require("./sessionJWT");
const { sendUserError } = require("./message");

/**
 * Vérifie si la requête contient un JWT valide.
 * 
 * @param {Object} request - Requête Express (doit contenir les cookies)
 * @param {Object} result - Réponse Express (pour pouvoir renvoyer une erreur)
 * @returns {Object|null} payload du JWT si valide, sinon null (et envoie une erreur)
 */

function isAuthenticated(request, result) {
    const payload = session.decodeSessionCookie(request);

    // Vérifie si le cookie existe et contient un userId valide
    if (!payload || typeof payload.userId === "undefined" || payload.userId === -1) {
        sendUserError(result, "Session invalide ou expirée.");
        return null;
    }

    session.sendSessionCookie(request, result, payload);

    return payload;
}

module.exports.isAuthenticated = isAuthenticated;