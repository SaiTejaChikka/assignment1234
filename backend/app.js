const express = require("express");
const path = require("path");
const cors = require('cors');
const { open } = require("sqlite");
const sqlite3 = require("sqlite3");
const app = express();
app.use(cors());
app.use(express.json());
const dbPath = path.join(__dirname, "goodreads.db");

let db = null;

const initializeDBAndServer = async () => {
  try {
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    });
    app.listen(5000, () => {
      console.log("Server Running at http://localhost:3000/");
    });
  } catch (e) {
    console.log(`DB Error: ${e.message}`);
    process.exit(1);
  }
};

initializeDBAndServer();

app.get("/locations", async (request, response) => {
  try {
    const getAuthorBooksQuery = `
      SELECT DISTINCT location FROM Technicians;
    `;
    const booksArray = await db.all(getAuthorBooksQuery);
    response.status(200).send(booksArray);
  } catch (error) {
    console.error("Error fetching locations:", error);
    response.status(500).send({ error: "Failed to fetch locations" });
  }
});


app.get("/featured-technicians", async (request, response) => {
  
  const { location, technician } = request.query;
 
  const getTechnicians = `
  SELECT * FROM Technicians
  WHERE location LIKE ? AND specialization LIKE ?;
  `;
    try {
      const getData = await db.all(getTechnicians, [`%${location}%`, `%${technician}%`]);
      response.send(getData);
  } catch (error) {
      console.error("Error fetching technicians:", error);
      response.status(500).send("An error occurred while fetching technicians.");
  }
});

app.get("/appliance-suggestions", async (req, res) => {
  const searchQuery = req.query.query; // Get the search query from request parameters
  
  // Query to fetch appliance types that match the search query
  const getApplianceSuggestions = `
    SELECT DISTINCT specialization FROM Technicians
    WHERE specialization LIKE ?;  // Use LIKE to filter based on user input
  `;
  
  try {
    const appliances = await db.all(getApplianceSuggestions, [`%${searchQuery}%`]);
    res.json(appliances);
  } catch (error) {
    console.error("Error fetching appliance suggestions:", error);
    res.status(500).send("An error occurred while fetching appliance suggestions.");
  }
});


app.post('/login', async (req, response) => {
  const { email, password } = req.body;
  const query = `
    INSERT INTO Users(email, password)
    VALUES('${email}', '${password}');
  `;
  try {
    await db.run(query);
    response.status(200).send({ message: 'Login Successful!' });
  } catch (error) {
    console.error("Error inserting user:", error);
    response.status(500).send({ message: 'Login Failed. Try again!' });
  }
});


app.post("/technician-login",async(request,response)=>{
   const {name, photo, specialization, rating, description, location, gmail, password}=request.body;
   const query=`
       INSERT INTO Technicians(name, photo, specialization, rating, description, location, gmail, password)
       VALUES('${name}','${photo}','${specialization}',${rating},'${description}','${location}','${gmail}','${password}')
   
   `
   const dbResponse=await db.run(query);
   response.send("sucessful")
})