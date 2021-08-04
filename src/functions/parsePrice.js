exports.handler = function(event, context, callback) {
  
  const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "DELETE, POST, GET, OPTIONS",
    "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept"
  }

  const response = (code, data) => {
    callback(null, {
      statusCode: code,
      headers: {
        "Content-Type": "application/json", ...corsHeaders
      },
      body: JSON.stringify(data)
    });
  }

  const cors = () => {
    callback(null, {
      statusCode: 200,
      headers: corsHeaders,
      body: "146"
    })
  }

  if (event.httpMethod === "OPTIONS") {
    return cors()
  }

  if (event.httpMethod !== "POST") {
    return response(405, { message: "Method Not Allowed"})
  }

  const { classFrom } = JSON.parse(event.body);
  if (!classFrom) {
    return response(400, { message: "Bad Request" });
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