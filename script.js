window.addEventListener("load", () => {
    let long;
    let lat;
    let api = "https://api.openweathermap.org/data/2.5/weather";
    let apiKey = "88b285320027a3406a84a3177730d625";
    let temperatureDiscription = document.querySelector("#summary");
    let temperatureDegree = document.querySelector(".temperature-degree");
    let locationTimezone = document.querySelector("#zone");
    let degreesection = document.querySelector(".temperature-degree");
    const degreespan = document.querySelector(".degree-section span");
    var icons = document.querySelector(".icon");

    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position => {
            console.log(position);
            long = position.coords.longitude;
            lat = position.coords.latitude;

            let url =
            api +
            "?lat=" +
            lat +
            "&lon=" +
            long +
            "&appid=" +
            apiKey +
            "&units=imperial";
            
            fetch(url)
                .then(response => {
                return response.json();
                })
                .then(data => {
                console.log(data);

                //Set DOM Elements from the API

                temperatureDegree.textContent = data.main.temp;
                console.log(data.main.temp);
                temperatureDiscription.innerHTML = data.weather[0].description;
                locationTimezone.innerHTML = data.name;
                var icon = data.weather[0].icon;

                //Formula for Celsius
                let celsius = (data.main.temp -32)*(5/9);

                //set icon
                var iconID = data.weather[0].icon;
                getIcon(iconID);

                //covert to celsius
                degreesection.addEventListener("click", () => {
                    if(degreespan.textContent === "F"){

                        degreesection.textContent = Math.floor(celsius);
                        degreespan.textContent = "C";

                    }
                    else{
                        degreespan.textContent = "F";
                        temperatureDegree.textContent = data.main.temp;
                    }
                });

                });
        });
    }


    var getIcon = function(iconID) {
        var skycons = new Skycons({
          "color": "white"
        });
        if (iconID === "01d") {
          skycons.set("icon1", "clear-day");
        } else if (iconID === "01n") {
          skycons.set("icon1", "clear-night");
        } else if (iconID === "02d") {
          skycons.set("icon1", "partly-cloudy-day");
        } else if (iconID === "02n") {
          skycons.set("icon1", "partly-cloudy-night");
        } else if (iconID === "03d" || iconID === "03n" || iconID === "04d" || iconID === "04n") {
          skycons.set("icon1", "cloudy");
        } else if (iconID === "09d" || iconID === "09n") {
          skycons.set("icon1", "rain");
        } else if (iconID === "10d" || iconID === "10n" || iconID === "11d" || iconID === "11n") {
          skycons.set("icon1", "sleet");
        } else if (iconID === "13d" || iconID === "13n") {
          skycons.set("icon1", "snow");
        } else {
          skycons.set("icon1", "fog");
        };
        skycons.play();
      };

});