const db_main = require("./model")
const {fetchData}=require("./serives/crawler.ws")

db_main.mongoose
  .connect(db_main.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connected to the database!");
    fetchData();
  })
  .catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });



