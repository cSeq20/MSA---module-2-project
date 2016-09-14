var searchBtn = $('#btnGetWeather')[0];
// queries api when search button is pressed and retrieves data to be displayed on webpage.
searchBtn.addEventListener("click", function () {
    var city = $('#enterCity').val();
    $.get('https://query.yahooapis.com/v1/public/yql?q=select * from weather.forecast where u="c" and woeid in (select woeid from geo.places(1) where text="' + city + '")&format=json', function (data) {
        /* Check that a place was found  */
        if (data.query.results === null) {
            alert("Location not found: " + location + "!");
        }
        else {
            $('#daily').show();
            $('#moreDetails').css("visibility", "visible");
            setup(data);
        }
    });
});
// Function that sets up the data on the webpage.
function setup(data) {
    $('#loc').html(data.query.results.channel.location.city + ", " + data.query.results.channel.location.country);
    $('#weatherimg').html("<img src=images/" + data.query.results.channel.item.condition.code + ".png class='imageMain'>"
        + "  " + data.query.results.channel.item.condition.text
        + ", " + data.query.results.channel.item.condition.temp + " &#8451;");
    $('#wind').html(data.query.results.channel.wind.speed + " " + data.query.results.channel.units.speed);
    $('#srise').html(data.query.results.channel.astronomy.sunrise);
    $('#sset').html(data.query.results.channel.astronomy.sunset);
    $('#high').html(data.query.results.channel.item.forecast[0].high + " &#8451;");
    $('#low').html(data.query.results.channel.item.forecast[0].low + " &#8451;");
}
// Function that gets the forecast for five days.
var moreInfo = $('#moreDetails')[0]; // reference button to get 5 day forecast.
moreInfo.addEventListener("click", function () {
    $('#forecast').toggle(); // shows / hides the extra information
    changeButton(); // calls the function changeButton to change value of button.
    var city = $('#enterCity').val();
    $.get('https://query.yahooapis.com/v1/public/yql?q=select * from weather.forecast where u="c" and woeid in (select woeid from geo.places(1) where text="' + city + '")&format=json', function (data) {
        for (var i = 1; i < 6; i++) {
            $('#day' + i).html("<img src=images/" + data.query.results.channel.item.forecast[i].code + ".png class='imageMain'>" +
                "<br />" + data.query.results.channel.item.forecast[i].day + "<br />High: " + data.query.results.channel.item.forecast[i].high + "&#8451;<br />Low: " +
                data.query.results.channel.item.forecast[i].low + "&#8451;<br />" + data.query.results.channel.item.forecast[i].text);
        }
    });
});
// function that changes value of button to show less / get 5 day forecast.
function changeButton() {
    var btnValue = $('#moreDetails').attr('value'); // get value of button.
    // Changes value of button according to its current value.
    if (btnValue == 'Get 5 Day Forecast') {
        $('#moreDetails').prop('value', 'Show less');
    }
    else {
        $('#moreDetails').prop('value', 'Get 5 Day Forecast');
    }
}
