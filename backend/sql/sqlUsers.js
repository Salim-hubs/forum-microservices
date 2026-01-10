const mysqlConnect = require("./sqlConnect");

async function getUserId(login, password) {
    const query = `SELECT id
        FROM users
        WHERE login = ? AND password = ?`;
    
    const data = [login, password];

    return mysqlConnect.query(query, data);
}

async function userExists(login) {
  const query = `SELECT id FROM users WHERE login = ?`;
  const res = await mysqlConnect.query(query, [login]);
  return res.length > 0;
}

async function createUser(login, password) {
  const query = `INSERT INTO users (login, password) VALUES (?, ?)`;
  const res = await mysqlConnect.query(query, [login, password]);
  return res.insertId;
}

async function checkPassword(userId, hash) {
  const q = `SELECT id FROM users WHERE id = ? AND password = ?`;
  const r = await mysqlConnect.query(q, [userId, hash]);
  return r.length > 0;
}

async function updatePassword(userId, newHash) {
  const q = `UPDATE users SET password = ? WHERE id = ?`;
  await mysqlConnect.query(q, [newHash, userId]);
}

async function getUserLogin(userId) {
  const q = `SELECT login FROM users WHERE id = ?`;
  const r = await mysqlConnect.query(q, [userId]);
  return r[0].login;
}

async function getAllUsers() {
  const query = `SELECT id, login FROM Users`;
  return mysqlConnect.query(query, []);
}

module.exports.getUserId = getUserId;
module.exports.userExists = userExists;
module.exports.createUser = createUser;
module.exports.checkPassword = checkPassword;
module.exports.updatePassword = updatePassword;
module.exports.getUserLogin = getUserLogin;
module.exports.getAllUsers = getAllUsers;