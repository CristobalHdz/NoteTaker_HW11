const express = require('express');
const fs = require('fs');
const app = express();
const PORT = process.env.port || 3001;

app.use(express.static("./public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

require("./Routes/apiRoutes")(app);
require("./Routes/htmlRoutes")(app);

app.listen(PORT, () => {
    console.log(`The app is being listened in localhost:${PORT}`)
});
