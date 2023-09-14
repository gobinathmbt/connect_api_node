//ExpressJS Requirments
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path=require("path")
const mongoose = require("mongoose");
const config = require("./config/environment/dbDependencies");

//Server Configuration Requirements
const serverConfig = require("./config/environment/serverConfig");
const port = process.env.PORT || serverConfig.ServerPort;

// Connect to MongoDB
mongoose
  .connect(config.dbURL, { 
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

const country = require("./src/routes/country");

// New app using express module
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: "10mb" }));
app.use(
  bodyParser.urlencoded({
    extended: true,
    limit: "10mb",
    parameterLimit: 50000,
  })
);
    

const newsfeedrouter = require("./src/routes/newsfeed");
const countryRoutes = require('./src/routes/countryRoutes');
const stateRoutes = require('./src/routes/stateRoutes');
const districtRoutes = require ('./src/routes/districtRoutes');
const cityRoutes = require ('./src/routes/cityRoutes');
const businessRoutes = require('./src/routes/businessRoutes');
 
const languageRoutes = require('./src/routes/languageRoutes'); 


const registerRoutes = require("./src/routes/RegisterRoutes");
const loginRoutes = require("./src/routes/LoginRoutes");
const resetRoutes = require("./src/routes/ResetRoutes");









//List of APIs
app.use(country);
app.use("/NewsFeed", newsfeedrouter);
app.use('/public/images', express.static(path.join(__dirname, './public/images')));
app.get("/", (req, res) => res.json({ message: "Welcome to CONNECT!!!" }));



//------------------------------------------------------------------country---------------------------------------------------------------------------------------

app.use('/country', countryRoutes); 

//------------------------------------------------------------------state-----------------------------------------------------------------------------------------

app.use('/state', stateRoutes);

//------------------------------------------------------------------district-------------------------------------------------------------------------------------

app.use('/district', districtRoutes);

//------------------------------------------------------------------city-----------------------------------------------------------------------------------------

app.use('/city', cityRoutes);

//------------------------------------------------------------------business-----------------------------------------------------------------------------------------

app.use('/api',  businessRoutes);


//------------------------------------------------------------------language-----------------------------------------------------------------------------------------

    
app.use('/api', languageRoutes); 



//-----------------------------------------------------------------Register-----------------------------------------------------------------------------------------

app.use("/register", registerRoutes);

//-----------------------------------------------------------------Login-----------------------------------------------------------------------------------------

app.use("/login", loginRoutes);

//-----------------------------------------------------------------Forgot Password-----------------------------------------------------------------------------------------

app.use("/forgot", resetRoutes);































// Middleware for health check
app.use("/api/v1/health", async (req, res) => {
  try {
    // Check the health of the database by executing a simple query
    await mongoose.connection.db.command({ ping: 1 });
    res.json({
      status: "Database is healthy",
      health: "API Server is up & running",
    });
  } catch (error) {
    console.error("Database is not healthy:", error);
    res
      .status(500)
      .json({ status: "Database is not healthy", error: error.message });
  }
});

app.listen(port, () => {
  console.log("CONNECT Server is running on http://localhost: " + port);
});
