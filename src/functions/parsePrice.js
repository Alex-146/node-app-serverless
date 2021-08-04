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

  const { classFrom } = JSON.parse(event.body);
  if (!classFrom) {
    return callback(400, { message: "Bad Request" });
  }

  const parsePrice = require("../providers/parsePrice");
  parsePrice(classFrom)
  .then(data => {
    response(200, data)
  })
  .catch(error => {
    response(500, { ok: false, message: error.message });
  });
}