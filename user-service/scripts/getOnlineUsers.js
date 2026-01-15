const auth = require("../util/auth");
const sql = require("../sql/sqlUsers");
const { sendMessage } = require("../util/message");
const activeSessions = require("../util/activeSessions");

async function getOnlineUsers(req, res) {
  const payload = auth.isAuthenticated(req, res);
  if(!payload) return;

  const allUsers = await sql.getAllUsers();
  const onlineIds = activeSessions.getOnlineUserIds();

  const users = allUsers.map(u => ({
    login: u.login,
    connected: onlineIds.includes(u.id)
  }));

  sendMessage(res, { users });
}

module.exports.getOnlineUsers = getOnlineUsers;
