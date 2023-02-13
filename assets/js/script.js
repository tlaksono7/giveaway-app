// Form Variable
let valueDate = document.querySelector("#date")
let valueMonth = document.querySelector("#month")
let sexMale = document.querySelector("#male")
let sexFemale = document.querySelector("#female")

// Button Element Variable
let generateEl = document.querySelector("#generate")
let resetEl = document.querySelector("#reset")

// Result Section Variable
let resultSecEl = document.querySelector(".result-section")
let resultEl = document.querySelector("#result")
let headerResultEl = document.querySelector("#result-header")
let loaderEl = document.querySelector("#loader") 


let objName = ""
let firstName = ""
let lastName = ""

const dateMale = {
    1: "Do-yoon",
    2: "Seo-jun",
    3: "Ha-jun",
    4: "Eun-woo",
    5: "Si-woo",
    6: "Ji-ho",
    7: "Seo-woo",
    8: "Ye-jun",
    9: "Yu-jun",
    10: "Min-jun",
    11: "Woo-jin",
    12: "Do-hyun",
    13: "Su-ho",
    14: "Ju-won",
    15: "Yeon-woo",
    16: "Gun-woo",
    17: "Seon-woo",
    18: "Si-yoon",
    19: "Seo-jin",
    20: "Jun-woo",
    21: "Yu-chan",
    22: "Ji-hoo",
    23: "Ro-un",
    24: "Yoon-woo",
    25: "Woo-joo",
    26: "Hyun-woo",
    27: "Ji-an",
    28: "Jun-seo",
    29: "Do-ha",
    30: "Ji-han",
    31: "Ji-hun"
};

const dateFemale = {
    1: "Seo-ah",
    2: "Ji-an",
    3: "Ha-yoon",
    4: "Seo-yoon",
    5: "Ha-eun",
    6: "Ji-woo",
    7: "Ha-rin",
    8: "Ah-rin",
    9: "Ji-yoo",
    10: "Si-ah",
    11: "Soo-ah",
    12: "Ji-ah",
    13: "Na-eun",
    14: "Ah-yoon",
    15: "Seo-yeon",
    16: "Seo-woo",
    17: "Da-eun",
    18: "Ye-na",
    19: "Yu-na",
    20: "Yoo-joo",
    21: "Ye-rin",
    22: "So-yul",
    23: "Joo-ah",
    24: "Ha-yul",
    25: "Yun-seo",
    26: "Seo-hyun",
    27: "So-yoon",
    28: "Chae-won",
    29: "Ye-seo",
    30: "Seo-ha",
    31: "Da-in",
};

const month = {
    1: "Kim",
    2: "Lee",
    3: "Park",
    4: "Choi",
    5: "Jung",
    6: "Kang",
    7: "Cho",
    8: "Yoon",
    9: "Jang",
    10: "Lim",
    11: "Han",
    12: "Oh"
};

// User must select gender to define which object (dateMale and dateFemale) we call later
const validateSex = function() {
    if (sexMale.checked) {
        objName = dateMale;
    } else if (sexFemale.checked){
        objName = dateFemale;
    } else {
        alert("Please select your gender!")
    }
}

// Generate First name
const getFirstName = function() {
    for (let i = 0; i < Object.keys(objName).length; i++) {
        if (valueDate.value == i) {
            firstName = objName[i]
        }
    } 
}

// Generate Last name
const getLastName = function() {
    for (let i = 0; i < Object.keys(month).length; i++) {
        if (valueMonth.value == i) {
            lastName = month[i]
        }
    }
}

// Reset Button function, it will reload the page and reset the entry form
resetEl.addEventListener("click", function() {
    window.location.href=window.location.href
});


// Call getFirstName and getLastname
const generateAll = function() {
    getFirstName()
    getLastName()
    // Combine getFirstName and getLastName, appended to result section
    resultEl.textContent = "✨ "+lastName+ " "+firstName+" ✨"
    loaderEl.classList.remove("open")

}


// When Generate Button was click, this function will run.
generateEl.addEventListener("click", function() {
        // Check if user select a gender
        validateSex()
        if (objName) {
            // If yes, result section and loading icon will be show
            resultEl.textContent = ""
            resultSecEl.classList.add("open")
            loaderEl.classList.add("open")
            headerResultEl.textContent = "Your Korean name is:"
            // After 3 second, generateAll will be called and return the final result.
            setTimeout(generateAll, 3000)
        } else {
            // If no, the function will be stop..
            return
        }
});

