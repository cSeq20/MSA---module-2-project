// The default variable for the openWeathermap api to query. IT is set to Auckland.
var dftURL: string = 'https://api.openweathermap.org/data/2.5/weather?q=auckland&appid=65c0549b966f6aa73861d1b3556f9ccd&units=metric';

// Date variables for sun rise.
var drise: Date;
var hour: number;
var min: number;
var riseFull: string; // String containing full sun rise details.
// Date variables for sun set.
var dSet: Date;
var sHour: number;
var sMin: number;
var setFull: string; // String containing full sun set details.

// Class to initialise the weather called from openWeathermap api into a string format, so it can be displayed onto the page.
class Weather {
    loc: string;
    img: string;
    desc: string;
    wind: string;
    rise: string;
    set: string;
    high: string;
    low: string;

    constructor(public loca, public imgURL, public descr, public windSp, public sunRise, public sunSet, public tempHigh, public tempLow) {
        this.loc = loca;
        this.img = imgURL;
        this.desc = descr;
        this.wind = windSp;
        this.rise = sunRise;
        this.set = sunSet;
        this.high = tempHigh;
        this.low = tempLow;
    }

    // method that changes the html of the page to display the weather details using jquery.
    getWeather() {
        return $('#loc').html(this.loc), $("#weatherimg").html(this.img), $('#desc').html(this.desc),
            $('#wind').html(this.wind), $('#srise').html(this.rise), $('#sset').html(this.set), $('#high').html(this.high),
            $('#low').html(this.low);
    }
}

// function to setup the weather when page is first open, using ajax and openweathermap api. It is set to Auckland, NZ.
function setup(url:string) {

    var show: string;

    $.ajax({
        url: url,
        method: 'get',
        dataType: 'json',
        success: function (data) {

            var fullLoc: string = data.name + ', ' + data.sys.country;

            drise = new Date(1000 * data.sys.sunrise)
            hour = drise.getHours();
            min = drise.getMinutes();
            riseFull = 'Sunrise: ' + hour + " : " + min + " NZT";
            dSet = new Date(1000 * data.sys.sunset)
            sHour = dSet.getHours();
            sMin = dSet.getMinutes();
            setFull = 'Sunset: ' + sHour + " : " + sMin + " NZT";

            var weather;
            weather = new Weather(fullLoc, "<img src=images/" + data.weather[0].icon + ".png class='imageMain'>"
                + "  " + data.weather[0].main + ', ' + (data.main.temp).toFixed(0) + "&deg;", "Description : " + data.weather[0].description, 'Wind: ' + data.wind.speed + " m / s",
                riseFull, setFull, 'High: ' + (data.main.temp_max).toFixed(0) + " &deg;", 'Low: ' + (data.main.temp_min).toFixed(0) + ' &deg;');

            show = weather.getWeather();

             $('#enterCity').val('');
             
        }

    })
    return show;
}

$(document).ready(function () {
    setup(dftURL);

    var searchBtn = $('#btnGetWeather')[0];

    searchBtn.addEventListener("click", function () {
        var getData = $("#enterCity").val();
        var api: string = 'https://api.openweathermap.org/data/2.5/weather?q='
        var apiKey: string = '&appid=65c0549b966f6aa73861d1b3556f9ccd&units=metric';

        var fullURL = api + getData + apiKey;

        setup(fullURL);

       
    });

});