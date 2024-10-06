require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require("body-parser")
const dns = require("dns")
const app = express();

// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.urlencoded({extended: true}))

app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Your first API endpoint
app.get('/api/hello', function(req, res) {
  res.json({ greeting: 'hello API' });
});

app.post("/api/shorturl", async (req, res) => {

  let original_url = req.body.url
  console.log(original_url)
  
  // Extract domain name

  const httpsRegExp = /(https:\/\/)/
  const queryStringRexExp = /\/\?.+/

  let temp_url = original_url.replace(httpsRegExp, "")
  temp_url = temp_url.replace(queryStringRexExp, "")
   
    dns.lookup(temp_url, (err) => {

      if (err) {

        res.json({ error: 'invalid url' })

      } else {

        // Check if new URL

        let short_url = shortUrlArr.findIndex((item) => {
          return item === original_url 
        })

        // Assign short_url to a new URL

        if (short_url === -1) {

          shortUrlArr.push(original_url)
          short_url = shortUrlArr.length - 1

        } 

        res.json({
          original_url,
          short_url
        })

      }
      
    })    

   }

)

app.get("/api/shorturl/:shorturl", (req, res) => {

  // Find corresponding original_url and redirect 

  const short_url = Number(req.params.shorturl)

  if (isNaN(short_url) || short_url < 0 || short_url + 1 > shortUrlArr.length) {

    res.json({ error: "Invalid Input"})

  } else {

    res.redirect(`${shortUrlArr[short_url]}`)

  }

})

const shortUrlArr = []

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
