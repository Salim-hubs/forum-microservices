const {sendError, sendMessage} = require("../util/message");
const { hashPassword } = require("../util/hash");
const sql = require("../sql/sqlUsers");
const { sendSessionCookie } = require("../util/sessionJWT");

async function tryLogin(request, result) {
    const data = request.body;
    console.log("tryLogin.js :", data);
    if("login" in data) {
        if("password" in data) {
            const hash = hashPassword(data["password"]);
            const user_id = await sql.getUserId(data["login"], hash);
            if(user_id.length) {
                const id = user_id[0]["id"];
                sendSessionCookie(request, result, { userId: id });
                return sendMessage(result, user_id);
            }
            else {
                return sendError(result, "Identifiants invalides.");
            }
        }
        else {
            return sendError(result, "password is required");
        }
    }
    else {
        return sendError(result, "login is required");
    }
}

module.exports.tryLogin = tryLogin;