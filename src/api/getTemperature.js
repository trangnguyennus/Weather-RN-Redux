const URL = 'http://api.openweathermap.org/data/2.5/find?units=metric&appid=0fed2288a38867b574a1a24872a5e9af&q=';

function getTemperature(cityName){
    return fetch(URL + cityName)
        .then(res => res.json())
        .then(resJSON => resJSON.list[0].main.temp)
}
//Test
// getTemperature('Toronto')
//     .then(temp => console.log(temp))
//     .catch(err => console(err))

export default getTemperature;