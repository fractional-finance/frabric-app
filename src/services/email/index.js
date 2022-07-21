const axios = require("axios");

export function subscribe(email) {
  return new Promise((resolve) => {
    axios
      .post(
        "https://api.sendinblue.com/v3/contacts",
        { updateEnabled: false, email: email, listIds: [5]},
        { 
          headers: { 
            "Content-Type": "application/json",
            "accept": "application/json",
            "api-key": process.env.VUE_APP_SIB_API_KEY 
          } 
        }
      )
      .then(response => {
        console.log(response.data)
        resolve(null)
      })
  })
}