const timeRemainingElement = document.getElementById("timeRemaining")
const entrantNameElement = document.getElementById("entrantName")
const entrantEmailElement = document.getElementById("entrantEmail")
const winnerElement = document.getElementById("winner")
const pirzeListEl = document.getElementById("prize-list")


const API_KEY = 'pat0Om1gJLkklfIU4.87ddb722f46d7d144f9e5445e0c800695f65b56cb0171589ab70d1e40166b0d8'
const BASE_ID = 'appYajUTYIlmfenmW'

const urlEvent = 'https://api.airtable.com/v0/'+BASE_ID+'/Event'
const urlEntries = 'https://api.airtable.com/v0/'+BASE_ID+'/Entries'

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

        for (let i=0; i < dataEvent.length; i++) {
            const contentList = `<li>
                                    <img class="prize-body__image" src="${dataEvent[i].fields.image[0].url}">
                                    <h2 id="prize-name" class="prize-body__name">${dataEvent[i].fields.prize}</h2>
                                </li>`
            pirzeListEl.innerHTML += contentList
        }

        if (dataEvent[0].fields.winner) {
            winnerElement.innerHTML = `✨ ${dataEvent[0].fields.winner} ✨`;
        }
       
        const timer = setInterval(() => {
            currentTime = new Date()
            const timeDifference = endTime - currentTime
            const hours = Math.floor(timeDifference / 3600000)
            const minutes = Math.floor((timeDifference % 3600000) / 60000)
            const seconds = Math.floor((timeDifference % 60000) / 1000)
            timeRemainingElement.innerHTML = `${hours}:${minutes}:${seconds}`
            if (currentTime >= endTime) {
            clearInterval(timer)
            checkWinner()
            timeRemainingElement.innerHTML = `Giveaway Ended!`
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
        console.log(dataWinner)
        
        if (dataWinner == undefined) {
            getWinner()
        } else {
            return
        }
    }
}

const getWinner = () => {
    fetch(urlEntries, {
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
        let dataEntries = data.records
        const randomIndex = Math.floor(Math.random() * dataEntries.length)
        const winner = dataEntries[randomIndex].fields.name
        let body = {
            "fields": {
                "winner": winner,
                "status": "Ended"
            }
        }
        fetch(urlEntries + "/" + localStorage.getItem("id"), {
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

const enterGiveaway = () => {
    let body = {
        "fields": {
            "email": entrantEmailElement.value,
            "name": entrantNameElement.value
         }
    }
    
    fetch(urlEntries, {
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

getDataEvent()