const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser')
app.use(cors());

const newData = [];

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
