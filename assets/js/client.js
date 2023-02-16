const prizeImageEl = document.getElementById("prize-image")
const prizeNameEl = document.getElementById("prize-name")
const timeRemainingEl = document.getElementById("time-remaining")

const entrantNameEl = document.getElementById("name-entrant")
const entrantEmailEl = document.getElementById("email-entrant")
const enterGiveawayEl = document.getElementById("enter-giveaway")
const winnerEl = document.getElementById("winner")
const pirzeListEl = document.getElementById("prize-list")

const entrantListEl = document.getElementById("entrant-list")

const API_KEY = 'pat0Om1gJLkklfIU4.87ddb722f46d7d144f9e5445e0c800695f65b56cb0171589ab70d1e40166b0d8'
const BASE_ID = 'appYajUTYIlmfenmW'

const urlEvent = 'https://api.airtable.com/v0/'+BASE_ID+'/Event'
const urlEntrant = 'https://api.airtable.com/v0/'+BASE_ID+'/Entrant'

const getDataEvent = () => {
    fetch(urlEvent, {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + API_KEY,
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.json())
        .then(data => loadEvent(data))
        .catch(err => console.error(err))
    
    const loadEvent = (data) => {
        let dataEvent = data.records
        let endTime
        let currentTime = new Date()

        prizeNameEl.innerHTML = dataEvent[0].fields.prize
        prizeImageEl.innerHTML = `<img class="prize-body__image--focus" src="${dataEvent[0].fields.image[0].url}">`
        endTime = new Date (dataEvent[0].fields.end)
        localStorage.setItem("id", dataEvent[0].id)

        if (dataEvent[0].fields.winner) {
            winnerEl.innerHTML = `✨ ${dataEvent[0].fields.winner} ✨`;
        }
       
        const timer = setInterval(() => {
            currentTime = new Date()
            const timeDifference = endTime - currentTime
            const hours = Math.floor(timeDifference / 3600000)
            const minutes = Math.floor((timeDifference % 3600000) / 60000)
            const seconds = Math.floor((timeDifference % 60000) / 1000)
            timeRemainingEl.innerHTML = `${hours}<span>:</span>${minutes}<span>:</span>${seconds}`
            if (currentTime >= endTime) {
            clearInterval(timer)
            checkWinner()
                timeRemainingEl.innerHTML = `0<span>:</span>0<span>:</span>0`
            }
        }, 1000);
    }

}


const checkWinner = () => {
    fetch(urlEvent, {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + API_KEY,
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.json())
        .then(data => validateWinner(data))
        .catch(err => console.error(err))

    const validateWinner = (data) => {
        let dataWinner = data.records[0].fields.winner
        if (dataWinner === undefined) {
            getWinner()
        } else {
            return
        }
    }
}

const getWinner = () => {
    fetch(urlEntrant, {
    method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + API_KEY,
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => drawWinner(data))
    .catch(err => console.error(err))

    const drawWinner = (data) => { 
        let dataEntrant = data.records
        const randomIndex = Math.floor(Math.random() * dataEntrant.length)
        const winner = dataEntrant[randomIndex].fields.name
        let body = {
            "fields": {
                "winner": winner,
                "status": "Ended"
            }
        }
        fetch(urlEntrant + "/" + localStorage.getItem("id"), {
            method: "PATCH",
            body: JSON.stringify(body),
            headers: {
                'Authorization': 'Bearer ' + API_KEY,
                'Content-Type': 'application/json'
            },
        })
            .then(response => response.json())
            .then(response => getDataEvent())
            .catch(err => console.log(err))
    }
};

enterGiveawayEl.addEventListener("click", function() {
    let body = {
        "fields": {
            "email": entrantEmailEl.value,
            "name": entrantNameEl.value
         }
    }
    
    fetch(urlEntrant, {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
            'Authorization': 'Bearer ' + API_KEY,
            'Content-Type': 'application/json'
        },
    })
        .then(response => response.json())
        .catch(err => alert(err))

    entrantEmailEl.value = ""
    entrantNameEl.value = "" 
});

const getEntrantList = () => {
    fetch(urlEntrant, {
        method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + API_KEY,
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => loadEntrant(data))
        .catch(err => console.error(err))
    const loadEntrant = (data) => {  
        let dataEntrant = data.records
        for (let i=0; i < dataEntrant.length; i++) {
            entrantListEl.innerHTML += `<div class="content-entrant__body-list__item">
                                            <p>${dataEntrant[i].fields.name}</p>
                                            <p>${dataEntrant[i].fields.email.slice(0, 3)}***@****${dataEntrant[i].fields.email.slice(-3)}</p>
                                        </div>`
        }
    }

}

getEntrantList()
getDataEvent()