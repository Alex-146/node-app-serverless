const axios = require("axios");

function proceedClass(classFrom, data) {
  const { error, form } = data;

  if (error) {
    return {
      title: classFrom,
      error: data.message ?? "Request error"
    }
  }

  const { systemFromTitle, amountFrom, currFrom,
    systemToTitle, amountTo, currTo, 
    actualRate, rateFrom } = form;

  let inverse = amountFrom * rateFrom;
  //inverse = amountFrom / actualRate;

  return {
    title: `${systemFromTitle} - ${systemToTitle}`,
    a: `${amountFrom} ${currFrom} = ${amountTo} ${currTo}`,
    b: `${inverse} ${currFrom} = ${amountFrom} ${currTo}`
  }
}

async function parsePrice(classFrom) {
  if (!Array.isArray(classFrom)) {
    classFrom = [classFrom];
  }

  const responses = await Promise.all(classFrom.map(classValue => { 
    return axios.post("https://smartwm.biz/exchange/rate", {
      "classFrom": classValue,
      "classTo": "privatuah_auto",
      "amountFrom": 100,
      "activeDirection": "from"
    });
  }));

  const result = responses.map(response => response.data)
  .map((data, i) => proceedClass(classFrom[i], data));

  if (result.length === 1) {
    return result[0];
  }
  return result;
}

module.exports = parsePrice;