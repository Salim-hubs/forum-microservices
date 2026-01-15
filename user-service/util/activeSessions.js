// util/activeSessions.js
const activeSessions = [];

function addSession(userId, jwt, expiresInSec) {
  const expiresAt = Date.now() + expiresInSec * 1000;
  activeSessions.push({ userId, jwt, expiresAt });
}

function removeSession(jwt) {
  const index = activeSessions.findIndex(s => s.jwt === jwt);
  if(index !== -1) activeSessions.splice(index,1);
}

// Nettoyage automatique des sessions expirées
function cleanup() {
  const now = Date.now();
  for(let i = activeSessions.length-1; i>=0; i--){
    if(activeSessions[i].expiresAt <= now) activeSessions.splice(i,1);
  }
}

function getOnlineUserIds() {
  cleanup();
  // retourne seulement les IDs uniques
  return [...new Set(activeSessions.map(s => s.userId))];
}

module.exports = { addSession, removeSession, getOnlineUserIds };
