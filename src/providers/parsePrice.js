const axios = require("axios")

function proceedClass({ from, to }, data) {
  const { error, form } = data

  if (error) {
    return {
      title: from,
      error: data.message ?? "Request error"
    }
  }

  const { 
    systemFromTitle, amountFrom, currFrom,
    systemToTitle, amountTo, currTo, 
    actualRate, rateFrom 
  } = form

  let inverse = amountFrom * rateFrom
  //inverse = amountFrom / actualRate

  return {
    from: {
      title: systemFromTitle,
      amount: amountFrom,
      currency: currFrom,
    },
    to: {
      title: systemToTitle,
      amount: amountTo,
      currency: currTo,
    },
    rates: {
      rateFrom,
      actualRate,
    },
    constructed: {
      title: `${systemFromTitle} - ${systemToTitle}`,
      a: `${amountFrom} ${currFrom} = ${amountTo} ${currTo}`,
      b: `${inverse} ${currFrom} = ${amountFrom} ${currTo}`
    }
  }
}

async function parsePrice(entries) {
  const responses = await Promise.all(entries.map(({ from, to }) => { 
    return axios.post("https://smartwm.biz/exchange/rate", {
      "classFrom": from,
      "classTo": to,
      "amountFrom": 100,
      "activeDirection": "from"
    })
  }))

  const result = responses
    .map(response => response.data)
    .map((data, i) => proceedClass(entries[i], data))

  if (result.length === 1) {
    return result[0]
  }
  return result
}

module.exports = parsePrice