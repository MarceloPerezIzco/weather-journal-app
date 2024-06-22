/* Global Variables */
const baseURL = "https://api.openweathermap.org/data/2.5/weather?zip=";
const apiKey = "YOUR_API_KEY";

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + "." + d.getDate() + "." + d.getFullYear();

document.getElementById("generate").addEventListener("click", performAction);

function performAction(e) {
    const zip = document.getElementById("zip").value;
    const feelings = document.getElementById("feelings").value;

    getWeather(baseURL, zip, apiKey)
        .then(function (data) {
            postData("/add", {
                date: newDate,
                temperature: data.main.temp,
                userResponse: feelings,
            });
        })
        .then(function () {
            updateUI();
        });
}

// GET request
const getWeather = async (baseURL, zip, key) => {
    const res = await fetch(baseURL + zip + ",gb&appid=" + key + "&units=imperial");
    try {
        const data = await res.json();
        if (data.cod !== 200) {
            throw new Error(`OpenWeatherMap API error: ${data.message}`);
        }
        return data;
    } catch (error) {
        console.log("error", error);
    }
};

// POST request
const postData = async (url = "", data = {}) => {
    const response = await fetch(url, {
        method: "POST",
        credentials: "same-origin",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    try {
        const newData = await response.json();
        return newData;
    } catch (error) {
        console.log("error", error);
    }
};

// POST request
const updateUI = async () => {
    const request = await fetch("/all");
    try {
        const allData = await request.json();
        document.getElementById("date").innerHTML = `Date: ${allData.date}`;
        document.getElementById("temp").innerHTML = `Temperature: ${allData.temperature}`;
        document.getElementById("content").innerHTML = `Feeling: ${allData.userResponse}`;
    } catch (error) {
        console.log("error", error);
    }
};
