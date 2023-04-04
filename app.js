const express = require("express");
const app = express();
const db = require("./database/index.js");
const router = require("./routes");
const cookieParser = require("cookie-parser");
const bodyParser = require("express");
const cors = require('cors')
const seedMarkers = require("./database/seeds/seedMarkers");
const seedCamps = require("./database/seeds/seedCamps");
const campData = require("./data/json/camps.json");

app.use(cors())
app.set('port', (process.env.PORT || 5001))
app.use(express.static(__dirname + '/public'))
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json());
app.use(router);

app.get('/', (request, response) => {
  response.send('GEO PERCE API!')
})

app.listen(app.get('port'), async () => {
  try {
    await db.connect();
    // await seedMarkers.seedMarkers();
    console.log("Node app is running at localhost:" + app.get('port'))
  } catch (e) {
    console.log(e);
  }
})