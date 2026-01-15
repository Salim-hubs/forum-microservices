const { sendError, sendMessage } = require("../util/message");
const { hashPassword } = require("../util/hash");
const sql = require("../sql/sqlUsers");
const { sendSessionCookie } = require("../util/sessionJWT");

async function register(request, result) {
  const { login, password } = request.body;

  console.log("[USER-SERVICE] register:", login);

  if (!login) return sendError(result, "login required");
  if (!password) return sendError(result, "password required");

  const exists = await sql.userExists(login);
  if (exists) {
    return sendError(result, "Ce login est déjà pris.");
  }

  const hash = hashPassword(password);
  const userId = await sql.createUser(login, hash);

  sendSessionCookie(request, result, { userId });

  return sendMessage(result, { status: "ok" });
}

module.exports.register = register;
