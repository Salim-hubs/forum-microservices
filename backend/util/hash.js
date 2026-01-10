const crypto = require("crypto");
const mysqlConnect = require("../sql/sqlConnect");

function hashPassword(password) {
  return crypto.createHash("sha256").update(password).digest("hex");
}

async function comparePasswordHash(idUser, hash) {
  const query = `SELECT password
    FROM users
    WHERE id = ?`;
    
  const data = [idUser];
  const result = await mysqlConnect.query(query, data);

  if (result.length === 0) {
    return false;
  }
  
  const storedHash = result[0].password;
  return storedHash === hash;
}

module.exports.hashPassword = hashPassword;
module.exports.comparePasswordHash = comparePasswordHash;