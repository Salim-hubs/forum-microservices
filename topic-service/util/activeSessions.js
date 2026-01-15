// util/activeSessions.js - Version simplifiée pour topic-service
// Ce service n'a pas besoin de gérer les sessions, juste de valider les tokens

const activeSessions = [];

function addSession(userId, jwt, expiresInSec) {
  const expiresAt = Date.now() + expiresInSec * 1000;
  activeSessions.push({ userId, jwt, expiresAt });
}

function removeSession(jwt) {
  const index = activeSessions.findIndex(s => s.jwt === jwt);
  if(index !== -1) activeSessions.splice(index,1);
}

function cleanup() {
  const now = Date.now();
  for(let i = activeSessions.length-1; i>=0; i--){
    if(activeSessions[i].expiresAt <= now) activeSessions.splice(i,1);
  }
}

function getOnlineUserIds() {
  cleanup();
  return [...new Set(activeSessions.map(s => s.userId))];
}

module.exports = { addSession, removeSession, getOnlineUserIds };
