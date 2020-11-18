//need to convert epoch to regular date
//fix small screen size
// const { url } = require("inspector");
//make the post request
const apiKey = '0b53ac0f940893f55db63af93f3ada83';
const baseURL = 'http://api.openweathermap.org/data/2.5/weather?zip=';
let projectData = {};
document.getElementById('generate').addEventListener('click', performAction);
const entryHolder = document.getElementById('entryHolder');
const results = document.createElement('div');
results.id = 'results';
const details = document.getElementById('details');
function performAction(event) {
	event.preventDefault();
	const zipcode = document.getElementById('feelings').value;
	getZipode(baseURL, zipcode, apiKey);
	// .then(function (projectData) {
	// 	console.log(projectData, 'projectData');
	// 	postData('/addData', projectData, {
	// 		place: zipcode,
	// 		weather: projectData.newData.clouds.all,
	// 		temp: projectData.newData.main.temp.toFixed(),
	// 	});
	// 	return projectData;
	// })
	// .then(function (projectData) {
	// 	updateUi({ place: zipcode, weather: projectData.clouds.all, temp: projectData.main.temp.toFixed() });
	// });
}
const getZipode = async (baseURL, zipcode, apiKey) => {
	const response = await fetch(baseURL + zipcode + ',us' + '&appid=' + apiKey + '&units=imperial');
	try {
		const data = await response.json();
		projectData = { newData: data };
		createLis();
		changeTime(projectData);
        changeDate(projectData);
        sunset(projectData);
		updateFrontend(projectData);
		console.log(projectData.newData);
	} catch (error) {
		console.log(error, 'this is the error');
	}
};
const postData = async (url = '/addData', data = {}) => {
	console.log(data, 'this is post data function running');
	const response = await fetch('/', {
		method: 'POST',
		credentials: 'cross-origin',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(data),
	});
	try {
		const newData = await response.json();
		console.log(newData, 'this is new data');
	} catch (error) {
		console.log(error, 'error');
	}
};
const createLis = () => {
	for (let i = 0; i < 7; i++) {
		const p = document.createElement('p');
		p.id = i;
		results.appendChild(p);
	}
};

function changeDate() {
	let utcSeconds = projectData.newData.dt;
	let d = new Date(0);
	d.setUTCSeconds(utcSeconds);
	let array = d.toString().split(' ');
	let dateArray = [];
	// for (let i = 0; i < array.length; i++){
	//     console.log(array[i], i)
	// }
	dateArray = array.slice(1, 4);

	return dateArray.toString(' ');
	// return time
}

function changeTime() {
	console.log('change time is getting called');
	let timeArray = [];
	let utcSeconds = projectData.newData.dt;
	let d = new Date(0);
	d.setUTCSeconds(utcSeconds);
	let array = d.toString().split(' ');
    dateTime = array.slice(4, 5).toString();
    let time = ''
	for (let i = 0; i < dateTime.length; i++) {
		if (i < 5) {
			timeArray.push(dateTime[i]);
		}
    }
    let last;
    if (timeArray[1] >= 2){
        time = " PM"
        if (timeArray[1] > 2){
            last = parseInt(timeArray.slice(0,2).join(""))
            last = Math.abs(last -12)
            timeArray[0] = 0
            timeArray[1] = last
            timeArray.slice(1,4)
        }
        
    } else {
        time = ' AM'
    }

	return timeArray.join('')+ time;
}

function sunset(){
    console.log("sunset is running")
    let utcSeconds = projectData.newData.sys.sunset;
	let d = new Date(0);
    d.setUTCSeconds(utcSeconds);
    let array = d.toString().split(' ');
    dateTime = array.slice(4, 5).toString();
    let timeArray = []
	for (let i = 0; i < dateTime.length; i++) {
		if (i < 5) {
			timeArray.push(dateTime[i]);
		}
    }
    console.log(timeArray, "sunset")
}

function updateFrontend(projectData) {
	entryHolder.appendChild(results);
	console.log('update frontend getting called');
	const temp = document.getElementById('0');
	const date = document.getElementById('1');
	const content = document.getElementById('2');
	const clouds = document.getElementById('3');
	const place = document.getElementById('4');
    const time = document.getElementById('5');
    const sunset = document.getElementById('6')
    const div = document.createElement('div');
	temp.id = 'temp';
	clouds.id = 'clouds';
	date.id = 'date';
	content.id = 'text';
	div.id = 'container';
	place.id = 'place';
    time.id = 'time';
    sunset.id = "sunset"

	const innerDiv = document.createElement('div');
	innerDiv.id = 'inner';
	const placeDiv = document.createElement('div');
	results.appendChild(div);
	div.appendChild(innerDiv);
	innerDiv.appendChild(placeDiv);
	innerDiv.appendChild(temp);
	placeDiv.appendChild(place);
	placeDiv.appendChild(date);
	placeDiv.appendChild(time);
	innerDiv.appendChild(clouds);
	place.innerText = projectData.newData.name;
	date.innerText = changeDate();
	time.innerText = changeTime();
	temp.innerText = projectData.newData.main.temp.toFixed() + '°';
	// if (projectData.newData.clouds.all === 0) {
	// 	clouds.innerText = 'There are no clouds in the sky today ☀';
	// } else if (projectData.newData.clouds.all > 0 && projectData.newData.clouds.all < 10) {
	// 	clouds.innerText = 'There are some clouds today ☁';
	// } else {
	// 	clouds.innerText = "";
	// }
	// if (projectData.newData.weather[0].description === 'clear sky') {
	// 	//image.src = '../images/sun.png'
	// 	// div.style.cssText = "background-image: url('../images/sun.png'); background-size: cover;";
	// } else if (projectData.newData.weather[0].description === 'broken clouds') {
	//     // div.style.cssText = "background-image: url('../images/clouds.png'); background-size: cover;";
	//     // innerDiv.style.color = "black";
	// 	//image.src = '../images/clouds.png'
	// } else {
	// 	// div.style.cssText = "background-image: url('../images/rain.png'); background-size: cover;";
	// 	//image.src = '../images/rain.png'
	// }
	if (parseInt(projectData.newData.main.temp.toFixed()) > 70) {
		clouds.innerText = '☀';
	} else {
		clouds.innerText = '☁';
	}
}

const updateUi = (specialData) => {
	console.log('update ui being called');
};
