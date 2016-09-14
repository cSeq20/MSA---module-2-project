var searchBtn = $('#btnGetWeather')[0];
searchBtn.addEventListener("click", function () {
    var location = $('#enterCity').val();
    $.get('https://query.yahooapis.com/v1/public/yql?q=select * from weather.forecast where u="c" and woeid in (select woeid from geo.places(1) where text="' + location + '")&format=json', function (data) {
        /* Check that a place was found  */
        if (data.query.results === null) {
            alert("Location not found: " + location + "!");
        }
        else {
            $('.col-md-6').show();
            setup(data);
        }
    });
});
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
