const express = require('express');
const app = express();
// Initialize the main project folder
app.use(express.static('Client'));
// Setup empty JS object to act as endpoint for all routes
const newData = {};
/* Dependencies */
const bodyParser = require('body-parser')
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

app.get('/', function (req, res) {
    res.send('The server is running');
  })

const port = 3200;
const server = app.listen(port, ()=>{console.log(`running on localhost: ${port}`)})


app.post('/addData', function(req, res){
  console.log(req.body)
  newEntry = {
    place: req.body.place, 
    weather: req.body.weather,
    temp: req.body.temp
  }
  newData.push(newEntry)
  res.send(newData)
  console.log(newData)
})
