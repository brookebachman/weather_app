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
    // .then(function(results) { 
    //     postData('/addData', results, {place: zipcode, weather: results[0].clouds.all, temp: results[0].main.temp.toFixed()} )
    // }).then(updateUi(
    //     {place: zipcode, weather: results[0].clouds.all, temp: results[0].main.temp.toFixed()}))
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
    }
};

const postData = async (url = '/addData', results, data = {})=> {
    console.log(specialData, "this is post data function running");
    const response = await fetch('/', {
        method: 'POST',
        credentials: 'cross-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    })
    try {
        const newData = await response.json()
        console.log(newData, "this is new data")
        
    } catch (error){
        console.error
    }
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
    const card = document.getElementById("results")
    const temp = document.getElementById("0");
    const date = document.getElementById("1");
    const content = document.getElementById("2");
    const div = document.createElement('div')
    const image = document.createElement("img")
  
   card.appendChild(clouds);
   card.appendChild(temp)
   card.appendChild(image)
   card.appendChild(content)
   image.appendChild(div)
   image.id = "image"
   div.id = "container1"
  

    temp.innerText = results[0].main.temp.toFixed() + " degrees ℉"

    if (results[0].clouds.all === 0){
        clouds.innerText = "There are no clouds in the sky today ☀"	
    } else if(results[0].clouds.all > 0 && results[0].clouds.all < 10) {
        clouds.innerText = "There are some clouds today ☁"
    }  else {
        clouds.innerText = "It's a cloudy day! ☁"
    }
    if (results[0].weather[0].description === "clear sky"){
        image.src = '../images/sun.png' 
    } else if (results[0].weather[0].description === "broken clouds"){
        image.src = '../images/clouds.png' 
    } else {
        image.src = '../images/rain.png'
    }    
    if (parseInt(results[0].main.temp.toFixed()) > 70 ){
        content.innerText = "It's a nice warm day!"
    } else {
        content.innerText = "It's a bit chilly outside make sure to bring a jacket!"
    }
    
}


const updateUi = (specialData) => {
    console.log("update ui being called")
}