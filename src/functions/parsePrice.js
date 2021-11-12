exports.handler = async (event, context, callback) => {
  
  const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    // "Access-Control-Allow-Methods": "DELETE, POST, GET, OPTIONS",
    // "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept"
  }

  const response = (code, data) => {
    return callback(null, {
      statusCode: code,
      headers: {
        "Content-Type": "application/json", ...corsHeaders
      },
      body: JSON.stringify(data)
    })
  }

  const cors = () => {
    return callback(null, {
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

  try {
    const { data } = JSON.parse(event.body)

    if (!data) {
      return response(400, { message: "Bad Request" })
    }

    const entries = Array.isArray(data) ? data : [data]
    const parsePrice = require("../providers/parsePrice")
    const responseData = await parsePrice(entries)
    return response(200, { ok: true, data: responseData })
  }
  catch (error) {
    return response(200, { ok: false, message: error.message })
  }
}