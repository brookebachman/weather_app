//need to convert epoch to regular date
//fix small screen size
//make the post request
const apiKey = '0b53ac0f940893f55db63af93f3ada83'
const baseURL = 'http://api.openweathermap.org/data/2.5/weather?zip='
const results = []
document.getElementById('generate').addEventListener('click', performAction);
const weather = document.getElementById("entryHolder")
const resultsDiv = document.createElement("div")
resultsDiv.id = "results"
const details = document.getElementById("details")

function performAction(event){
    event.preventDefault();
    const zipcode = document.getElementById('feelings').value
    getZipode(baseURL, zipcode, apiKey)
}

const getZipode = async (baseURL, zipcode, apiKey) => {
    const response = await fetch(baseURL+zipcode+",us"+"&appid="+apiKey+"&units=imperial") 
    try {
        const data = await response.json();
        results.push(data)
        console.log(results[0])
        createLis();
        updateFrontend(results);
    } catch (error){
        console.log(error, "this is the error")
    }.then(postComment());

    
}
const createLis = () => {
    for (let i = 0; i < 3; i++){
        const p = document.createElement('p')
        p.id = i
        weather.appendChild(p);
    }
}

function updateFrontend(results){
    weather.appendChild(resultsDiv);
    const clouds = document.getElementById("clouds")
    const image = document.createElement("img")
    const card = document.getElementById("results")
    const temp = document.getElementById("0");
   const date = document.getElementById("1");
   const content = document.getElementById("2");

   card.appendChild(temp)
   card.appendChild(clouds);
   card.appendChild(image);

    temp.innerText = results[0].main.temp.toFixed() + " degrees ℉"

    if (results[0].clouds.all === 0){
        clouds.innerText = "There are no clouds in the sky today ☀"	
    } else {
        clouds.innerText = "It is a cloudy day ☁"
    }
    if (results[0].weather[0].description === "clear sky"){
        image.src = '../images/sun.png'
    } else if (results[0].weather[0].description === "broken clouds"){
        image.src = '../images/clouds.png'
    } else {
        image.src = '../images/rain.png'
        clouds.innerText = "It is a rainy day"
    }    
    
    
}
// postData('/addWeather', {:data.animal, fact: data.fact} )
const addWeather = async (baseURL, zipcode, apiKey) => {

}


