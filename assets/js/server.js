const inputPrizeNameEl = document.getElementById("input-prize-name")
const inputPrizeImageEl = document.getElementById("input-prize-image")
const inputEndDateEl = document.getElementById("input-end-date")

const API_KEY = 'pat0Om1gJLkklfIU4.87ddb722f46d7d144f9e5445e0c800695f65b56cb0171589ab70d1e40166b0d8'
const BASE_ID = 'appYajUTYIlmfenmW'

const urlEvent = 'https://api.airtable.com/v0/'+BASE_ID+'/Event'


const createGiveaway = () => {
    let body = {
        "fields": {
            "prize": inputPrizeNameEl.value,
            "image": [
                {
                  "url": inputPrizeImageEl.value
                }
            ],
            "end": inputEndDateEl.value
         }
    }
    
    fetch(urlEvent, {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
            'Authorization': 'Bearer ' + API_KEY,
            'Content-Type': 'application/json'
        },
    })
        .then(response => response.json())
        .catch(err => console.log(err))
}
