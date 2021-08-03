exports.handler = function(event, context, callback) {
  
  const response = (code, data) => {
    callback(null, {
      statusCode: code,
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });
  }

  if (event.httpMethod !== "POST") {
    return response(405, { message: "Method Not Allowed"})
  }

  const { text } = JSON.parse(event.body);
  if (!text) {
    return callback(400, { message: "Bad Request" });
  }

  const sendMessage = require("../providers/sendMail");
  sendMessage(text)
  .then(_ => {
    response(200, { ok: true })
  })
  .catch(error => {
    response(500, { ok: false, message: error.message });
  });
}