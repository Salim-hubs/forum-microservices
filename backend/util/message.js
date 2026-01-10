// These two methods are used to send data to the frontend.

function sendMessage(res, data) {
    res.json({data: data});
}

function sendError(res, reason) {
    res.json({reason: reason});
}

module.exports = { sendMessage, sendError };