const { sendMessage } = require("./message");

function logout(request, result) {
    
  // Supprime le cookie SESSIONID
  result.clearCookie("SESSIONID", {
    httpOnly: true,
    secure: false, // passe à true en production (HTTPS)
    sameSite: "Lax",
    path: "/"
  });

  // Envoie une réponse simple de confirmation
  return sendMessage(result, "Déconnexion réussie.");
}

module.exports.logout = logout;