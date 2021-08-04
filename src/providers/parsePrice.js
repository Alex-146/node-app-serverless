const axios = require("axios");

async function parsePrice(classFrom) {
    const body = {
      classFrom,
      "classTo": "privatuah_auto",
      "amountFrom": 100,
      "activeDirection": "from"
    }
    const { data } = await axios.post("https://smartwm.biz/exchange/rate", body);

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

module.exports = parsePrice;