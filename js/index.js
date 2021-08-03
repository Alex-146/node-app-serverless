const button = document.querySelector("button")
const textarea = document.querySelector("textarea")

button.addEventListener("click", () => {
  fetch("/.netlify/functions/sendMail", {
    headers: {
      "Content-Type": "application/json"
    },
    method: "POST",
    body: JSON.stringify({ text: textarea.value })
  })
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(err => console.error(err))
});