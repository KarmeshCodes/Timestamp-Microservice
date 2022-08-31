// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api", function(req,res){
  res.json({"unix": parseInt(new Date().getTime()),"utc": new Date().toUTCString()});
})

app.get("/api/:date", function (req,res){
  let timeStampDate = req.params.date;
  let isValidDate = dateIsValid(new Date(timeStampDate));
  if(isValidDate){
    let date = new Date(timeStampDate);
    const timestampInMs = parseInt(date.getTime());
    res.json({"unix":timestampInMs,"utc":date.toUTCString()});
  }
  else if(!isNaN(timeStampDate)){
      let timestamp = parseInt(timeStampDate);
      let date = new Date(timestamp);
      res.json({"unix":timestamp,"utc": date.toUTCString()});
  }
  else{
    res.json({ error : "Invalid Date" });
  }
});

function dateIsValid(date) {
  return date instanceof Date && !isNaN(date);
}

// listen for requests :)
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
