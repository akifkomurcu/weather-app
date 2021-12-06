var cdata = [];
var dataobject = {};

var cities = JSON.parse(localStorage.getItem("city"));
var localdata;
let weather = {

    apiKey: "YOUR APİ KEY",
    fetchWeather: function (city) {
        fetch(
            "http://api.openweathermap.org/data/2.5/weather?q=" +
            city +
            "&units=metric&appid=" +
            this.apiKey
        )
            .then((response) => {
                if (!response.ok) {
                    alert("Hava durumu bulunamadı.");
                    throw new Error("Hava durumu bulunamadı.");
                }
                return response.json();
            })
            .then((data) => this.displayWeather(data));
    },
    displayWeather: function (data) {
        const { name } = data;
        const { icon, description } = data.weather[0];
        const { temp, humidity } = data.main;
        const { speed } = data.wind;
        if (data.name == undefined || null)
            localdata = cities[0].cityvalue;
        // console.log(data.name);
        document.querySelector(".city").innerText = name + " Hava durumu:";
        document.querySelector(".icon").src = "https://openweathermap.org/img/wn/" + icon + ".png";
        document.querySelector(".description").innerText = description;
        document.querySelector(".temp").innerText = temp + "°C";
        document.querySelector(".humidity").innerText =
            "Nem: " + humidity + "%";
        document.querySelector(".wind").innerText =
            "Rüzgar hızı: " + speed + " km/h";
        document.querySelector(".weather").classList.remove("loading");


    },
    search: function () {
        this.fetchWeather(document.querySelector(".search-bar").value);

        var cityvalue = document.querySelector(".search-bar").value;
        dataobject["cityvalue"] = cityvalue;
        cdata.push(dataobject);
        localStorage.setItem("city", JSON.stringify(cdata));

    },
};

document.querySelector(".search button").addEventListener("click", function () {
    weather.search();
});

document.querySelector(".search-bar").addEventListener("keyup", function (event) {
    if (event.key == "Enter") {
        weather.search();
    }
});
if (localdata != undefined || null)
    weather.fetchWeather(localdata);
else
    weather.fetchWeather("sivas");


