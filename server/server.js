const express = require("express");
const cors = require("cors");
const app = express();
const port = 8000;

app.use( cors(), express.json(), express.urlencoded({extended: true }) );

require("./routes/user.routes")(app);
require("./routes/thoughts.routes")(app);
require("./config/mongoose.config");

app.listen( port, () => console.log(`Listening on port: ${port}`) );
