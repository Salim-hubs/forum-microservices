// These two methods are used to send data to the frontend.

function sendMessage(res, data) {
    res.json({status: "ok", data: data});
}

function sendError(res, reason) {
    res.json({status: "error", data:{reason: reason}});
}

module.exports = { sendMessage, sendError };
