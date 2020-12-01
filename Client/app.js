//need to convert epoch to regular date
//fix small screen size
// const { url } = require("inspector");

// const { getHeapCodeStatistics } = require("v8");

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
	const zipcode = document.getElementById('zipcode').value;
	const feelings = document.getElementById("feelings").value;
	getZipode(baseURL, zipcode, apiKey)
	.then(function (projectData) {
		postData('/addData', {
			zipcode: zipcode,
			place: projectData.newData.name,
			weather: projectData.newData.clouds.all,
			temp: projectData.newData.main.temp.toFixed(),
			feelings: feelings,
			min: projectData.newData.main.temp_min.toFixed(),
			max: projectData.newData.main.temp_max.toFixed(),
			date: projectData.newData.dt,
			time: projectData.newData.dt
		});
		return projectData;
	})
	.then(function (projectData) {
		updateFrontend();
	});
}
const getZipode = async (baseURL, zipcode, apiKey) => {
	const response = await fetch(baseURL + zipcode + ',us' + '&appid=' + apiKey + '&units=imperial');
	try {
		const data = await response.json();
		projectData = { newData: data };
		createDivs();
		console.log(projectData, "zipcode project data")
	} catch (error) {
		console.log(error, 'this is the error');
	}
	return projectData
	
};
const postData = async (url = '/addData', data = {}) => {
	const response = await fetch('http://localhost:3200/addData', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(data)
	});
	try {
		const projectData = await response.json();
		
        //sunsetCheck(changeTime(), projectData)
		//updateFrontend(projectData);
		console.log(projectData, 'this is new data');
		return projectData
	} catch (error) {
		console.log(error, 'error');
	
	}
};
const createDivs = () => {
	for (let i = 0; i < 10; i++) {
		const div = document.createElement('div');
		div.id = i;
		results.appendChild(div);
	}
};

function changeDate(date) {
	console.log(date)
	let utcSeconds = date;
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
function changeTime(projectData) {
	console.log('change time is getting called', projectData);
	let timeArray = [];
	let utcSeconds = projectData;
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


// function sunsetCheck(time, projectData){
//     console.log("sunset is running", time)
//     let utcSeconds = projectData.newData.sys.sunset;
// 	let d = new Date(0);
//     d.setUTCSeconds(utcSeconds);
//     let array = d.toString().split(' ');
//     dateTime = array.slice(4, 5).toString();
//     let sunsetTime = []
// 	for (let i = 0; i < dateTime.length; i++) {
// 		if (i < 5) {
// 			sunsetTime.push(dateTime[i]);
// 		}
//     }
//     if (time >= sunsetTime){
//         return true
//     } else {
//         return false
//     }
    
// }

const updateFrontend = async () => {
	const request = await fetch("http://localhost:3200/getData")
	try {
		const projectData = await request.json()
		entryHolder.appendChild(results);
		console.log('project data from the backend', projectData);
		const temp = document.getElementById('0');
		const date = document.getElementById('1');
		const content = document.getElementById('2');
		const clouds = document.getElementById('3');
		const place = document.getElementById('4');
		const time = document.getElementById('5');
		const sunset = document.getElementById('6')
		const minMaxTemp = document.getElementById('7')
		const newDiv = document.createElement('div');
		const innerDiv = document.createElement('div');
		innerDiv.id = 'inner';
		const placeDiv = document.createElement('div');
		const tempDiv = document.createElement('div');
		results.appendChild(newDiv);
		newDiv.appendChild(innerDiv);
		innerDiv.appendChild(placeDiv);
		innerDiv.appendChild(tempDiv)
		placeDiv.appendChild(place);
		placeDiv.appendChild(date);
		placeDiv.appendChild(time);
		innerDiv.appendChild(clouds);
		tempDiv.appendChild(temp);
		tempDiv.appendChild(minMaxTemp);
		tempDiv.appendChild(content)
		place.innerHTML = projectData.place;
		date.innerHTML = changeDate(projectData.time);
		time.innerHTML = changeTime(projectData.time);
		temp.innerHTML = projectData.temp + '°';
		minMaxTemp.innerHTML = projectData.min + '°' +'/' + projectData.max + '°' ;
		content.innerText = "Mood today: " + projectData.feelings;
		temp.id = 'temp';
		clouds.id = 'clouds';
		date.id = 'date';
		content.id = 'content';
		newDiv.id = 'container';
		place.id = 'place';
		time.id = 'time';
		sunset.id = "sunset"
		minMaxTemp.id = "minMaxTemp"
	
	} catch (error){
		console.log(error)
	}

}
