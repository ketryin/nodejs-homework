const app = require('../app')
const mongoose = require("mongoose")
require("dotenv").config();

const { CONNECTION_STRING, PORT = 3000 } = process.env;

mongoose
  .connect(CONNECTION_STRING, { useUnifiedTopology: true })
  .then(async () => {
    console.log("Database connection successful");
    app.listen(PORT, () => {
      console.log(`Server running. Use our API on port: ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err.message);
    process.exit(1);
  });