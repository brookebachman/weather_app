//need to convert epoch to regular date
//fix small screen size
// const { url } = require("inspector");
//make the post request
const apiKey = '0b53ac0f940893f55db63af93f3ada83';
const baseURL = 'http://api.openweathermap.org/data/2.5/weather?zip=';
let projectData = {};
document.getElementById('generate').addEventListener('click', performAction);
const weather = document.getElementById('entryHolder');
const resultsDiv = document.createElement('div');
resultsDiv.id = 'results';
const details = document.getElementById('details');
function performAction(event) {
	event.preventDefault();
	const zipcode = document.getElementById('feelings').value;
	getZipode(baseURL, zipcode, apiKey)
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
		updateFrontend(projectData);
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
	for (let i = 0; i < 3; i++) {
		const p = document.createElement('p');
		p.id = i;
		weather.appendChild(p);
	}
};
function updateFrontend(projectData) {
	console.log('update frontend getting called');
	weather.appendChild(resultsDiv);
	const clouds = document.getElementById('clouds');
	const card = document.getElementById('results');
	const temp = document.getElementById('0');
	const date = document.getElementById('1');
	const content = document.getElementById('2');
	const div = document.createElement('div');
	//const image = document.createElement("img")
	card.appendChild(clouds);
	card.appendChild(temp);
	//card.appendChild(image);
	card.appendChild(content);
	card.appendChild(div);
	//image.appendChild(div)
	//image.id = "image"
	div.id = 'container1';
	temp.innerText = projectData.newData.main.temp.toFixed() + ' degrees ℉';
	if (projectData.newData.clouds.all === 0) {
		clouds.innerText = 'There are no clouds in the sky today ☀';
	} else if (projectData.newData.clouds.all > 0 && projectData.newData.clouds.all < 10) {
		clouds.innerText = 'There are some clouds today ☁';
	} else {
		clouds.innerText = "It's a cloudy day! ☁";
	}
	if (projectData.newData.weather[0].description === 'clear sky') {
		//image.src = '../images/sun.png'
		results.style.cssText = "background-image: url('../images/sun.png'); background-size: cover;";
	} else if (projectData.newData.weather[0].description === 'broken clouds') {
		results.style.cssText = "background-image: url('../images/clouds.png'); background-size: cover;";
		//image.src = '../images/clouds.png'
	} else {
		results.style.cssText = "background-image: url('../images/rain.png'); background-size: cover;";
		//image.src = '../images/rain.png'
	}
	if (parseInt(projectData.newData.main.temp.toFixed()) > 70) {
		content.innerText = "It's a nice warm day!";
	} else {
		content.innerText = "It's a bit chilly outside make sure to bring a jacket!";
	}
}

const updateUi = (specialData) => {
	console.log('update ui being called');
};
