
const apiKey = '0b53ac0f940893f55db63af93f3ada83'
const baseURL = 'http://api.openweathermap.org/data/2.5/weather?zip='
const data = {};

document.getElementById('form').addEventListener('submit', performAction);

function performAction(event){
    event.preventDefault();
    const zipcode = document.getElementById('zipcode').value
    getZipode(baseURL, zipcode, apiKey)
}


const getZipode = async (baseURL, zipcode, apiKey) => {
    const response = await fetch(baseURL+zipcode+",us"+"&appid="+apiKey) 
    try {
        const data = await response.json();
        console.log(data);
    } catch (error){
        console.log(error, "this is the error")
    }

}